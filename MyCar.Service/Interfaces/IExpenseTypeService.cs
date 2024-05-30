using MyCar.Service.ViewModels.ExpenseType;

namespace MyCar.Service.Interfaces;

public interface IExpenseTypeService
{
    void CreateNew(ExpenseTypeViewModel service);
    public void Delete(int id);
    List<ExpenseTypeViewModel> GetAllExpenseType();
}
