using System;
using System.Collections.Generic;
using System.Text;

namespace server.Models
{
    class cupomCliente
    {
        public int usuarioId { get; set; }
        public Usuario usuario { get; set; }
        public int cupomId { get; set; }
        public Cupom cupom { get; set; }
    }
}
