namespace MyCar.Service.ViewModels.Services;

public class ServicePostViewModel
{
    public int VehicleId { get; set; }
    public DateTime Date { get; set; }
    public int Odometer { get; set; }
    public int ServiceTypeId { get; set; }
    public string Place { get; set; }
    public decimal Price { get; set; }
    public string Notes { get; set; }
}
