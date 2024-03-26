using MyCar.Service.ViewModels;

namespace MyCar.Service.Interfaces;

public interface IManufacturerService
{
    public void CreateNew(ManufacturerViewModel fuel);
    public void Delete(int id);
    public List<ManufacturerViewModel> GetAll();
}