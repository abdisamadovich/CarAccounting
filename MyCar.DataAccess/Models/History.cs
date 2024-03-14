namespace MyCar.DataAccess.Models;

public class History
{
    public int Id { get; set; }
    public string Name { get; set; }
    public DateTime Date { get; set; }
    public string Station { get; set; }
    public int Odometer { get; set; }
    public int Price { get; set; }
}