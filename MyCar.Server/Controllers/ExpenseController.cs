using Microsoft.AspNetCore.Mvc;
using MyCar.Service.Interfaces;
using MyCar.Service.ViewModels.Expense;

namespace MyCar.Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ExpenseController : ControllerBase
{
    private readonly IExpenseService _service;
    public ExpenseController(IExpenseService service)
    {
        _service = service;
    }

    [HttpPost]
    public ExpensePostViewModel CreateNew(ExpensePostViewModel model)
    {
        _service.CreateNew(model);

        return model;
    }

    [HttpGet]
    public List<ExpenseGetViewModel> GetAll()
    {
        return _service.GetAllExpense();
    }
}
