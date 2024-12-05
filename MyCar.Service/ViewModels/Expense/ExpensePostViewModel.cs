namespace MyCar.Service.ViewModels.Expense;

public class ExpensePostViewModel
{
    public int Id { get; set; }
    public int VehicleId { get; set; }
    public DateTime Date { get; set; }
    public int Odometer { get; set; }
    public int ExpenseTypeId { get; set; }
    public string Place { get; set; }
    public string Description { get; set; }
    public decimal Cost { get; set; }
}
