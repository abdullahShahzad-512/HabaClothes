using HabaClothes.Api.Models;

namespace HabaClothes.Api.DTOs;

public record AdminUserResponse(int Id, string Email, string FirstName, string LastName, string Role, DateTime CreatedAt)
{
    public static AdminUserResponse FromUser(User user)
        => new(user.Id, user.Email, user.FirstName, user.LastName, user.Role, user.CreatedAt);
}
