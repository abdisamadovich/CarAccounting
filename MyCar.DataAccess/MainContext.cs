using Microsoft.EntityFrameworkCore;
using MyCar.DataAccess.Map;
using MyCar.DataAccess.Models;

namespace MyCar.DataAccess;

public class MainContext : DbContext
{
    public DbSet<FuelType> FuelTypes { get; set; }
    public DbSet<Fuel> Fuels { get; set; }
    public DbSet<Manufacturer> Manufacturers { get; set; }
    public DbSet<Vehicle> Vehicles { get; set; }
    public DbSet<ExpenseType> ExpenseTypes { get; set; }
    public DbSet<Expense> Expenses { get; set; }
    public DbSet<Refuelling> Refuellings { get; set;}
    public DbSet<ServiceType> ServiceTypes { get; set; }
    public DbSet<Service> Services { get; set; }
    public DbSet<History> Histories { get; set; }

    public MainContext(DbContextOptions<MainContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new FuelTypeMap());
        modelBuilder.ApplyConfiguration(new FuelMap());
        modelBuilder.ApplyConfiguration(new ManufacturerMap());
        modelBuilder.ApplyConfiguration(new VehicleMap());
        modelBuilder.ApplyConfiguration(new ExpenseTypeMap());
        modelBuilder.ApplyConfiguration(new ExpenseMap());
        modelBuilder.ApplyConfiguration(new RefuellingMap());
        modelBuilder.ApplyConfiguration(new ServiceTypeMap());
        modelBuilder.ApplyConfiguration(new ServiceMap());
        modelBuilder.ApplyConfiguration(new HistoryMap());
    }
}