using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace CRUDWithModalPopup.Models.DBEntities
{
    public class Products
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [DisplayName("Product Name")]
        public string ProductName { get; set; }
        [Required]
        public string Price { get; set; }
        [Required]
        public decimal Quantity { get; set; }
    }
}
