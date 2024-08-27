using Microsoft.EntityFrameworkCore;
using MyCar.DataAccess;
using MyCar.DataAccess.Models;
using MyCar.Repository.Interfaces;
using System.Linq.Expressions;

namespace MyCar.Repository.Repository;

public class ExpenseRepository : IExpenseRepository
{
    private MainContext MainContext;
    public ExpenseRepository(MainContext mainContext)
    {
        MainContext = mainContext;
    }

    public void Delete(Expense expense)
    {
        if (MainContext.Entry(expense).State != EntityState.Deleted)
        {
            MainContext.Expenses.Remove(expense);
        }
    }

    public int DeleteByCriteria(Expression<Func<Expense, bool>> criteria)
    {
        return MainContext.Expenses.Where(criteria).ExecuteDelete();
    }

    public IQueryable<Expense> GetAll()
    {
        return MainContext.Expenses;
    }

    public void Insert(Expense expense)
    {
        MainContext.Expenses.Add(expense);
    }

    public int SaveChanges()
    {
        return MainContext.SaveChanges();
    }

    public void Update(Expense expense)
    {
        if (MainContext.Entry(expense).State != EntityState.Modified)
        {
            MainContext.Entry(expense).State = EntityState.Modified;
        }
    }
}
