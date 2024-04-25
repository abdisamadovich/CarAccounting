using MyCar.DataAccess.Models;
using MyCar.Repository.Interfaces;
using MyCar.Service.Interfaces;
using MyCar.Service.ViewModels.Vehicles;
using MyCar.Errors;

namespace MyCar.Service.Service;

public class VehicleService : IVehicleService
{
    private IVehicleRepository _repository;

    public VehicleService(IVehicleRepository repository)
    {
        _repository = repository;
    }
    public void CreateNew(VehiclePostViewModel vehicle)
    {
        if(vehicle == null )
        {
            throw new ArgumentNullException(nameof(vehicle));
        }

        if (string.IsNullOrEmpty(vehicle.Name))
        {
            throw new ParameterInvalidException("Name cannot be empty");
        }

        var entity = new Vehicle 
        { 
            Name = vehicle.Name,
            ManufacturerId = vehicle.ManufacturerId,
            Model = vehicle.Model,
            FuelTypeId = vehicle.FuelTypeId,
            FuelCapacity = vehicle.FuelCapacity,
            Description = vehicle.Description,
        };

        _repository.Insert(entity);
        _repository.SaveChanges();
    }

    public void Delete(int id)
    {
        var result = _repository.GetAll().Where(x => x.Id == id).FirstOrDefault();
        if(result == null)
        {
            throw new ArgumentNullException(nameof(Vehicle));
        }
        _repository.Delete(result);
        _repository.SaveChanges();
    }

    public List<VehicleGetViewModel> GetAll()
    {
        var result = _repository.GetAll().Select(x => new VehicleGetViewModel
        {
            Id = x.Id,
            Name = x.Name,
            Manufacturer = x.Manufacturer,
            ManufacturerId = x.ManufacturerId,
            Model = x.Model,
            FuelTypeId = x.FuelTypeId,
            FuelType = x.FuelType,
            FuelCapacity = x.FuelCapacity,
            Description = x.Description,
        }).ToList();

        return result;
    }
}