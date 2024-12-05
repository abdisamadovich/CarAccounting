using MyCar.Service.ViewModels.Manufacturers;

namespace MyCar.Service.Interfaces;

public interface IManufacturerService
{
    void CreateNew(ManufacturerViewModel fuel);
    public void Delete(int id);
    List<ManufacturerViewModel> GetAll();
}