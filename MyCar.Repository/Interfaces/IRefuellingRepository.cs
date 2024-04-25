using MyCar.DataAccess.Models;

namespace MyCar.Repository.Interfaces;

public interface IRefuellingRepository
{
    void Insert(Refuelling refuelling);
    void Delete(Refuelling refuelling);
    IQueryable<Refuelling> GetAll();
    void Update(Refuelling refuelling);
    int SaveChanges();
}