namespace MyCar.DataAccess.Models;

public class Service
{
    public int Id { get; set; }
    public int VehicleId { get; set; }
    public Vehicle Vehicle { get; set; }
    public DateTime Date { get; set; }
    public int Odometer { get; set; }
    public int ServiceTypeId { get; set; }
    public ServiceType ServiceType { get; set; }
    public string Place { get; set; }
    public decimal Price { get; set; }
    public string Notes { get; set; }
}