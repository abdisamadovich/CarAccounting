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


        if ((recordInfo.PreviousRecord != null && service.Odometer < recordInfo.PreviousRecord.Odometer) ||
               (recordInfo.NextRecord != null && service.Odometer > recordInfo.NextRecord.Odometer))
        {
            throw new ArgumentException("Odometer reading must be between the previous and next readings.");
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
            Vehicle = new VehicleGetViewModel
            {
                Id = x.VehicleId,
                Name = x.Vehicle.Name,
                ManufacturerId = x.Vehicle.ManufacturerId,
                Manufacturer = new ManufacturerViewModel
                {
                    Id = x.Vehicle.Manufacturer.Id,
                    Name = x.Vehicle.Manufacturer.Name,
                },
                Model = x.Vehicle.Model,
                FuelTypeId = x.Vehicle.FuelTypeId,
                FuelType = new FuelTypeViewModel
                {
                    Id = x.Vehicle.FuelType.Id,
                    Name = x.Vehicle.FuelType.Name,
                },
                FuelCapacity = x.Vehicle.FuelCapacity,
                Description = x.Vehicle.Description,
            },
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
