using HabaClothes.Api.Data;
using HabaClothes.Api.DTOs;
using HabaClothes.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HabaClothes.Api.Controllers;

[ApiController]
[Route("api/admin")]
[Authorize(Roles = "Admin")]
public class AdminController : ControllerBase
{
    private readonly AppDbContext _db;

    public AdminController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet("users")]
    public async Task<ActionResult<IEnumerable<AdminUserResponse>>> GetUsers()
    {
        var users = await _db.Users
            .OrderBy(u => u.Email)
            .Select(u => new AdminUserResponse(u.Id, u.Email, u.FirstName, u.LastName, u.Role, u.CreatedAt))
            .ToListAsync();
        return Ok(users);
    }

    [HttpPut("users/{id:int}/role")]
    public async Task<ActionResult<AdminUserResponse>> UpdateRole(int id, AdminUserRoleRequest request)
    {
        var user = await _db.Users.FindAsync(id);
        if (user == null)
        {
            return NotFound();
        }

        var role = request.Role.Trim();
        if (!IsSupportedRole(role))
        {
            return BadRequest("Role must be Admin or Customer.");
        }

        user.Role = NormalizeRole(role);
        await _db.SaveChangesAsync();

        return Ok(AdminUserResponse.FromUser(user));
    }

    private static bool IsSupportedRole(string role)
        => role.Equals("Admin", StringComparison.OrdinalIgnoreCase)
           || role.Equals("Customer", StringComparison.OrdinalIgnoreCase);

    private static string NormalizeRole(string role)
        => role.Equals("Admin", StringComparison.OrdinalIgnoreCase) ? "Admin" : "Customer";
}
