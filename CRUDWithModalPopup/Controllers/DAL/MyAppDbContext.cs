using CRUDWithModalPopup.Models.DBEntities;
using Microsoft.EntityFrameworkCore;

namespace CRUDWithModalPopup.Controllers.DAL
{
    public class MyAppDbContext : DbContext
    {
        public MyAppDbContext(DbContextOptions options) : base(options)
        {
        }
        public virtual DbSet<Products> Products { get; set; }
    }
}
