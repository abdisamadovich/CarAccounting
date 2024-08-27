using MyCar.DataAccess.Models;
using MyCar.Errors;
using MyCar.Repository.Interfaces;
using MyCar.Service.Interfaces;
using MyCar.Service.ViewModels.FuelsTypesViewModel;
using MyCar.Service.ViewModels.Manufacturers;
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
    public void CreateNew(VehiclePostViewModel vehicle)
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
    }

    public void Delete(int id)
    {
        _expenseRepository.DeleteByCriteria(x => x.VehicleId == id);
        _refuellingRepository.DeleteByCriteria(x => x.VehicleId == id);
        _serviceRepository.DeleteByCriteria(x => x.VehicleId == id);
        _vehicleRepository.Delete(v => v.Id == id);

        _vehicleRepository.SaveChanges();
    }

    public List<VehicleGetViewModel> GetAll()
    {
        var result = _vehicleRepository.GetAll().Select(x => new VehicleGetViewModel
        {
            Id = x.Id,
            Name = x.Name,
            Manufacturer = new ManufacturerViewModel
            {
                Id = x.Manufacturer.Id,
                Name = x.Manufacturer.Name,
            },
            ManufacturerId = x.ManufacturerId,
            Model = x.Model,
            FuelTypeId = x.FuelTypeId,
            FuelType = new FuelTypeViewModel
            {
                Id = x.FuelType.Id,
                Name = x.FuelType.Name,
            },
            FuelCapacity = x.FuelCapacity,
            Description = x.Description,
        }).ToList();

        return result;
    }
}