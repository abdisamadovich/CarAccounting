using MyCar.DataAccess.Models;
using System.Linq.Expressions;

namespace MyCar.Repository.Interfaces;

public interface IRefuellingRepository
{
    void Insert(Refuelling refuelling);
    void Delete(Refuelling refuelling);
    IQueryable<Refuelling> GetAll();
    void Update(Refuelling refuelling);
    int DeleteByCriteria(Expression<Func<Refuelling, bool>> criteria);
    int SaveChanges();
}