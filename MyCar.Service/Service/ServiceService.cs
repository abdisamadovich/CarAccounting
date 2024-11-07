using MyCar.DataAccess.Models;
using MyCar.Repository.Interfaces;
using MyCar.Service.Interfaces;
using MyCar.Service.ViewModels.FuelsTypesViewModel;
using MyCar.Service.ViewModels.Manufacturers;
using MyCar.Service.ViewModels.Services;
using MyCar.Service.ViewModels.ServiceTypeViewModel;
using MyCar.Service.ViewModels.Vehicles;

namespace MyCar.Service.Service;

public class ServiceService : IServiceService
{
    private readonly IServiceRepository _repository;
    private readonly IRecordRepository _recordRepository;
    public ServiceService(IServiceRepository repository, IRecordRepository recordRepository)
    {
        _repository = repository;
        _recordRepository = recordRepository;
    }
    public void CreateNew(ServicePostViewModel service)
    {

        if (service == null) throw new ArgumentNullException(nameof(service));

        var recordInfo = _recordRepository.GetPreviousAndNextRecord(service.VehicleId, service.Date);

        if (recordInfo.PreviousRecord != null && recordInfo.NextRecord != null)
        {
            if (service.Odometer < recordInfo.PreviousRecord.Odometer || service.Odometer > recordInfo.NextRecord.Odometer)
            {
                throw new ArgumentException($"Odometer reading must be between {recordInfo.PreviousRecord.Odometer} and {recordInfo.NextRecord.Odometer}.");
            }
        }
        else if (recordInfo.PreviousRecord != null)
        {
            if (service.Odometer < recordInfo.PreviousRecord.Odometer)
            {
                throw new ArgumentException($"Odometer reading must be greater than or equal to {recordInfo.PreviousRecord.Odometer}.");
            }
        }
        else if (recordInfo.NextRecord != null)
        {
            if (service.Odometer > recordInfo.NextRecord.Odometer)
            {
                throw new ArgumentException($"Odometer reading must be less than or equal to {recordInfo.NextRecord.Odometer}.");
            }
        }

        var entity = new DataAccess.Models.Service
        {
            VehicleId = service.VehicleId,
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
            VehicleId = x.VehicleId,
            Date = x.Date,
            Odometer = x.Odometer,
            ServiceTypeId = x.ServiceTypeId,

            ServiceType = new ServicesTypeViewModel
            {
                Id = x.ServiceType.Id,
                Name = x.ServiceType.Name,
            },
            Place = x.Place,
            Price = x.Price,
            Notes = x.Notes,
        }).ToList();

        return result;
    }
}
