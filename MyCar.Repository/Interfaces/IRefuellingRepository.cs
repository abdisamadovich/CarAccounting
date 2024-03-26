using MyCar.DataAccess.Models;

namespace MyCar.Repository.Interfaces;

public interface IRefuellingRepository
{
    public void Insert(Refuelling refuelling);
    public void Delete(Refuelling refuelling);
    public IQueryable<Refuelling> GetAll();
    public void Update(Refuelling refuelling);
    public int SaveChanges();
}