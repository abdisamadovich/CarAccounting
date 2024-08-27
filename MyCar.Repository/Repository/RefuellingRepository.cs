using Microsoft.EntityFrameworkCore;
using MyCar.DataAccess;
using MyCar.DataAccess.Models;
using MyCar.Errors;
using MyCar.Repository.Interfaces;
using System.Linq.Expressions;

namespace MyCar.Repository.Repository;

public class RefuellingRepository : IRefuellingRepository
{
    private MainContext MainContext;
    public RefuellingRepository(MainContext mainContext)
    {
        MainContext = mainContext;
    }

    public void Delete(Refuelling refuelling)
    {
        if (MainContext.Entry(refuelling).State != EntityState.Deleted)
        {
            MainContext.Refuellings.Remove(refuelling);
        }
    }

    public int DeleteByCriteria(Expression<Func<Refuelling, bool>> criteria)
    {
        return MainContext.Refuellings.Where(criteria).ExecuteDelete();
    }

    public IQueryable<Refuelling> GetAll()
    {
        return MainContext.Refuellings;
    }

    public void Insert(Refuelling refuelling)
    {
        var res = MainContext.Fuels.FirstOrDefault(x => x.Id == refuelling.FuelId);
        if (res == null) throw new EntryNotFoundException(nameof(FuelType));

        MainContext.Refuellings.Add(refuelling);
    }

    public int SaveChanges()
    {
        return MainContext.SaveChanges();
    }

    public void Update(Refuelling refuelling)
    {
        if (MainContext.Entry(refuelling).State != EntityState.Modified)
        {
            MainContext.Entry(refuelling).State = EntityState.Modified;
        }
    }
}