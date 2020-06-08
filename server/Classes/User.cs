using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Classes
{
    public class User
    {
        public int id { get; set; }
        public string name { get; set; }
        public string password { get; set; }
        public string email { get; set; }
        public string cpf { get; set; }
        public string dateOfBirth { get; set; }
        public bool administrator { get; set; }
        public Business[] businesses { get; set; }
        public Coupon[] coupon { get; set; }



    }
}
