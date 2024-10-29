using MyCar.Service.ViewModels.ServiceTypeViewModel;
using MyCar.Service.ViewModels.Vehicles;

namespace MyCar.Service.ViewModels.Services;

public class ServiceGetViewModel
{
    public int Id { get; set; }
    public int VehicleId { get; set; }
    public VehicleViewModel Vehicle { get; set; }
    public DateTime Date { get; set; }
    public int Odometer { get; set; }
    public int ServiceTypeId { get; set; }
    public ServicesTypeViewModel ServiceType { get; set; }
    public string Place { get; set; }
    public decimal Price { get; set; }
    public string Notes { get; set; }
}
