using MyCar.Service.ViewModels.Vehicles;

namespace MyCar.Service.Interfaces;

public interface IVehicleService
{
    VehicleViewModel CreateNew(VehicleViewModel vehicle);
    void Delete(int id);
    List<VehicleViewModel> GetAll();
}
