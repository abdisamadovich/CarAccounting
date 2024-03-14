using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MyCar.DataAccess.Models;

namespace MyCar.DataAccess.Map;

public class FuelMap : IEntityTypeConfiguration<Fuel>
{
    public void Configure(EntityTypeBuilder<Fuel> builder)
    {
        builder.ToTable("Fuel");

        builder.Property(x => x.Name).IsRequired();

        builder.HasOne(x => x.FuelType).WithMany().HasForeignKey(x => x.FuelTypeId);
    }
}