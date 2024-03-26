using MyCar.DataAccess.Models;

namespace MyCar.Repository.Interfaces;

public interface IExpenseTypeRepository
{
    public void Insert(ExpenseType expenseType);
    public void Delete(ExpenseType expenseType);
    public IQueryable<ExpenseType> GetAll();
    public int SaveChanges();
}
