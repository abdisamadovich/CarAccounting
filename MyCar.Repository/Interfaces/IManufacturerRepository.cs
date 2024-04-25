using MyCar.DataAccess.Models;

namespace MyCar.Repository.Interfaces;

public interface IManufacturerRepository
{
    void Insert(Manufacturer manufacturer);
    void Delete(Manufacturer manufacturer);
    IQueryable<Manufacturer> GetAll();
    int SaveChanges();
}
