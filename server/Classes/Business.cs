using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Classes
{
    public class Business
    {
        public int id { get; set; }
        public int userId { get; set; }
        public string cnpj{ get; set; }
        public string uf{ get; set; }
        public string city{ get; set; }
        public double latitude{ get; set; }
        public double longitude{ get; set; }


    }
}
