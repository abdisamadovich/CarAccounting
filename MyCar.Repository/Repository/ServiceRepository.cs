using Microsoft.EntityFrameworkCore;
using MyCar.DataAccess;
using MyCar.DataAccess.Models;
using MyCar.Repository.Interfaces;

namespace MyCar.Repository.Repository;

public class ServiceRepository : IServiceRepository
{
    private MainContext MainContext;
    public ServiceRepository(MainContext mainContext)
    {
        MainContext = mainContext;
    }
    public void Delete(Service service)
    {
        if (MainContext.Entry(service).State != EntityState.Deleted)
        {
            MainContext.Services.Remove(service);
        }
    }

    public IQueryable<Service> GetAll()
    {
        return MainContext.Services;
    }

    public void Insert(Service service)
    {
        MainContext.Services.Add(service);
    }

    public int SaveChanges()
    {
        return MainContext.SaveChanges();
    }

    public void Update(Service service)
    {
        if (MainContext.Entry(service).State != EntityState.Modified)
        {
            MainContext.Entry(service).State = EntityState.Modified;
        }
    }
}
