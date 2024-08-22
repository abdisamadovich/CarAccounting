using MyCar.Service.ViewModels.Vehicles;

namespace MyCar.Service.Interfaces;

public interface IVehicleService
{
    void CreateNew(VehiclePostViewModel vehicle);
    Task DeleteAsync(int id);
    List<VehicleGetViewModel> GetAll();
}
