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
    private readonly IRecordRepository _recordRepository;
    public ExpenseService(IExpenseRepository repository, IRecordRepository recordRepository)
    {
        _repository = repository;
        _recordRepository = recordRepository;
    }

    public void CreateNew(ExpensePostViewModel expense)
    {
        if (expense == null) throw new ArgumentNullException(nameof(expense));

        var recordInfo = _recordRepository.GetPreviousAndNextRecord(expense.VehicleId, expense.Date);

        if ((recordInfo.PreviousRecord != null && expense.Odometer < recordInfo.PreviousRecord.Odometer) ||
                (recordInfo.NextRecord != null && expense.Odometer > recordInfo.NextRecord.Odometer))
        {
            throw new ArgumentException("Odometer reading must be between the previous and next readings.");
        }

        var entity = new Expense
        {
            VehicleId = expense.VehicleId,
            ExpenseTypeId = expense.ExpenseTypeId,
            Date = expense.Date,
            Odometer = expense.Odometer,
            Place = expense.Place,
            Description = expense.Description,
            Cost = expense.Cost,
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
            Cost = x.Cost,
        }).ToList();

        return result;
    }
}
