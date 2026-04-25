using HabaClothes.Api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Data;

namespace HabaClothes.Api.Data;

public static class DbSeeder
{
    public static async Task SeedAsync(AppDbContext db, ILogger logger, CancellationToken cancellationToken = default)
    {
        if (!await TableExistsAsync(db, "Users", cancellationToken))
        {
            logger.LogWarning("Skipping seed because required table 'Users' does not exist. Database migration history may be out of sync with actual schema.");
            return;
        }

        if (!await TableExistsAsync(db, "Products", cancellationToken))
        {
            logger.LogWarning("Skipping seed because required table 'Products' does not exist. Database migration history may be out of sync with actual schema.");
            return;
        }

        if (await db.Users.AnyAsync(cancellationToken))
        {
            return;
        }

        var hasher = new PasswordHasher<User>();

        var admin = new User
        {
            Email = "habaclothes777@gmail.com",
            FirstName = "Admin",
            LastName = "User",
            Role = "Admin",
        };
        admin.PasswordHash = hasher.HashPassword(admin, "@HabaClothes777");

        var customer = new User
        {
            Email = "customer@habaclothes.local",
            FirstName = "Customer",
            LastName = "User",
            Role = "Customer",
        };
        customer.PasswordHash = hasher.HashPassword(customer, "Customer123!");

        var products = new List<Product>
        {
            new()
            {
                Name = "Kurta Trouser",
                Description = "It has lavender Rose Gotti Elegence.",
                Price = 1799.99m,
                ImageUrl = "wwwroot\\uploads\\cc821ed2fbbe46709594635d681030e4.png",
                Category = "Girls",
                Stock = 0,
                Sizes = "3-4Y,5-6Y,7-8Y,9-10Y,11-12Y,13-14Y,15-16Y",
                Colors = "Pink"
            },
           
        };

        db.Users.AddRange(admin, customer);
        db.Products.AddRange(products);

        await db.SaveChangesAsync(cancellationToken);
    }

    private static async Task<bool> TableExistsAsync(AppDbContext db, string tableName, CancellationToken cancellationToken)
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
                    WHERE table_schema = 'public' AND table_name = @tableName
                )";

            var parameter = command.CreateParameter();
            parameter.ParameterName = "@tableName";
            parameter.Value = tableName;
            command.Parameters.Add(parameter);

            var result = await command.ExecuteScalarAsync(cancellationToken);
            return result is bool exists && exists;
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
