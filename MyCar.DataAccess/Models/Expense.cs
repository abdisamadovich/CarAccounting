namespace MyCar.DataAccess.Models;

public class Expense
{
    public int Id { get; set; }
    public int VehicleId { get; set; }
    public Vehicle Vehicle { get; set; }
    public DateTime Date { get; set; }
    public int Odometer { get; set; }
    public int ExpenseTypeId { get; set; }
    public ExpenseType ExpenseType { get; set; }
    public string Place { get; set; }
    public string Description { get; set; }
    public int Cost { get; set; }
}