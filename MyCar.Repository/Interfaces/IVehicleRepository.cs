using MyCar.DataAccess.Models;

namespace MyCar.Repository.Interfaces;

public interface IVehicleRepository
{
    public void Insert(Vehicle vehicle);
    public void Delete(Vehicle vehicle);
    public IQueryable<Vehicle> GetAll();
    public int SaveChanges();
}
