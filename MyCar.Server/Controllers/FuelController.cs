using Microsoft.AspNetCore.Mvc;
using MyCar.Service.Interfaces;
using MyCar.Service.ViewModels.FuelsViewModel;

namespace MyCar.Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class FuelController : ControllerBase
{
    private readonly IFuelService _fuelService;
    public FuelController(IFuelService fuelService)
    {
        _fuelService = fuelService;
    }

    [HttpPost]
    public FuelPostViewModel CreatNew(FuelPostViewModel model)
    {
        _fuelService.CreateNew(model);
        return model;
    }

    [HttpDelete]
    public void Delete(int id)
    {
        _fuelService.Delete(id);
    }

    [HttpGet]
    public List<FuelGetViewModel> GetAll()
    {
        return _fuelService.GetAllFuel();
    }
}
