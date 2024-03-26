using MyCar.Service.ViewModels;
using MyCar.Service.ViewModels.Refuellings;

namespace MyCar.Service.Interfaces;

public interface IRefuellingService
{
    public void CreateNew(RefuellingPostViewModel refuelling);
    public void Delete(int id);
    public List<RefuellingGetViewModel> GetAll();
}