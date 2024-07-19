using MyCar.DataAccess;
using MyCar.Repository.Dto;
using MyCar.Repository.Interfaces;

namespace MyCar.Repository.Repository;

public class RecordRepository : IRecordRepository
{
    private MainContext MainContext;
    public RecordRepository(MainContext mainContext)
    {
        MainContext = mainContext;
    }

    public IQueryable<RecordViewModel> GetExpenses(long vehicleId)
    {
        return MainContext.Expenses.Where(x => x.VehicleId == vehicleId).Select(x => new RecordViewModel
        {
            Date = x.Date,
            Odometer = x.Odometer,
            Description = x.Description,
            Place = x.Place,
            RecordId = x.Id,
            RecordType = RecordType.Expense,
            Cost = x.Value
        });
    }

    public IQueryable<RecordViewModel> GetRefuellings(long vehicleId)
    {
        return MainContext.Services.Where(x => x.VehicleId == vehicleId).Select(x => new RecordViewModel
        {
            Date = x.Date,
            Odometer = x.Odometer,
            Description = x.Notes,
            Place = x.Place,
            RecordId = x.Id,
            RecordType = RecordType.Service,
            Cost = x.Price
        });
    }

    public IQueryable<RecordViewModel> GetServices(long vehicleId)
    {
        return MainContext.Refuellings.Where(x => x.VehicleId == vehicleId).Select(x => new RecordViewModel
        {
            Date = x.Date,
            Odometer = x.Odometer,
            Description = "",
            Place = x.Station,
            RecordId = x.Id,
            RecordType = RecordType.Refuelling,
            Cost = x.TotalCost
        });
    }
}
