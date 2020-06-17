using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Classes
{
    public class Coupon
    {

        public int id { get; set; }
        public int businessId { get; set; }
        
        public Business business { get; set; }
        public string type { get; set; }
        public double value{ get; set; }
        public List<CouponClient> couponClients { get; set; }
    }
}
