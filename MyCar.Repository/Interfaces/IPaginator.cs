using MyCar.Repository.Utils;

namespace MyCar.Repository.Interfaces;

public interface IPaginator
{
    public PaginationMetaData Paginate(long itemsCount, PaginationParams @params);
}
