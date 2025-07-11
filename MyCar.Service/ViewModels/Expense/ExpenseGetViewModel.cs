﻿using MyCar.Service.ViewModels.ExpenseType;
using MyCar.Service.ViewModels.Vehicles;

namespace MyCar.Service.ViewModels.Expense;

public class ExpenseGetViewModel
{
    public int Id { get; set; }
    public int VehicleId { get; set; }
    public VehicleViewModel Vehicle { get; set; }
    public DateTime Date { get; set; }
    public int Odometer { get; set; }
    public int ExpenseTypeId { get; set; }
    public ExpenseTypeViewModel ExpenseType { get; set; }
    public string Place { get; set; }
    public string Description { get; set; }
    public decimal Cost { get; set; }
}
