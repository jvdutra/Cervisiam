using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace server.Classes
{
    public class Business
    {
        public int id { get; set; }
        public string name{ get; set; }
        public int userId { get; set; }

        [JsonIgnore]
        public User user { get; set; }
        [JsonIgnore]
        public string cnpj{ get; set; }
        public string uf{ get; set; }
        public string city{ get; set; }
        public double latitude{ get; set; }
        public double longitude{ get; set; }
        public List<Coupon> coupons { get; set; }


    }
}
