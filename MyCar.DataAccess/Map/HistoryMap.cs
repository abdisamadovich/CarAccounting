using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MyCar.DataAccess.Models;

namespace MyCar.DataAccess.Map;

public class HistoryMap : IEntityTypeConfiguration<History>
{
    public void Configure(EntityTypeBuilder<History> builder)
    {
        builder.ToTable("History");

        builder.Property(x => x.Name).IsRequired();
        builder.Property(x => x.Date).IsRequired();
        builder.Property(x => x.Station).IsRequired();
        builder.Property(x => x.Odometer).IsRequired();
        builder.Property(x => x.Price).IsRequired();
    }
}
