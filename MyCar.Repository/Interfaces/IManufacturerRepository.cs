using MyCar.DataAccess.Models;

namespace MyCar.Repository.Interfaces;

public interface IManufacturerRepository
{
    public void Insert(Manufacturer manufacturer);
    public void Delete(Manufacturer manufacturer);
    public IQueryable<Manufacturer> GetAll();
    public int SaveChanges();
}
