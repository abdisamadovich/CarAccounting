using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MyCar.DataAccess.Models;

namespace MyCar.DataAccess.Map;

public class ServiceMap : IEntityTypeConfiguration<Service>
{
    public void Configure(EntityTypeBuilder<Service> builder)
    {
        builder.ToTable("Service");

        builder.Property(x => x.Date).IsRequired();
        builder.Property(x => x.Odometer).IsRequired();
        builder.Property(x => x.Place).IsRequired();
        builder.Property(x => x.Price).IsRequired();

        builder.HasOne(x => x.ServiceType).WithMany().HasForeignKey(x => x.ServiceTypeId);
        builder.HasOne(x => x.Vehicle).WithMany().HasForeignKey(x => x.VehicleId);
    }
}