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
    public ActionResult<VehicleViewModel> CreateNew(VehicleViewModel model)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        var vehicle = _service.CreateNew(model);
        return CreatedAtAction(nameof(CreateNew), new { id = vehicle.Id }, vehicle);
    }

    [HttpDelete]
    public void Delete(int id)
    {
        _service.Delete(id);
    }

    [HttpGet]
    public List<VehicleViewModel> GetAll()
    {
        return _service.GetAll();
    }
}
