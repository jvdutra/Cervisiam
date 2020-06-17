using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Classes;
using server.Context;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BusinessesController : ControllerBase
    {
        private readonly DataContext _context;

        public BusinessesController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Businesses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Business>>> Getbusiness()
        {
            return await _context.business.ToListAsync();
        }

        // GET: api/Businesses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Business>> GetBusiness(int id)
        {
            var business = await _context.business.FindAsync(id);

            if (business == null)
            {
                return NotFound();
            }

            return business;
        }
             // GET: api/Businesses/5
        [HttpGet("user/{id}")]
        public  List<Business>  GetBusinessuser(int id)
        {
            var business = _context.business.Where(p=>p.userId ==id).ToList();

            if (business == null)
            {
                return null;
            }

            return business;
        }

        // PUT: api/Businesses/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBusiness(int id, Business business)
        {
            if (id != business.id)
            {
                return BadRequest();
            }

            _context.Entry(business).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BusinessExists(id))
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

        // POST: api/Businesses
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Business>> PostBusiness(Business business)
        {
            _context.business.Add(business);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBusiness", new { id = business.id }, business);
        }

        // DELETE: api/Businesses/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Business>> DeleteBusiness(int id)
        {
            var business = await _context.business.FindAsync(id);
            if (business == null)
            {
                return NotFound();
            }

            _context.business.Remove(business);
            await _context.SaveChangesAsync();

            return business;
        }

        private bool BusinessExists(int id)
        {
            return _context.business.Any(e => e.id == id);
        }
    }
}
