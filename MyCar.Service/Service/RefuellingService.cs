using MyCar.DataAccess.Models;
using MyCar.Repository.Interfaces;
using MyCar.Service.Interfaces;
using MyCar.Service.ViewModels.FuelsTypesViewModel;
using MyCar.Service.ViewModels.FuelsViewModel;
using MyCar.Service.ViewModels.Refuellings;

namespace MyCar.Service.Service;

public class RefuellingService : IRefuellingService
{
    private readonly IRefuellingRepository _repository;

    public RefuellingService(IRefuellingRepository repository)
    {
        _repository = repository;
    }
    public void CreateNew(RefuellingPostViewModel refuelling)
    {
        if (refuelling == null) throw new ArgumentNullException(nameof(refuelling));

        var entity = new Refuelling()
        {
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
            Date = x.Date,
            Odometer = x.Odometer,
            FuelId = x.FuelId,
            Fuel = new FuelViewModel
            {
                FuelType = new FuelTypeViewModel
                {
                    Id = x.Fuel.FuelType.Id,
                    Name = x.Fuel.FuelType.Name
                },
                Name = x.Fuel.Name,
                Id = x.Fuel.Id,
                FuelTypeId = x.Fuel.FuelTypeId
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