using MyCar.DataAccess.Models;
using System.Linq.Expressions;

namespace MyCar.Repository.Interfaces;

public interface IVehicleRepository
{
    void Insert(Vehicle vehicle);
    void Delete(Expression<Func<Vehicle, bool>> predicate);
    IQueryable<Vehicle> GetAll();
    int SaveChanges();
}
