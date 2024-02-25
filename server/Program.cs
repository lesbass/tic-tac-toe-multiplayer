var game = new Game();

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSignalR();
builder.Services.AddCors();
builder.Services.AddSingleton(game);
builder.Services.AddSingleton<SignalrHub>();

var app = builder.Build();
if (app.Environment.IsDevelopment())
    app.UseCors(x => x
        .AllowAnyMethod()
        .AllowAnyHeader()
        .SetIsOriginAllowed(_ => true) // allow any origin
        .AllowCredentials());

app.MapHub<SignalrHub>("/hub");

app.UseDefaultFiles();
app.UseStaticFiles();

app.Run();