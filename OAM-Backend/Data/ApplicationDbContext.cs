using Microsoft.EntityFrameworkCore;
using OAM_Backend.Models;

namespace OAM_Backend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Asset> Assets { get; set; }
        public DbSet<AssetState> AssetStates { get; set; }
        public DbSet<AssetStateDetail> AssetStateDetails { get; set; }
        public DbSet<Assignment> Assignments { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<RequestState> RequestStates { get; set; }
        public DbSet<ReturnRequest> ReturnRequests { get; set; }
        public DbSet<AssignmentState> AssignmentStates { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<User>()
               .HasData(
                   new User
                   {
                       Id = 1,
                       Staffcode = "SD0001",
                       Username = "admin",
                       Password = BCrypt.Net.BCrypt.HashPassword("admin@01012000"),
                       FirstName = "adm",
                       LastName = "I N",
                       DOB = new DateTime(2000, 01, 01),
                       JoinedDate = new DateTime(2022, 01, 01),
                       Gender = true,
                       Location = "Hanoi",
                       LogCount = 1,
                       IsActive = true,
                       IsAdmin = true
                   }
               );

            base.OnModelCreating(builder);
        }
        public override int SaveChanges()
        {
            var entries = ChangeTracker
                .Entries()
                .Where(e => e.Entity is BaseEntity && (
                        e.State == EntityState.Added
                        || e.State == EntityState.Modified));

            foreach (var entityEntry in entries)
            {
                ((BaseEntity)entityEntry.Entity).UpdatedAt = DateTime.Now;

                if (entityEntry.State == EntityState.Added)
                {
                    ((BaseEntity)entityEntry.Entity).CreatedAt = DateTime.Now;
                }
            }

            return base.SaveChanges();
        }
    }
}
