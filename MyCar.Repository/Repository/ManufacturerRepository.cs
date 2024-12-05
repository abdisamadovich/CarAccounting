using Microsoft.EntityFrameworkCore;
using MyCar.DataAccess;
using MyCar.DataAccess.Models;
using MyCar.Repository.Interfaces;

namespace MyCar.Repository.Repository;

public class ManufacturerRepository : IManufacturerRepository
{
    private MainContext MainContext;
    public ManufacturerRepository(MainContext mainContext)
    {
        MainContext = mainContext;
    }

    public void Delete(Manufacturer manufacturer)
    {
        if (MainContext.Entry(manufacturer).State != EntityState.Deleted)
        {
            MainContext.Manufacturers.Remove(manufacturer);
        }
    }

    public IQueryable<Manufacturer> GetAll()
    {
        return MainContext.Manufacturers;
    }

    public void Insert(Manufacturer manufacturer)
    {
        MainContext.Manufacturers.Add(manufacturer);
    }

    public int SaveChanges()
    {
        return MainContext.SaveChanges();
    }
}
