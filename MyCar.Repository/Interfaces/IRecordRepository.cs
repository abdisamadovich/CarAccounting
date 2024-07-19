using MyCar.Repository.Dto;

namespace MyCar.Repository.Interfaces;

public interface IRecordRepository
{
    IQueryable<RecordViewModel> GetExpenses(long vehicleId);
    IQueryable<RecordViewModel> GetServices(long vehicleId);
    IQueryable<RecordViewModel> GetRefuellings(long vehicleId);
}
