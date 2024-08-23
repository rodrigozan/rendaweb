using Microsoft.EntityFrameworkCore;
using auth;

namespace auth.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> YourEntities { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configuração das entidades (exemplo)
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name)
                      .IsRequired()
                      .HasMaxLength(100);
                entity.Property(e => e.CreatedDate)
                      .HasDefaultValueSql("CURRENT_TIMESTAMP");
            });

            // Seed Data (dados iniciais)
            modelBuilder.Entity<User>().HasData(
                new User { Id = 1, Name = "Item 1" },
                new User { Id = 2, Name = "Item 2" }
            );
        }
    }
}
