namespace MyCar.DataAccess.Models;

public class Refuelling
{
    public int Id { get; set; }
    public int VehicleId { get; set; }
    public Vehicle Vehicle { get; set; }
    public DateTime Date { get; set; }
    public int Odometer { get; set; }
    public int FuelId { get; set; }
    public Fuel Fuel { get; set; }
    public decimal Price { get; set; }
    public decimal TotalCost { get; set; }
    public decimal Quantity { get; set; }
    public bool IsFilled { get; set; }
    public string Station { get; set; }
}