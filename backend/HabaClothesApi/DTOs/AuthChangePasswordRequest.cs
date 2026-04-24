namespace HabaClothes.Api.DTOs;

public record AuthChangePasswordRequest(string CurrentPassword, string NewPassword);
