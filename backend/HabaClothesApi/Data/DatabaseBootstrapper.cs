using System.Data;
using Microsoft.EntityFrameworkCore;

namespace HabaClothes.Api.Data;

public static class DatabaseBootstrapper
{
    private static readonly string[] RequiredTables = ["Users", "Products", "Orders", "OrderItems"];

    public static async Task InitializeAsync(AppDbContext db, ILogger logger, CancellationToken cancellationToken = default)
    {
        await db.Database.MigrateAsync(cancellationToken);

        var existingTables = await GetExistingRequiredTablesAsync(db, cancellationToken);
        if (existingTables.Count == RequiredTables.Length)
        {
            return;
        }

        var hasMigrationHistory = await HasMigrationHistoryAsync(db, cancellationToken);

        // Self-heal the common cloud case: migration history exists but no app tables were created.
        if (existingTables.Count == 0 && hasMigrationHistory)
        {
            logger.LogWarning("Detected migration history without application tables. Repairing schema by resetting migration history and reapplying migrations.");

            await db.Database.ExecuteSqlRawAsync("DELETE FROM \"__EFMigrationsHistory\"", cancellationToken);
            await db.Database.MigrateAsync(cancellationToken);

            existingTables = await GetExistingRequiredTablesAsync(db, cancellationToken);
            if (existingTables.Count == RequiredTables.Length)
            {
                logger.LogInformation("Database schema repair completed successfully.");
                return;
            }
        }

        var missing = RequiredTables.Except(existingTables, StringComparer.Ordinal).ToArray();
        throw new InvalidOperationException($"Database schema is incomplete. Missing tables: {string.Join(", ", missing)}. Verify Railway database connection and migration state.");
    }

    private static async Task<HashSet<string>> GetExistingRequiredTablesAsync(AppDbContext db, CancellationToken cancellationToken)
    {
        var connection = db.Database.GetDbConnection();
        var shouldCloseConnection = connection.State != ConnectionState.Open;

        if (shouldCloseConnection)
        {
            await connection.OpenAsync(cancellationToken);
        }

        try
        {
            await using var command = connection.CreateCommand();
            command.CommandText = @"
                SELECT table_name
                FROM information_schema.tables
                WHERE table_schema = 'public'";

            var existing = new HashSet<string>(StringComparer.Ordinal);
            await using var reader = await command.ExecuteReaderAsync(cancellationToken);
            while (await reader.ReadAsync(cancellationToken))
            {
                var tableName = reader.GetString(0);
                if (RequiredTables.Contains(tableName, StringComparer.Ordinal))
                {
                    existing.Add(tableName);
                }
            }

            return existing;
        }
        finally
        {
            if (shouldCloseConnection)
            {
                await connection.CloseAsync();
            }
        }
    }

    private static async Task<bool> HasMigrationHistoryAsync(AppDbContext db, CancellationToken cancellationToken)
    {
        var connection = db.Database.GetDbConnection();
        var shouldCloseConnection = connection.State != ConnectionState.Open;

        if (shouldCloseConnection)
        {
            await connection.OpenAsync(cancellationToken);
        }

        try
        {
            await using var command = connection.CreateCommand();
            command.CommandText = @"
                SELECT EXISTS (
                    SELECT 1
                    FROM information_schema.tables
                    WHERE table_schema = 'public' AND table_name = '__EFMigrationsHistory'
                )";

            var tableExistsResult = await command.ExecuteScalarAsync(cancellationToken);
            var historyTableExists = tableExistsResult is bool exists && exists;
            if (!historyTableExists)
            {
                return false;
            }

            command.CommandText = "SELECT EXISTS (SELECT 1 FROM \"__EFMigrationsHistory\")";
            var rowExistsResult = await command.ExecuteScalarAsync(cancellationToken);
            return rowExistsResult is bool rowExists && rowExists;
        }
        finally
        {
            if (shouldCloseConnection)
            {
                await connection.CloseAsync();
            }
        }
    }
}