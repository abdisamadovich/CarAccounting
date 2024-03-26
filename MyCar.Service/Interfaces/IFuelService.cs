using MyCar.Service.ViewModels;

namespace MyCar.Service.Interfaces;

public interface IFuelService
{
    public void CreateNew(FuelPostViewModel fuel);
    public void Delete(int id);
    public List<FuelGetViewModel> GetAllFuel();
}