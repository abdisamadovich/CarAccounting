using MyCar.DataAccess.Models;
using System.Linq.Expressions;

namespace MyCar.Repository.Interfaces;

public interface IExpenseRepository
{
    void Insert(Expense expense);
    void Update(Expense expense);
    IQueryable<Expense> GetAll();
    int DeleteByCriteria(Expression<Func<Expense, bool>> criteria);
    int SaveChanges();
}