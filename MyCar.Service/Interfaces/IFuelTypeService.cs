using MyCar.Service.ViewModels.FuelsTypesViewModel;

namespace MyCar.Service.Interfaces;

public interface IFuelTypeService
{
    void CreateNew(FuelTypeViewModel fuelType);
    void Delete(int Id);
    List<FuelTypeViewModel> GetAllFuelType();
}