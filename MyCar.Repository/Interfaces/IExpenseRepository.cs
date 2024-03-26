using MyCar.DataAccess.Models;

namespace MyCar.Repository.Interfaces;

public interface IExpenseRepository
{
    public void Insert(Expense expense);
    public void Delete(Expense expense);
    public void Update(Expense expense);
    public IQueryable<Expense> GetAll();
    public int SaveChanges();
}