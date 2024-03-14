using System.ComponentModel.DataAnnotations.Schema;

namespace MyCar.DataAccess.Models;

public class Service
{
    public int Id { get; set; }
    public DateTime Date { get; set; }
    public int Odometer { get; set; }
    public int ServiceTypeId { get; set; }
    public ServiceType ServiceType { get; set; }
    public string Place {  get; set; }
    public int Price { get; set; }
    public string Notes { get; set; }
}