using Microsoft.EntityFrameworkCore;
using MyCar.DataAccess;
using MyCar.DataAccess.Models;
using MyCar.Repository.Interfaces;

namespace MyCar.Repository.Repository;

public class ExpenseTypeRepository : IExpenseTypeRepository
{
    private MainContext MainContext;
    public ExpenseTypeRepository(MainContext mainContext)
    {
        MainContext = mainContext;
    }
    public void Delete(ExpenseType expenseType)
    {
        if (MainContext.Entry(expenseType).State != EntityState.Deleted)
        {
            MainContext.ExpenseTypes.Remove(expenseType);
        }
    }

    public IQueryable<ExpenseType> GetAll()
    {
        return MainContext.ExpenseTypes;
    }

    public void Insert(ExpenseType expenseType)
    {
        MainContext.ExpenseTypes.Add(expenseType);
    }

    public int SaveChanges()
    {
        return MainContext.SaveChanges();
    }
}