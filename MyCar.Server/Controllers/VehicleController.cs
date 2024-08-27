using Microsoft.AspNetCore.Mvc;
using MyCar.Service.Interfaces;
using MyCar.Service.ViewModels.Vehicles;

namespace MyCar.Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class VehicleController : ControllerBase
{
    private readonly IVehicleService _service;

    public VehicleController(IVehicleService service)
    {
        _service = service;
    }

    [HttpPost]
    public VehiclePostViewModel CreateNew(VehiclePostViewModel model)
    {
        _service.CreateNew(model);
        return model;
    }

    [HttpDelete]
    public void Delete(int id)
    {
        _service.Delete(id);
    }

    [HttpGet]
    public List<VehicleGetViewModel> GetAll()
    {
        return _service.GetAll();
    }
}
