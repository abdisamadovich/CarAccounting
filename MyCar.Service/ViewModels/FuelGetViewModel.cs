using MyCar.DataAccess.Models;

namespace MyCar.Service.ViewModels;

public class FuelGetViewModel
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int FuelTypeId { get; set; }
    public FuelType FuelType { get; set; }
}
