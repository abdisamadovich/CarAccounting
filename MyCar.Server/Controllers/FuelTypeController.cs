﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using MyCar.Service.Interfaces;
using MyCar.Service.ViewModels.FuelsTypesViewModel;

namespace MyCar.Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class FuelTypeController : ControllerBase
{
    private readonly IFuelTypeService _service;
    public FuelTypeController(IFuelTypeService fuelTypeService)
    {
        _service = fuelTypeService;
    }

    [HttpPost]
    public FuelTypeViewModel CreateNew(FuelTypeViewModel model)
    {
        _service.CreateNew(model);
        return model;
    }

    [HttpGet]
    public List<FuelTypeViewModel> GetAll()
    {
        return _service.GetAllFuelType();
    }

    [HttpDelete]
    public void Delete(int id)
    {
        _service.Delete(id);
    }
}