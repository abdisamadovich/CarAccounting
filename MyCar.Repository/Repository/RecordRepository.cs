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
            VehicleId = x.VehicleId,
            Odometer = x.Odometer,
            Description = x.Description,
            Place = x.Place,
            RecordId = x.Id,
            RecordType = RecordType.Expense,
            Cost = x.Cost
        });
    }

    public IQueryable<RecordViewModel> GetServices(long vehicleId)
    {
        return MainContext.Services.Where(x => x.VehicleId == vehicleId).Select(x => new RecordViewModel
        {
            Date = x.Date,
            VehicleId = x.VehicleId,
            Odometer = x.Odometer,
            Description = x.Notes,
            Place = x.Place,
            RecordId = x.Id,
            RecordType = RecordType.Service,
            Cost = x.Price
        });
    }

    public IQueryable<RecordViewModel> GetRefuellings(long vehicleId)
    {
        return MainContext.Refuellings.Where(x => x.VehicleId == vehicleId).Select(x => new RecordViewModel
        {
            Date = x.Date,
            VehicleId = x.VehicleId,
            Odometer = x.Odometer,
            Description = "",
            Place = x.Station,
            RecordId = x.Id,
            RecordType = RecordType.Refuelling,
            Cost = x.TotalCost
        });
    }

    public PreviousAndNextRecordViewModel GetPreviousAndNextRecord(long vehicleId, DateTime date)
    {
        var expensesBefore = MainContext.Expenses
            .Where(x => x.VehicleId == vehicleId && x.Date < date)
            .Select(x => new RecordViewModel
            {
                VehicleId = x.VehicleId,
                RecordType = RecordType.Expense,
                RecordId = x.Id,
                Date = x.Date,
                Odometer = x.Odometer,
                Place = x.Place,
                Description = x.Description,
                Cost = x.Cost
            });

        var servicesBefore = MainContext.Services
             .Where(x => x.VehicleId == vehicleId && x.Date < date)
             .Select(x => new RecordViewModel
             {
                 VehicleId = x.VehicleId,
                 RecordType = RecordType.Service,
                 RecordId = x.Id,
                 Date = x.Date,
                 Odometer = x.Odometer,
                 Place = x.Place,
                 Description = x.Notes,
                 Cost = x.Price
             });
        var refuellingsBefore = MainContext.Refuellings
             .Where(x => x.VehicleId == vehicleId && x.Date < date)
             .Select(x => new RecordViewModel
             {
                 VehicleId = x.VehicleId,
                 RecordType = RecordType.Refuelling,
                 RecordId = x.Id,
                 Date = x.Date,
                 Odometer = x.Odometer,
                 Place = x.Station,
                 Description = "",
                 Cost = x.TotalCost
             });

        var previousRecords = expensesBefore
            .Union(servicesBefore)
            .Union(refuellingsBefore)
            .OrderByDescending(x => x.Date)
            .FirstOrDefault();

        var expensesAfter = MainContext.Expenses
            .Where(x => x.VehicleId == vehicleId && x.Date > date)
            .Select(x => new RecordViewModel
            {
                VehicleId = x.VehicleId,
                RecordType = RecordType.Expense,
                RecordId = x.Id,
                Date = x.Date,
                Odometer = x.Odometer,
                Place = x.Place,
                Description = x.Description,
                Cost = x.Cost
            });

        var servicesAfter = MainContext.Services
            .Where(x => x.VehicleId == vehicleId && x.Date > date)
            .Select(x => new RecordViewModel
            {
                VehicleId = x.VehicleId,
                RecordType = RecordType.Service,
                RecordId = x.Id,
                Date = x.Date,
                Odometer = x.Odometer,
                Place = x.Place,
                Description = x.Notes,
                Cost = x.Price
            });

        var refuellingsAfter = MainContext.Refuellings
            .Where(x => x.VehicleId == vehicleId && x.Date > date)
            .Select(x => new RecordViewModel
            {
                VehicleId = x.VehicleId,
                RecordType = RecordType.Refuelling,
                RecordId = x.Id,
                Date = x.Date,
                Odometer = x.Odometer,
                Place = x.Station,
                Description = "",
                Cost = x.TotalCost
            });

        var nextRecords = expensesAfter
            .Union(servicesAfter)
            .Union(refuellingsAfter)
            .OrderBy(x => x.Date)
            .FirstOrDefault();

        return new PreviousAndNextRecordViewModel
        {
            PreviousRecord = previousRecords,
            NextRecord = nextRecords
        };
    }
}
