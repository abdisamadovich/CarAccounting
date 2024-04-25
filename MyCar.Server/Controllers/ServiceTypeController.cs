using Microsoft.AspNetCore.Mvc;
using MyCar.Service.Interfaces;
using MyCar.Service.ViewModels.FuelsTypesViewModel;
using MyCar.Service.ViewModels.ServiceTypeViewModel;

namespace MyCar.Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ServiceTypeController : ControllerBase
{
    private readonly IServiceTypeService _service;
    public ServiceTypeController(IServiceTypeService serviceTypeService)
    {
        _service = serviceTypeService;
    }

    [HttpPost]
    public ServiceTypeViewModel CreateNew(ServiceTypeViewModel model)
    {
        _service.CreateNew(model);
        return model;
    }

    [HttpGet]
    public List<ServiceTypeViewModel> GetAll()
    {
        return _service.GetAllServiceType();
    }

    [HttpDelete]
    public void Delete(int id)
    {
        _service.Delete(id);
    }
}
