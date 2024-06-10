using MyCar.Service.ViewModels.Expense;

namespace MyCar.Service.Interfaces;

public interface IExpenseService
{
    void CreateNew(ExpensePostViewModel expense);
    void Delete(int id);
    List<ExpenseGetViewModel> GetAllExpense();
}
