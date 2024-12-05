namespace MyCar.Server.Configuration;

public static class CorsPoliceConfiguration
{
    public static void ConfigureCorsPolicy(this WebApplicationBuilder builder)
    {
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowSpecificOrigin",
                builder => builder.WithOrigins("https://localhost:4200")
                    .AllowAnyHeader()
                    .AllowAnyMethod());
        });
    }
}
