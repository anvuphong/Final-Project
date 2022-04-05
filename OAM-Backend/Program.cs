using Microsoft.EntityFrameworkCore;
using OAM_Backend.Authorization;
using OAM_Backend.Data;
using OAM_Backend.Repositories;
using OAM_Backend.Repository;
using OAM_Backend.Repository.Implements;
using OAM_Backend.Repositories.Implements;
using OAM_Backend.Helpers;
using OAM_Backend.Helpers.Implements;
using OAM_Backend.Services;
using OAM_Backend.Services.Implements;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddTransient<IStateService, StateService>();
builder.Services.AddTransient<IStateRepository, StateRepository>();
builder.Services.AddTransient<IAssetService, AssetService>();
builder.Services.AddTransient<IAssetRepository, AssetRepository>();
builder.Services.AddTransient<ICategoryService, CategoryService>();
builder.Services.AddTransient<ICategoryRepository, CategoryRepository>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(
    builder.Configuration.GetConnectionString("DefaultConnection")
    ));

// configure automapper with all automapper profiles from this assembly
builder.Services.AddAutoMapper(typeof(Program));

// configure strongly typed settings object
builder.Services.Configure<AppSettings>(builder.Configuration.GetSection("AppSettings"));

// configure DI for application repositories and services
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddTransient<ICategoryService,CategoryService>();
builder.Services.AddTransient<ICategoryRepository,CategoryRepository>();
builder.Services.AddTransient<IAssetRepository,AssetRepository>();
builder.Services.AddTransient<IAssetStateRepository,AssetStateRepository>();
builder.Services.AddTransient<IUserService, UserService>();
builder.Services.AddTransient<IUserRepository, UserRepository>();
builder.Services.AddTransient<IAssignmentService, AssignmentService>();
builder.Services.AddTransient<IAssignmentRepository, AssignmentRepository>();
builder.Services.AddTransient<IJwtUtils, JwtUtils>();
builder.Services.AddTransient<IStateService, StateService>();
builder.Services.AddTransient<IStateRepository, StateRepository>();
builder.Services.AddTransient<IAssetService, AssetService>();
builder.Services.AddTransient<IAssetRepository, AssetRepository>();
builder.Services.AddTransient<IAssignmentStateService, AssignmentStateService>();
builder.Services.AddTransient<IAssignmentStateRepository, AssignmnetStateRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseCors(x => x
        .AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader());

app.UseHttpsRedirection();

app.UseMiddleware<JwtMiddleware>();

app.UseAuthorization();

app.MapControllers();

app.Run();
