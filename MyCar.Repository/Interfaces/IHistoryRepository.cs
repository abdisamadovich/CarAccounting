using MyCar.DataAccess.Models;

namespace MyCar.Repository.Interfaces;

public interface IHistoryRepository
{
    public void Insert(History history);
    public void Delete(History history);
    public IQueryable<History> GetAll();
    public void Update(History history);
    public int SaveChanges();
}