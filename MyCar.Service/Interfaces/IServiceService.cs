using MyCar.Service.ViewModels.Services;

namespace MyCar.Service.Interfaces;

public interface IServiceService
{
    void CreateNew(ServicePostViewModel service);
    public void Delete(int id);
    List<ServiceGetViewModel> GetAll();
}
