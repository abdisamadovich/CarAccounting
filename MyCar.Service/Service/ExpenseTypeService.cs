using MyCar.DataAccess.Models;
using MyCar.Errors;
using MyCar.Repository.Interfaces;
using MyCar.Service.Interfaces;
using MyCar.Service.ViewModels.ExpenseType;

namespace MyCar.Service.Service;

public class ExpenseTypeService : IExpenseTypeService
{
    private readonly IExpenseTypeRepository _service;
    public ExpenseTypeService(IExpenseTypeRepository service)
    {
        _service = service;
    }

    public void CreateNew(ExpenseTypeViewModel expenseType)
    {
        if (expenseType == null)
        {
            throw new ArgumentNullException(nameof(expenseType));
        }

        if (string.IsNullOrEmpty(expenseType.Name))
        {
            throw new ParameterInvalidException("Name cannot be empty");
        }

        if (_service.GetAll().Any(st => st.Name == expenseType.Name))
        {
            throw new ParameterInvalidException("Expense type with the same name already exists");
        }

        var entity = new ExpenseType
        {
            Name = expenseType.Name,
        };

        _service.Insert(entity);
        _service.SaveChanges();
    }

    public void Delete(int id)
    {
        var result = _service.GetAll().Where(x => x.Id == id).FirstOrDefault();
        if (result == null)
        {
            throw new NotFoundException(nameof(ExpenseType));
        }
        _service.Delete(result);
        _service.SaveChanges();
    }

    public List<ExpenseTypeViewModel> GetAllExpenseType()
    {
        var result = _service.GetAll().Select(x => new ExpenseTypeViewModel
        {
            Id = x.Id,
            Name = x.Name,
        }).ToList();

        return result;
    }
}
