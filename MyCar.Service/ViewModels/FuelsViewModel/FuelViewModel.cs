using MyCar.DataAccess.Models;
using MyCar.Service.ViewModels.FuelsTypesViewModel;

namespace MyCar.Service.ViewModels.FuelsViewModel
{
    public class FuelViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int FuelTypeId { get; set; }
        public FuelTypeViewModel FuelType { get; set; }
    }
}