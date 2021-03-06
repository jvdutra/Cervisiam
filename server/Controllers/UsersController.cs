﻿using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileSystemGlobbing.Internal.PathSegments;
using server.Classes;
using server.Context;

namespace server.Controllers
{
    public class Message
    {
        public int userId { get; set; }
        public bool success { get; set; }
        public String message { get; set; }
    }

    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly DataContext _context;

        public UsersController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> Getusers()
        {
            return await _context.users.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public User GetUser(int id)
        {
           
           
            
            
           
            var user = (from u in _context.users where u.id == id select u).First();
            
            

            
            
            
            
           
            
            


            return user;
        }
       


      

        // PUT: api/Users/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Users
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public Message PostUser(User user)
        {
            Message message = new Message();

            try
            {
                var user_email_exist = _context.users
                                     .Where(e => e.email == user.email)
                                     .FirstOrDefault();

                if (user_email_exist != null)
                {
                    message.success = false;
                    message.message = "USER_EXISTS";

                    return message;
                }
            }
            catch
            {
                message.success = false;
                message.message = "SERVER_ERROR";

                return message;
            }

            try
            {
                _context.users.Add(user);
                _context.SaveChanges();
            }
            catch
            {
                message.success = false;
                message.message = "SERVER_ERROR";

                return message;
            }

            message.success = true;
            message.message = "REGISTRATION_SUCCESS";

            return message;
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<User>> DeleteUser(int id)
        {
            var user = await _context.users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.users.Remove(user);
            await _context.SaveChangesAsync();

            return user;
        }

        private bool UserExists(int id)
        {
            return _context.users.Any(e => e.id == id);
        }
    }
}
