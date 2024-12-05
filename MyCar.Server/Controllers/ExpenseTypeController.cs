using Microsoft.AspNetCore.Mvc;
using MyCar.Service.Interfaces;
using MyCar.Service.ViewModels.Expense;
using MyCar.Service.ViewModels.ExpenseType;

namespace MyCar.Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ExpenseTypeController : ControllerBase
{
    private readonly IExpenseTypeService _service;
    public ExpenseTypeController(IExpenseTypeService service)
    {
        _service = service;
    }

    [HttpPost]
    public ExpenseTypeViewModel CreateNew(ExpenseTypeViewModel model)
    {
        _service.CreateNew(model);

        return model;
    }

    [HttpGet]
    public List<ExpenseTypeViewModel> GetAll()
    {
        return _service.GetAllExpenseType();
    }

    [HttpDelete]
    public void Delete(int id)
    {
        _service.Delete(id);
    }
}
