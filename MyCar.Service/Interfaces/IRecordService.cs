using MyCar.Repository.Dto;

namespace MyCar.Service.Interfaces;

public interface IRecordService
{
    IList<RecordViewModel> GetRecords(long vehicleId, int offset, int limit);
}