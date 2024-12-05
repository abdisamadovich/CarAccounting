using MyCar.DataAccess.Models;

namespace MyCar.Repository.Interfaces;

public interface IHistoryRepository
{
    void Insert(History history);
    void Delete(History history);
    IQueryable<History> GetAll();
    void Update(History history);
    int SaveChanges();
}