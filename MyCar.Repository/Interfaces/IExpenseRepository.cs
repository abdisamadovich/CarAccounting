using MyCar.DataAccess.Models;

namespace MyCar.Repository.Interfaces;

public interface IExpenseRepository
{
    void Insert(Expense expense);
    void Delete(Expense expense);
    void Update(Expense expense);
    IQueryable<Expense> GetAll();
    int SaveChanges();
}