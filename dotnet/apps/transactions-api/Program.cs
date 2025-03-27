using DomainModels.Models;

var builder = WebApplication.CreateBuilder(args);

// Add CORS service
builder.Services.AddCors(options =>
{
  options.AddPolicy("AllowFrontend", policy =>
  {
    policy.WithOrigins("http://localhost:4200", "http://localhost:5173", "http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod();
  });
});

var app = builder.Build();

// Use CORS (must be before MapGet)
app.UseCors("AllowFrontend");

// Define endpoints
app.MapGet("/balance", () =>
{
  return new Balance { Amount = 3053.34m };
});

app.MapGet("/transactions", () =>
{
  return new List<Transaction>
    {
        new Transaction { Label = "Groceries", Amount = -54.21m },
        new Transaction { Label = "Salary", Amount = 3200 },
        new Transaction { Label = "Electric Bill", Amount = -92.45m }
    };
});

app.Run();
