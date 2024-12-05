using Newtonsoft.Json;

namespace MyCar.Server.Middlewares;

public class ExceptionHandlerMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionHandlerMiddleware> _logger;

    public ExceptionHandlerMiddleware(RequestDelegate next, ILogger<ExceptionHandlerMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext httpContext, IWebHostEnvironment env)
    {
        try
        {
            _logger.LogInformation("Handling request: {Path}", httpContext.Request.Path);
            await _next(httpContext);
            _logger.LogInformation("Request handled successfully: {Path}", httpContext.Request.Path);
        }
        catch (Exception exception)
        {
            httpContext.Response.StatusCode = 500;
            httpContext.Response.ContentType = "application/json";

            // Log the detailed exception
            _logger.LogError(exception, "An unhandled exception occurred.");

            var errorResponse = new
            {
                Message = exception.Message,
                StackTrace = exception.StackTrace
            };

            var jsonResponse = JsonConvert.SerializeObject(errorResponse);

            if (env.IsDevelopment())
            {
                // Development environment: show full exception details
                await httpContext.Response.WriteAsync(jsonResponse);
            }
            else if (env.IsProduction())
            {
                await httpContext.Response.WriteAsync(jsonResponse);
            }
        }
    }
}
