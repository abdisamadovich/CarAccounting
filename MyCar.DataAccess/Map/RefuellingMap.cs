using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MyCar.DataAccess.Models;

namespace MyCar.DataAccess.Map;

public class RefuellingMap : IEntityTypeConfiguration<Refuelling>
{
    public void Configure(EntityTypeBuilder<Refuelling> builder)
    {
        builder.ToTable("Refuelling");

        builder.Property(x => x.Date).IsRequired();
        builder.Property(x => x.Odometer).IsRequired();
        builder.Property(x => x.Price).IsRequired();
        builder.Property(x => x.TotalCost).IsRequired();
        builder.Property(x => x.Quantity).IsRequired();
        builder.Property(x => x.IsFilled).IsRequired();
        builder.Property(x => x.Station).IsRequired();

        builder.HasOne(x => x.Fuel).WithMany().HasForeignKey(x => x.FuelId);
        builder.HasOne(x => x.Vehicle).WithMany().HasForeignKey(x => x.VehicleId).OnDelete(DeleteBehavior.Restrict);
    }
}