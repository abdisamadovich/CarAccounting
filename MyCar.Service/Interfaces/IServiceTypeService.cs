using MyCar.Service.ViewModels.ServiceTypeViewModel;

namespace MyCar.Service.Interfaces;

public interface IServiceTypeService
{
    void CreateNew(ServicesTypeViewModel serviceType);
    public void Delete(int id);
    List<ServicesTypeViewModel> GetAllServiceType();
}
