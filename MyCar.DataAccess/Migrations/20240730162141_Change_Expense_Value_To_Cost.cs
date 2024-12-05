using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyCar.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class Change_Expense_Value_To_Cost : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Value",
                table: "Expense",
                newName: "Cost");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Cost",
                table: "Expense",
                newName: "Value");
        }
    }
}
