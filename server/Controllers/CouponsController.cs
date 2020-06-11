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
    public class CouponsController : ControllerBase
    {
        private readonly DataContext _context;

        public CouponsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Coupons
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Coupon>>> Getcoupons()
        {
            return await _context.coupons.ToListAsync();
        }

        // GET: api/Coupons/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Coupon>> GetCoupon(int id)
        {
            var coupon = await _context.coupons.FindAsync(id);

            if (coupon == null)
            {
                return NotFound();
            }

            return coupon;
        }

        // PUT: api/Coupons/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCoupon(int id, Coupon coupon)
        {
            if (id != coupon.id)
            {
                return BadRequest();
            }

            _context.Entry(coupon).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CouponExists(id))
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

        // POST: api/Coupons
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Coupon>> PostCoupon(Coupon coupon)
        {
            _context.coupons.Add(coupon);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCoupon", new { id = coupon.id }, coupon);
        }

        // DELETE: api/Coupons/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Coupon>> DeleteCoupon(int id)
        {
            var coupon = await _context.coupons.FindAsync(id);
            if (coupon == null)
            {
                return NotFound();
            }

            _context.coupons.Remove(coupon);
            await _context.SaveChangesAsync();

            return coupon;
        }

        private bool CouponExists(int id)
        {
            return _context.coupons.Any(e => e.id == id);
        }
    }
}
