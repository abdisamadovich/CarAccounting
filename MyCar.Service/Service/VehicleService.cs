using MyCar.DataAccess.Models;
using MyCar.Errors;
using MyCar.Repository.Interfaces;
using MyCar.Service.Interfaces;
using MyCar.Service.ViewModels.Vehicles;

namespace MyCar.Service.Service;

public class VehicleService : IVehicleService
{
    private readonly IVehicleRepository _vehicleRepository;
    private readonly IExpenseRepository _expenseRepository;
    private readonly IRefuellingRepository _refuellingRepository;
    private readonly IServiceRepository _serviceRepository;

    public VehicleService(
        IVehicleRepository vehicleRepository,
        IExpenseRepository expenseRepository,
        IRefuellingRepository refuellingRepository,
        IServiceRepository serviceRepository
    )
    {
        _vehicleRepository = vehicleRepository;
        _expenseRepository = expenseRepository;
        _refuellingRepository = refuellingRepository;
        _serviceRepository = serviceRepository;
    }
    public VehicleViewModel CreateNew(VehicleViewModel vehicle)
    {
        if (vehicle == null)
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

        _vehicleRepository.Insert(entity);
        _vehicleRepository.SaveChanges();

        return new VehicleViewModel
        {
            Id = entity.Id,
            Name = entity.Name,
            ManufacturerId = entity.ManufacturerId,
            Model = entity.Model,
            FuelTypeId = entity.FuelTypeId,
            FuelCapacity = entity.FuelCapacity,
            Description = entity.Description
        };
    }

    public void Delete(int id)
    {
        _expenseRepository.DeleteByCriteria(x => x.VehicleId == id);
        _refuellingRepository.DeleteByCriteria(x => x.VehicleId == id);
        _serviceRepository.DeleteByCriteria(x => x.VehicleId == id);
        _vehicleRepository.Delete(v => v.Id == id);

        _vehicleRepository.SaveChanges();
    }

    public List<VehicleViewModel> GetAll()
    {
        var result = _vehicleRepository.GetAll().Select(x => new VehicleViewModel
        {
            Id = x.Id,
            Name = x.Name,
            ManufacturerId = x.ManufacturerId,
            Model = x.Model,
            FuelTypeId = x.FuelTypeId,
            FuelCapacity = x.FuelCapacity,
            Description = x.Description,
        }).ToList();

        return result;
    }
}