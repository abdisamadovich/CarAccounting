using MyCar.DataAccess.Models;
using MyCar.Repository.Interfaces;
using MyCar.Service.Interfaces;
using MyCar.Errors;
using MyCar.Service.ViewModels.Manufacturers;

namespace MyCar.Service.Service;

public class ManufacturerService : IManufacturerService
{
    private readonly IManufacturerRepository _repository;
    public ManufacturerService(IManufacturerRepository repository)
    {
        _repository = repository;
    }

    public void CreateNew(ManufacturerViewModel manufacturer)
    {
        if(manufacturer == null)
        {
            throw new ArgumentNullException(nameof(manufacturer));
        }
        if (string.IsNullOrEmpty(manufacturer.Name))
        {
            throw new ParameterInvalidException("Name cannot be empty");
        }

        var entity = new Manufacturer 
        { 
            Name = manufacturer.Name 
        };

        _repository.Insert(entity);
        _repository.SaveChanges();
    }

    public void Delete(int id)
    {
        var result = _repository.GetAll().Where(x => x.Id == id).FirstOrDefault();
        if(result == null)
        {
            throw new ArgumentNullException(nameof(Manufacturer));
        }

        _repository.Delete(result);
        _repository.SaveChanges();
    }

    public List<ManufacturerViewModel> GetAll()
    {
        var result = _repository.GetAll().Select(x => new ManufacturerViewModel
        { 
            Id = x.Id, 
            Name = x.Name 
        }).ToList();

        return result;
    }
}
