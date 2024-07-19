using MyCar.Repository.Dto;
using MyCar.Repository.Interfaces;
using MyCar.Service.Interfaces;

namespace MyCar.Service.Service;

public class RecordService : IRecordService
{
    private readonly IRecordRepository _repository;
    public RecordService(IRecordRepository repository)
    {
        _repository = repository;
    }

    public IList<RecordViewModel> GetRecords(long vehicleId, int offset, int limit)
    {
        var expenseQuery = _repository.GetExpenses(vehicleId);
        var serviceQuery = _repository.GetServices(vehicleId);
        var refuellingQuery = _repository.GetRefuellings(vehicleId);

        var unifiedQuery = expenseQuery.Union(serviceQuery).Union(refuellingQuery).OrderByDescending(x => x.Date).AsQueryable();

        if (offset > 0)
        {
            unifiedQuery = unifiedQuery.Skip(offset);
        }

        return unifiedQuery.Take(limit).ToList();
    }
}
