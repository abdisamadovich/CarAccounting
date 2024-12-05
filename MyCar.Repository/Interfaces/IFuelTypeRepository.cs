using MyCar.DataAccess.Models;

namespace MyCar.Repository.Interfaces;

public interface IFuelTypeRepository
{
    void Insert(FuelType fuelType);
    void Delete(FuelType fuelType);
    IQueryable<FuelType> GetAll();
    int SaveChanges();
}