namespace MyCar.Service.ViewModels.Services;

public class ServicePostViewModel
{
    public DateTime Date { get; set; }
    public int Odometer { get; set; }
    public int ServiceTypeId { get; set; }
    public string Place { get; set; }
    public int Price { get; set; }
    public string Notes { get; set; }
}
