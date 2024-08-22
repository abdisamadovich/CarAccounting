using MyCar.DataAccess.Models;
using System.Linq.Expressions;

namespace MyCar.Repository.Interfaces;

public interface IServiceRepository
{
    void Insert(Service service);
    IQueryable<Service> GetAll();
    void Update(Service service);
    int DeleteByCriteria(Expression<Func<Service, bool>> criteria);
    int SaveChanges();
}