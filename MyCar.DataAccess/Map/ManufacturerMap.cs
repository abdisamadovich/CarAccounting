using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MyCar.DataAccess.Models;

namespace MyCar.DataAccess.Map;

public class ManufacturerMap : IEntityTypeConfiguration<Manufacturer>
{
    public void Configure(EntityTypeBuilder<Manufacturer> builder)
    {
        builder.ToTable("Manufacturer");

        builder.Property(x => x.Name).IsRequired();
    }
}
