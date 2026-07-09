var builder = WebApplication.CreateBuilder(args);

// 1. Configure CORS so your React frontend (localhost:5173) can access this API
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddHttpClient();

var app = builder.Build();

// Activate the safety rule
app.UseCors("AllowReactApp");

// 2. Setup your broker endpoint
app.MapGet("/api/news", async (string q, HttpClient client, IConfiguration config) =>
{
    // News API requires a User-Agent header for server-side requests
    client.DefaultRequestHeaders.Add("User-Agent", "NewsPageVSBackend");

    // Pull key safely from appsettings.json
    var apiKey = config["NewsApiKey"] ?? "8417ff8709ec42e5a32be5441389967e";
    var targetUrl = $"https://newsapi.org/v2/everything?q={Uri.EscapeDataString(q)}&apiKey={apiKey}";

    try
    {
        var response = await client.GetAsync(targetUrl);
        if (!response.IsSuccessStatusCode)
        {
            return Results.StatusCode((int)response.StatusCode);
        }

        var content = await response.Content.ReadFromJsonAsync<object>();
        return Results.Ok(content);
    }
    catch (Exception ex)
    {
        return Results.Problem(ex.Message);
    }
});

app.Run();