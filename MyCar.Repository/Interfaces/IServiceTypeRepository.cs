using MyCar.DataAccess.Models;

namespace MyCar.Repository.Interfaces;

public interface IServiceTypeRepository
{
    public void Insert(ServiceType serviceType);
    public void Delete(ServiceType serviceType);
    public IQueryable<ServiceType> GetAll();
    public int SaveChanges();
}