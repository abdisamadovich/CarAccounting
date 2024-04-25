using MyCar.Service.ViewModels.Vehicles;

namespace MyCar.Service.Interfaces;

public interface IVehicleService
{
    void CreateNew(VehiclePostViewModel vehicle);
    public void Delete(int id);
    List<VehicleGetViewModel> GetAll();
}
