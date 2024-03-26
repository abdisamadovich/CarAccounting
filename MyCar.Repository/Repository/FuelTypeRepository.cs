using Microsoft.EntityFrameworkCore;
using MyCar.DataAccess;
using MyCar.DataAccess.Models;
using MyCar.Repository.Interfaces;

namespace MyCar.Repository.Repository;

public class FuelTypeRepository : IFuelTypeRepository
{
    private MainContext MainContext;

    public FuelTypeRepository(MainContext mainContext)
    {
        MainContext = mainContext;
    }
    public void Insert(FuelType fuelType)
    {
        MainContext.FuelTypes.Add(fuelType);
    }
    public void Delete(FuelType fuelType)
    {
        if(MainContext.Entry(fuelType).State != EntityState.Deleted)
        {
            MainContext.FuelTypes.Remove(fuelType);
        }
    }

    public IQueryable<FuelType> GetAll()
    {
        return MainContext.FuelTypes;
    }

    /*public void Update(FuelType fuelType)
    {
        if(MainContext.Entry(fuelType).State == EntityState.Modified)
        {
            MainContext.Entry(fuelType).State = EntityState.Modified;
        }
    }*/
    public int SaveChanges()
    {
        return MainContext.SaveChanges();
    }
}