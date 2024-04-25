using MyCar.Service.ViewModels.Refuellings;

namespace MyCar.Service.Interfaces;

public interface IRefuellingService
{
    void CreateNew(RefuellingPostViewModel refuelling);
    void Delete(int id);
    List<RefuellingGetViewModel> GetAll();
}