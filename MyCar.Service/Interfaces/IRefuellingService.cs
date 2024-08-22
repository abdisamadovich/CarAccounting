using MyCar.Service.ViewModels.Refuellings;

namespace MyCar.Service.Interfaces;

public interface IRefuellingService
{
    void CreateNew(RefuellingPostViewModel refuelling);
    List<RefuellingGetViewModel> GetAll();
}