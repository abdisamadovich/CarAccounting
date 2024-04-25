using MyCar.Service.ViewModels.FuelsViewModel;

namespace MyCar.Service.Interfaces;

public interface IFuelService
{
    void CreateNew(FuelPostViewModel fuel);
    void Delete(int id);
    List<FuelGetViewModel> GetAllFuel();
}