namespace MyCar.DataAccess.Models;

public class Fuel
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int FuelTypeId { get; set; }
    public FuelType FuelType { get; set; }
}