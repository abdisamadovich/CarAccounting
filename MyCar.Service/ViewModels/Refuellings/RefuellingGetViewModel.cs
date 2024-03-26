using MyCar.DataAccess.Models;

namespace MyCar.Service.ViewModels.Refuellings;

public class RefuellingGetViewModel
{
    public int Id { get; set; }
    public DateTime Date { get; set; }
    public int Odometer { get; set; }
    public int FuelId { get; set; }
    public Fuel Fuel { get; set; }
    public int Price { get; set; }
    public int TotalCost { get; set; }
    public int Quantity { get; set; }
    public bool IsFilled { get; set; }
    public string Station { get; set; }
}