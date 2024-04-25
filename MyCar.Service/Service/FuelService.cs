using MyCar.DataAccess.Models;
using MyCar.Errors;
using MyCar.Repository.Interfaces;
using MyCar.Service.Interfaces;
using MyCar.Service.ViewModels.FuelsViewModel;

namespace MyCar.Service.Service;

public class FuelService : IFuelService
{
    private readonly IFuelRepository _repository;
    public FuelService(IFuelRepository fuelRepository)
    {
        _repository = fuelRepository;
    }
    public void CreateNew(FuelPostViewModel fuel)
    {
        if (fuel == null)
        {
            throw new ArgumentNullException(nameof(fuel));
        }

        if (string.IsNullOrEmpty(fuel.Name))
        {
            throw new ParameterInvalidException("Name cannot be empty");
        }

        if (_repository.GetAll().Any(st => st.Name == fuel.Name))
        {
            throw new ParameterInvalidException("Fuel with the same name already exists");
        }

        var entity = new Fuel
        {
            Name = fuel.Name,
            FuelTypeId = fuel.FuelTypeId,
        };
        _repository.Insert(entity);
        _repository.SaveChanges();
    }

    public void Delete(int Id)
    {
        var result = _repository.GetAll().Where(x => x.Id == Id).FirstOrDefault();
        if (result == null)
        {
            throw new ArgumentNullException(nameof(Fuel));
        }
        _repository.Delete(result);
        _repository.SaveChanges();
    }

    public List<FuelGetViewModel> GetAllFuel()
    {
        var result = _repository.GetAll().Select(x => new FuelGetViewModel
        {
            Id = x.Id,
            Name = x.Name,
            FuelTypeId = x.FuelTypeId,
            FuelType = x.FuelType,
        }).ToList();

        return result;
    }
}
