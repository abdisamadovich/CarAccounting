using Microsoft.EntityFrameworkCore;
using MyCar.DataAccess;
using MyCar.DataAccess.Models;
using MyCar.Repository.Interfaces;

namespace MyCar.Repository.Repository;

public class HistoryRepository : IHistoryRepository
{
    private MainContext MainContext;
    public HistoryRepository(MainContext mainContext)
    {
        MainContext = mainContext;
    }
    public void Delete(History history)
    {
        if (MainContext.Entry(history).State != EntityState.Deleted)
        {
            MainContext.Histories.Remove(history);
        }
    }

    public IQueryable<History> GetAll()
    {
        return MainContext.Histories;
    }

    public void Insert(History history)
    {
        MainContext.Histories.Add(history);
    }

    public int SaveChanges()
    {
        return MainContext.SaveChanges();
    }

    public void Update(History history)
    {
        if (MainContext.Entry(history).State != EntityState.Modified)
        {
            MainContext.Entry(history).State = EntityState.Modified;
        }
    }
}
