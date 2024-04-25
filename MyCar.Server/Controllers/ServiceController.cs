using Microsoft.AspNetCore.Mvc;
using MyCar.Service.Interfaces;
using MyCar.Service.Service;
using MyCar.Service.ViewModels.FuelsViewModel;
using MyCar.Service.ViewModels.Services;

namespace MyCar.Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ServiceController : ControllerBase
{
    private readonly IServiceService _serviceService;
    public ServiceController(IServiceService serviceService)
    {
        _serviceService = serviceService;
    }

    [HttpPost]
    public ServicePostViewModel CreatNew(ServicePostViewModel model)
    {
        _serviceService.CreateNew(model);
        return model;
    }

    [HttpDelete]
    public void Delete(int id)
    {
        _serviceService.Delete(id);
    }

    [HttpGet]
    public List<ServiceGetViewModel> GetAll()
    {
        return _serviceService.GetAll();
    }
}
