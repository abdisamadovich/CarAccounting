using MyCar.DataAccess.Models;
using MyCar.Errors;
using MyCar.Repository.Interfaces;
using MyCar.Service.Interfaces;
using MyCar.Service.ViewModels.Expense;
using MyCar.Service.ViewModels.ExpenseType;
using MyCar.Service.ViewModels.FuelsTypesViewModel;
using MyCar.Service.ViewModels.Manufacturers;
using MyCar.Service.ViewModels.Vehicles;

namespace MyCar.Service.Service;

public class ExpenseService : IExpenseService
{
    private readonly IExpenseRepository _repository;
    public ExpenseService(IExpenseRepository repository)
    {
        _repository = repository;
    }

    public void CreateNew(ExpensePostViewModel expense)
    {
        if (expense == null) throw new ArgumentNullException(nameof(expense));

        var entity = new Expense
        {
            VehicleId = expense.VehicleId,
            ExpenseTypeId = expense.ExpenseTypeId,
            Date = expense.Date,
            Odometer = expense.Odometer,
            Place = expense.Place,
            Description = expense.Description,
            Value = expense.Value,
        };

        _repository.Insert(entity);
        _repository.SaveChanges();
    }

    public void Delete(int id)
    {
        var result = _repository.GetAll().Where(x => x.Id == id).FirstOrDefault();
        if (result == null)
        {
            throw new NotFoundException(nameof(Expense));
        }
        _repository.Delete(result);
        _repository.SaveChanges();
    }

    public List<ExpenseGetViewModel> GetAllExpense()
    {
        var result = _repository.GetAll().Select(x => new ExpenseGetViewModel
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
            ExpenseTypeId = x.ExpenseTypeId,
            ExpenseType = new ExpenseTypeViewModel
            {
                Id = x.ExpenseType.Id,
                Name = x.ExpenseType.Name,
            },
            Place = x.Place,
            Description = x.Description,
            Value = x.Value,
        }).ToList();

        return result;
    }
}
