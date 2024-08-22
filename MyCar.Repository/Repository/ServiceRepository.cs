using Microsoft.EntityFrameworkCore;
using MyCar.DataAccess;
using MyCar.DataAccess.Models;
using MyCar.Errors;
using MyCar.Repository.Interfaces;
using System.Linq;
using System.Linq.Expressions;

namespace MyCar.Repository.Repository;

public class ServiceRepository : IServiceRepository
{
    private MainContext MainContext;
    public ServiceRepository(MainContext mainContext)
    {
        MainContext = mainContext;
    }

    public int DeleteByCriteria(Expression<Func<Service, bool>> criteria)
    {
        return MainContext.Services.Where(criteria).ExecuteDelete();
    }

    public IQueryable<Service> GetAll()
    {
        return MainContext.Services;
    }

    public void Insert(Service service)
    {
        var res = MainContext.ServiceTypes.FirstOrDefault(x => x.Id == service.ServiceTypeId);
        if (res == null)
        {
            throw new EntryNotFoundException(nameof(service.ServiceTypeId));
        }
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
