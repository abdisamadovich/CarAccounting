using Microsoft.AspNetCore.Mvc;
using MyCar.Service.Interfaces;
using MyCar.Service.ViewModels.Refuellings;

namespace MyCar.Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class RefuellingController : ControllerBase
{
    private readonly IRefuellingService _service;

    public RefuellingController(IRefuellingService service)
    {
        _service = service;
    }

    [HttpPost]
    public RefuellingPostViewModel CreateNew(RefuellingPostViewModel model)
    {
        _service.CreateNew(model);
        return model;
    }

    [HttpGet]
    public List<RefuellingGetViewModel> GetAll()
    {
        return _service.GetAll();
    }

    [HttpDelete]
    public void Delete(int id)
    {
        _service.Delete(id);
    }
}
