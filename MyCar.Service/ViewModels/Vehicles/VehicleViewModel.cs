using MyCar.Service.ViewModels.FuelsTypesViewModel;
using MyCar.Service.ViewModels.Manufacturers;

namespace MyCar.Service.ViewModels.Vehicles;

public class VehicleViewModel
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int ManufacturerId { get; set; }
    public string Model { get; set; }
    public int FuelTypeId { get; set; }
    public int FuelCapacity { get; set; }
    public string Description { get; set; }
}
