using MyCar.DataAccess.Models;
using MyCar.Errors;
using MyCar.Repository.Interfaces;
using MyCar.Service.Interfaces;
using MyCar.Service.ViewModels.ServiceTypeViewModel;

namespace MyCar.Service.Service;

public class ServiceTypeService : IServiceTypeService
{
    private readonly IServiceTypeRepository _repository;
    public ServiceTypeService(IServiceTypeRepository repository)
    {
        _repository = repository;
    }

    public void CreateNew(ServiceTypeViewModel serviceType)
    {
        if (serviceType == null)
        {
            throw new ArgumentNullException(nameof(serviceType));
        }
        if (string.IsNullOrEmpty(serviceType.Name))
        {
            throw new ParameterInvalidException("Name cannot be empty");
        }

        if (_repository.GetAll().Any(st => st.Name == serviceType.Name))
        {
            throw new ParameterInvalidException("Service type with the same name already exists");
        }

        var entity = new ServiceType
        {
            Name = serviceType.Name,
        };

        _repository.Insert(entity);
        _repository.SaveChanges();
        serviceType.Id = entity.Id;
    }

    public void Delete(int id)
    {
        var result = _repository.GetAll().Where(x => x.Id == id).FirstOrDefault();
        if (result == null)
        {
            throw new ArgumentNullException(nameof(ServiceType));
        }
        _repository.Delete(result);
        _repository.SaveChanges();
    }

    public List<ServiceTypeViewModel> GetAllServiceType()
    {
        var result = _repository.GetAll().Select(x => new ServiceTypeViewModel
        {
            Id = x.Id,
            Name = x.Name,
        }).ToList();

        return result;
    }
}
