using MyCar.DataAccess.Models;

namespace MyCar.Repository.Interfaces;

public interface IServiceRepository
{
    public void Insert(Service service);
    public void Delete(Service service);
    public IQueryable<Service> GetAll();
    public void Update(Service service);
    public int SaveChanges();
}