using MyCar.DataAccess.Models;
using MyCar.Errors;
using MyCar.Repository.Interfaces;
using MyCar.Service.Interfaces;
using MyCar.Service.ViewModels.FuelsTypesViewModel;

namespace MyCar.Service.Service;

public class FuelTypeService : IFuelTypeService
{
    private readonly IFuelTypeRepository _repository;
    public FuelTypeService(IFuelTypeRepository repository)
    {
        _repository = repository;
    }
    public void CreateNew(FuelTypeViewModel fuelType)
    {
        if (fuelType == null)
        {
            throw new ArgumentNullException(nameof(fuelType));
        }

        if (string.IsNullOrEmpty(fuelType.Name))
        {
            throw new ParameterInvalidException("Name cannot be empty");
        }

        if (_repository.GetAll().Any(st => st.Name == fuelType.Name))
        {
            throw new ParameterInvalidException("Fuel type with the same name already exists");
        }

        var entity = new FuelType
        {
            Name = fuelType.Name,
        };

        _repository.Insert(entity);
        _repository.SaveChanges();
        fuelType.Id = entity.Id;
    }

    public void Delete(int id)
    {
        var result = _repository.GetAll().Where(x => x.Id == id).FirstOrDefault();
        if (result == null)
        {
            throw new ArgumentNullException(nameof(FuelType));
        }
        _repository.Delete(result);
        _repository.SaveChanges();
    }

    public List<FuelTypeViewModel> GetAllFuelType()
    {
        var result = _repository.GetAll().Select(x => new FuelTypeViewModel
        {
            Id = x.Id,
            Name = x.Name,
        }).ToList();

        return result;
    }
}