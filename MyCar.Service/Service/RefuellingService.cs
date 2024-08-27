using MyCar.DataAccess.Models;
using MyCar.Repository.Interfaces;
using MyCar.Service.Interfaces;
using MyCar.Service.ViewModels.FuelsTypesViewModel;
using MyCar.Service.ViewModels.FuelsViewModel;
using MyCar.Service.ViewModels.Manufacturers;
using MyCar.Service.ViewModels.Refuellings;
using MyCar.Service.ViewModels.Vehicles;

namespace MyCar.Service.Service;

public class RefuellingService : IRefuellingService
{
    private readonly IRefuellingRepository _repository;
    private readonly IRecordRepository _recordRepository;

    public RefuellingService(IRefuellingRepository repository, IRecordRepository recordRepository)
    {
        _repository = repository;
        _recordRepository = recordRepository;
    }

    public void CreateNew(RefuellingPostViewModel refuelling)
    {
        if (refuelling == null) throw new ArgumentNullException(nameof(refuelling));

        var recordInfo = _recordRepository.GetPreviousAndNextRecord(refuelling.VehicleId, refuelling.Date);

        if ((recordInfo.PreviousRecord != null && refuelling.Odometer < recordInfo.PreviousRecord.Odometer) ||
                (recordInfo.NextRecord != null && refuelling.Odometer > recordInfo.NextRecord.Odometer))
        {
            throw new ArgumentException("Odometer reading must be between the previous and next readings.");
        }

        var entity = new Refuelling
        {
            VehicleId = refuelling.VehicleId,
            Date = refuelling.Date,
            Odometer = refuelling.Odometer,
            FuelId = refuelling.FuelId,
            Price = refuelling.Price,
            TotalCost = refuelling.TotalCost,
            Quantity = refuelling.Quantity,
            IsFilled = refuelling.IsFilled,
            Station = refuelling.Station,
        };

        _repository.Insert(entity);
        _repository.SaveChanges();
    }

    public void Delete(int id)
    {
        var result = _repository.GetAll().Where(x => x.Id == id).FirstOrDefault();
        if (result == null)
        {
            throw new ArgumentNullException(nameof(Refuelling));
        }
        _repository.Delete(result);
        _repository.SaveChanges();
    }

    public List<RefuellingGetViewModel> GetAll()
    {
        var result = _repository.GetAll().Select(x => new RefuellingGetViewModel
        {
            Id = x.Id,
            VehicleId = x.VehicleId,
            Vehicle = new VehicleGetViewModel
            {
                Id = x.Vehicle.Id,
                Name = x.Vehicle.Name,
                ManufacturerId = x.Vehicle.ManufacturerId,
                Manufacturer = new ManufacturerViewModel
                {
                    Id = x.Vehicle.Manufacturer.Id,
                    Name = x.Vehicle.Manufacturer.Name
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
            FuelId = x.FuelId,
            Fuel = new FuelGetViewModel
            {
                Id = x.Fuel.Id,
                Name = x.Fuel.Name,
                FuelTypeId = x.Fuel.FuelTypeId,
                FuelType = new FuelTypeViewModel
                {
                    Id = x.Fuel.FuelType.Id,
                    Name = x.Fuel.FuelType.Name,
                }
            },
            Price = x.Price,
            TotalCost = x.TotalCost,
            Quantity = x.Quantity,
            IsFilled = x.IsFilled,
            Station = x.Station,
        }).ToList();

        return result;
    }
}