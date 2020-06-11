using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Classes
{
    public class CouponClient
    {
        public int couponID { get; set; }
        public Coupon coupon { get; set; }
        public int userID { get; set; }
        public User user { get; set; }
    }
}
