using Microsoft.EntityFrameworkCore;
using MyCar.DataAccess;
using MyCar.DataAccess.Models;
using MyCar.Repository.Interfaces;

namespace MyCar.Repository.Repository;

public class ServiceTypeRepository : IServiceTypeRepository
{
    private MainContext MainContext;
    public ServiceTypeRepository(MainContext mainContext)
    {
        MainContext = mainContext;
    }
    public void Delete(ServiceType serviceType)
    {
        if (MainContext.Entry(serviceType).State != EntityState.Deleted)
        {
            MainContext.ServiceTypes.Remove(serviceType);
        }
    }

    public IQueryable<ServiceType> GetAll()
    {
        return MainContext.ServiceTypes;
    }

    public void Insert(ServiceType serviceType)
    {
        MainContext.ServiceTypes.Add(serviceType);
    }

    public int SaveChanges()
    {
        return MainContext.SaveChanges();
    }
}
