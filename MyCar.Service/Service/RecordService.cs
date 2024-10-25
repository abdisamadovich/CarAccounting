
using MyCar.Repository.Dto;
using MyCar.Repository.Interfaces;
using MyCar.Repository.Utils;
using MyCar.Service.Interfaces;

namespace MyCar.Service.Service;

public class RecordService : IRecordService
{
    private readonly IRecordRepository _repository;
    private readonly IPaginator _paginator;
    public RecordService(IRecordRepository repository, IPaginator paginator)
    {
        _repository = repository;
        _paginator = paginator;
    }

    public PaginationResult<RecordViewModel> GetRecords(long vehicleId, int skip, int take)
    {
        var expenseQuery = _repository.GetExpenses(vehicleId);
        var serviceQuery = _repository.GetServices(vehicleId);
        var refuellingQuery = _repository.GetRefuellings(vehicleId);

        var unifiedQuery = expenseQuery.Union(serviceQuery).Union(refuellingQuery).OrderByDescending(x => x.Date).AsQueryable();

        var totalItems = unifiedQuery.Count();

        var paginationParams = new PaginationParams(skip, take);
        var paginationMetaData = _paginator.Paginate(totalItems, paginationParams);

        var records = unifiedQuery
               .Skip(skip)
               .Take(take)
               .Select(record => new RecordViewModel
               {
                   VehicleId = record.VehicleId,
                   RecordId = record.RecordId,
                   RecordType = record.RecordType,
                   Date = record.Date,
                   Odometer = record.Odometer,
                   Place = record.Place,
                   Description = record.Description,
                   Cost = record.Cost
               })
               .ToList();

        records.ForEach(r => r.Date = DateTime.SpecifyKind(r.Date, DateTimeKind.Utc));

        return new PaginationResult<RecordViewModel>
        {
            Records = records,
            Pagination = paginationMetaData
        };
    }
}
