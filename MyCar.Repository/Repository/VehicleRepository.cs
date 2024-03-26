using Microsoft.EntityFrameworkCore;
using MyCar.DataAccess;
using MyCar.DataAccess.Models;
using MyCar.Repository.Interfaces;
using MyCar.Errors;

namespace MyCar.Repository.Repository;

public class VehicleRepository : IVehicleRepository
{
    private MainContext MainContext;
    public VehicleRepository(MainContext mainContext)
    {
        MainContext = mainContext;
    }
    public void Delete(Vehicle vehicle)
    {
        if (MainContext.Entry(vehicle).State != EntityState.Deleted)
        {
            MainContext.Vehicles.Remove(vehicle);
        }
    }

    public IQueryable<Vehicle> GetAll()
    {
        return MainContext.Vehicles;
    }

    public void Insert(Vehicle vehicle)
    {
        var res = MainContext.FuelTypes.FirstOrDefault(x => x.Id == vehicle.FuelTypeId);
        var res2 = MainContext.Manufacturers.FirstOrDefault(x => x.Id == vehicle.ManufacturerId);
        if (res == null) throw new EntryNotFoundException(nameof(FuelType));
        if (res2 == null) throw new EntryNotFoundException(nameof(Manufacturer));

        MainContext.Vehicles.Add(vehicle);
    }

    public int SaveChanges()
    {
        return MainContext.SaveChanges();
    }
}
