namespace MyCar.Repository.Dto;

public class RecordViewModel
{
    public RecordType RecordType { get; set; }
    public long RecordId { get; set; }
    public DateTime Date { get; set; }
    public int Odometer { get; set; }
    public string Place { get; set; }
    public string Description { get; set; }
    public decimal Cost { get; set; }
}
