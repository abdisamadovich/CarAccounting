using MyCar.Repository.Interfaces;
using MyCar.Service.Interfaces;
using MyCar.Service.ViewModels.Services;

namespace MyCar.Service.Service;

public class ServiceService : IServiceService
{
    private readonly IServiceRepository _repository;
    public ServiceService(IServiceRepository repository)
    {
        _repository = repository;
    }
    public void CreateNew(ServicePostViewModel service)
    {
        if (service == null)
        {
            throw new ArgumentNullException(nameof(service));
        }

        var entity = new DataAccess.Models.Service
        {
            Date = service.Date,
            Odometer = service.Odometer,
            ServiceTypeId = service.ServiceTypeId,
            Place = service.Place,
            Price = service.Price,
            Notes = service.Notes,
        };

        _repository.Insert(entity);
        _repository.SaveChanges();
    }

    public void Delete(int id)
    {
        var result = _repository.GetAll().Where(x => x.Id == id).FirstOrDefault();
        if (result == null)
        {
            throw new ArgumentNullException(nameof(DataAccess.Models.Service));
        }
        _repository.Delete(result);
        _repository.SaveChanges();
    }

    public List<ServiceGetViewModel> GetAll()
    {
        var result = _repository.GetAll().Select(x => new ServiceGetViewModel
        {
            Id = x.Id,
            Date = x.Date,
            Odometer = x.Odometer,
            ServiceTypeId = x.ServiceTypeId,
            ServiceType = x.ServiceType,
            Place = x.Place,
            Price = x.Price,
            Notes = x.Notes,
        }).ToList();

        return result;
    }
}
