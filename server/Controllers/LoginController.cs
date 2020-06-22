using Microsoft.AspNetCore.Mvc;
using server.Classes;
using server.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Controllers
{
    [Route("api/login")]
    [ApiController]
    public class LoginController
    {
 
        private readonly DataContext _context;

        public LoginController(DataContext context)
        {
            _context = context;
        }

        public class Message
        {
            public bool success { get; set; }
            public String message { get; set; }
        }

        [HttpPost]
        public Message CheckUser(User user)
        {
            Message message = new Message();
            bool success = false;
            String text = "INCORRECT_LOGIN";
            try
            {
                var user_session = _context.users
                                        .Where(e => e.email == user.email)
                                        .Where(p => p.password == user.password)
                                        .FirstOrDefault();
                if (user_session != null)
                {
                    success = true;
                    text = "SUCCESS";
                }
            }
            catch
            {
                text = "SERVER_ERROR";
            }

            message.message = text;
            message.success = success;

            return message;
        }
    }
}
