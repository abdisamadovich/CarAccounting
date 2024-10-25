using MyCar.Repository.Dto;
using MyCar.Repository.Utils;

namespace MyCar.Service.Interfaces;

public interface IRecordService
{
    PaginationResult<RecordViewModel> GetRecords(long vehicleId, int skip, int take);
}