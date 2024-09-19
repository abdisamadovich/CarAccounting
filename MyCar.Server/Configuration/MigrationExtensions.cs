using Microsoft.EntityFrameworkCore;
using MyCar.DataAccess;

namespace MyCar.Server.Configuration;

public static class MigrationExtensions
{
    /// <summary>
    /// Migrates existing database schema to data sources
    /// </summary>
    /// <param name="scopeFactory">Service scope factory</param>
    /// <typeparam name="TContext">Data access context</typeparam>
    public static async ValueTask MigrateAsync(this IServiceScopeFactory scopeFactory)
    {
        await using var scope = scopeFactory.CreateAsyncScope();
        var context = scope.ServiceProvider.GetRequiredService<MainContext>();

        if ((await context.Database.GetPendingMigrationsAsync()).Any())
            await context.Database.MigrateAsync();
    }
}
