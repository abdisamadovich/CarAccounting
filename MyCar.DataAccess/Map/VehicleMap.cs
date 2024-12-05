using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MyCar.DataAccess.Models;

namespace MyCar.DataAccess.Map;

public class VehicleMap : IEntityTypeConfiguration<Vehicle>
{
    public void Configure(EntityTypeBuilder<Vehicle> builder)
    {
        builder.ToTable("Vehicle");

        builder.Property(x => x.Name).IsRequired();
        builder.Property(x => x.Model).IsRequired();
        builder.Property(x => x.FuelCapacity).IsRequired();

        builder.HasOne(x => x.Manufacturer).WithMany().HasForeignKey(x => x.ManufacturerId);
        builder.HasOne(x => x.FuelType).WithMany().HasForeignKey(x => x.FuelTypeId);
    }
}
