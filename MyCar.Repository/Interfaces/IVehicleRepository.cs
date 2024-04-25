using MyCar.DataAccess.Models;

namespace MyCar.Repository.Interfaces;

public interface IVehicleRepository
{
    void Insert(Vehicle vehicle);
    void Delete(Vehicle vehicle);
    IQueryable<Vehicle> GetAll();
    int SaveChanges();
}
