using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MyCar.DataAccess.Models;

namespace MyCar.DataAccess.Map;

public class ServiceTypeMap : IEntityTypeConfiguration<ServiceType>
{
    public void Configure(EntityTypeBuilder<ServiceType> builder)
    {
        builder.ToTable("ServiceType");

        builder.Property(x => x.Name).IsRequired();
    }
}
