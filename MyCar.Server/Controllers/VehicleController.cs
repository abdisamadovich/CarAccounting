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
    public async Task<IActionResult> Delete(int id)
    {
        await _service.DeleteAsync(id);
        return Ok(new { success = true, message = "Vehicle deleted successfully." });
    }

    [HttpGet]
    public List<VehicleGetViewModel> GetAll()
    {
        return _service.GetAll();
    }
}
