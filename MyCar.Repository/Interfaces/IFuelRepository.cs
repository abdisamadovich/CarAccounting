using MyCar.DataAccess.Models;

namespace MyCar.Repository.Interfaces;

public interface IFuelRepository
{
    public void Insert(Fuel fuel);
    public void Delete(Fuel fuel);
    public IQueryable<Fuel> GetAll();
    public int SaveChanges();
}