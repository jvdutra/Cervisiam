using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using server.Classes;

namespace server.Context
{
    public class DataContext : DbContext
    {
        public DbSet<User> users { get; set; }
        public DbSet<Business> business { get; set; }
        public DbSet<Coupon> coupons { get; set; }
        public DbSet<Product> products { get; set; }
        public DbSet<CouponClient> couponClients { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=master;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CouponClient>().HasKey("couponID", "userID");
        }

    }
}
