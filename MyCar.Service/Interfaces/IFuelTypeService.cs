using MyCar.Service.ViewModels.FuelsTypesViewModel;

namespace MyCar.Service.Interfaces;

public interface IFuelTypeService
{
    public void CreateNew(FuelTypeViewModel fuelType);
    public void Delete(int Id);
    public List<FuelTypeViewModel> GetAllFuelType();
}