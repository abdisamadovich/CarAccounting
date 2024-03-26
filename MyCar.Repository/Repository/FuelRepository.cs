using Microsoft.EntityFrameworkCore;
using MyCar.DataAccess;
using MyCar.DataAccess.Models;
using MyCar.Repository.Interfaces;
using MyCar.Errors;

namespace MyCar.Repository.Repository;

public class FuelRepository : IFuelRepository
{
    private MainContext MainContext;
    public FuelRepository(MainContext mainContext)
    {
        MainContext = mainContext;
    }
    public void Insert(Fuel fuel)
    {
        var res = MainContext.FuelTypes.FirstOrDefault(x => x.Id == fuel.FuelTypeId);
        if (res == null)
        {
            throw new EntryNotFoundException(nameof(FuelType));
        }
        MainContext.Fuels.Add(fuel);
    }
    public void Delete(Fuel fuel)
    {
        if (MainContext.Entry(fuel).State != EntityState.Deleted)
        {
            MainContext.Fuels.Remove(fuel);
        }
    }
    public IQueryable<Fuel> GetAll()
    {
        return MainContext.Fuels;
    }
    public int SaveChanges()
    {
        return MainContext.SaveChanges();
    }
}
