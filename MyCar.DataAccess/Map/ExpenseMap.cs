using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MyCar.DataAccess.Models;

namespace MyCar.DataAccess.Map;

public class ExpenseMap : IEntityTypeConfiguration<Expense>
{
    public void Configure(EntityTypeBuilder<Expense> builder)
    {
        builder.ToTable("Expense");

        builder.Property(x => x.Date).IsRequired();
        builder.Property(x => x.Odometer).IsRequired();
        builder.Property(x => x.Place).IsRequired();
        builder.Property(x => x.Description).IsRequired();
        builder.Property(x => x.Value).IsRequired();

        builder.HasOne(x => x.ExpenseType).WithMany().HasForeignKey(x => x.ExpenseTypeId);
        builder.HasOne(x => x.Vehicle).WithMany().HasForeignKey(x => x.VehicleId);
    }
}
