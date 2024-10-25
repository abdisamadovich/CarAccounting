using MyCar.Repository.Utils;

namespace MyCar.Repository.Dto;

public class PaginationResult<T>
{
    public IList<T> Records { get; set; }
    public PaginationMetaData Pagination { get; set; }
}
