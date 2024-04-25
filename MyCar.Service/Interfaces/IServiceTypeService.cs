using MyCar.Service.ViewModels.ServiceTypeViewModel;

namespace MyCar.Service.Interfaces;

public interface IServiceTypeService
{
    void CreateNew(ServiceTypeViewModel serviceType);
    public void Delete(int id);
    List<ServiceTypeViewModel> GetAllServiceType();
}
