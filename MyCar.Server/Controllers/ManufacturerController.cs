using Microsoft.AspNetCore.Mvc;
using MyCar.Service.Interfaces;
using MyCar.Service.ViewModels.Manufacturers;

namespace MyCar.Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ManufacturerController : ControllerBase
{
    private readonly IManufacturerService _service;
    public ManufacturerController(IManufacturerService service)
    {
        _service = service;
    }

    [HttpPost]
    public ManufacturerViewModel CreateNew(ManufacturerViewModel model)
    {
        _service.CreateNew(model);
        return model;
    }

    [HttpGet]
    public List<ManufacturerViewModel> GetAll()
    {
        return _service.GetAll();
    }

    [HttpDelete]
    public void Delete(int id)
    {
        _service.Delete(id);
    }
}
