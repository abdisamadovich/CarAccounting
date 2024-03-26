using MyCar.DataAccess.Models;

namespace MyCar.Repository.Interfaces;

public interface IFuelTypeRepository
{
    public void Insert(FuelType fuelType);
    //public void Update(FuelType fuelType);
    public void Delete(FuelType fuelType);
    public IQueryable<FuelType> GetAll();
    public int SaveChanges();
}