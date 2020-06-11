using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Classes
{
    public class Product
    {
        public int id { get; set; }
        public int businessId { get; set; }
        public Business business { get; set; }
    }
}
