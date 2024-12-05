namespace MyCar.DataAccess.Models;

public class Vehicle
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int ManufacturerId { get; set; }
    public Manufacturer Manufacturer { get; set; }
    public string Model { get; set; }
    public int FuelTypeId { get; set; }
    public FuelType FuelType { get; set; }
    public int FuelCapacity { get; set; }
    public string Description { get; set; }
}