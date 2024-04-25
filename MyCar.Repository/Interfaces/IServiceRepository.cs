using MyCar.DataAccess.Models;

namespace MyCar.Repository.Interfaces;

public interface IServiceRepository
{
    void Insert(Service service);
    void Delete(Service service);
    IQueryable<Service> GetAll();
    void Update(Service service);
    int SaveChanges();
}