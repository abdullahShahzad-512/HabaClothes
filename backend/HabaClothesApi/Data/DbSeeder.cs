using HabaClothes.Api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace HabaClothes.Api.Data;

public static class DbSeeder
{
    public static async Task SeedAsync(AppDbContext db)
    {
        if (await db.Users.AnyAsync())
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

        await db.SaveChangesAsync();
    }
}
