using MyCar.DataAccess.Models;

namespace MyCar.Repository.Interfaces;

public interface IServiceTypeRepository
{
    void Insert(ServiceType serviceType);
    void Delete(ServiceType serviceType);
    IQueryable<ServiceType> GetAll();
    int SaveChanges();
}