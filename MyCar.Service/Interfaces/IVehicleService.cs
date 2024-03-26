using MyCar.Service.ViewModels;
using MyCar.Service.ViewModels.Vehicles;

namespace MyCar.Service.Interfaces;

public interface IVehicleService
{
    public void CreateNew(VehiclePostViewModel vehicle);
    public void Delete(int id);
    public List<VehicleGetViewModel> GetAll();
}
