using MyCar.DataAccess.Models;

namespace MyCar.Repository.Interfaces;

public interface IFuelRepository
{
    void Insert(Fuel fuel);
    void Delete(Fuel fuel);
    IQueryable<Fuel> GetAll();
    int SaveChanges();
}