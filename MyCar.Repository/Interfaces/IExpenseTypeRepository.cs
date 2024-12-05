using MyCar.DataAccess.Models;

namespace MyCar.Repository.Interfaces;

public interface IExpenseTypeRepository
{
    void Insert(ExpenseType expenseType);
    void Delete(ExpenseType expenseType);
    IQueryable<ExpenseType> GetAll();
    int SaveChanges();
}
