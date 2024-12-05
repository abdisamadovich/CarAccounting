using Microsoft.AspNetCore.Mvc;
using MyCar.Repository.Dto;
using MyCar.Service.Interfaces;

namespace MyCar.Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class RecordController : ControllerBase
{
    private readonly IRecordService _recordService;
    public RecordController(IRecordService recordService)
    {
        _recordService = recordService;
    }

    [HttpGet("{vehicleId}")]
    public ActionResult<IList<RecordViewModel>> GetRecords(long vehicleId, [FromQuery] int offset = 0, [FromQuery] int limit = 5)
    {
        try
        {
            var records = _recordService.GetRecords(vehicleId, offset, limit);

            return Ok(new
            {
                records = records.Records,
                pagination = records.Pagination
            });
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }
}
