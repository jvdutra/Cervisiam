using System;
using System.Collections.Generic;
using System.Text;

namespace server.Models
{
    class produtoEstabelecimeto
    {
        public int produtoId { get; set; }
        public Produto produto{ get; set; }
        public int estabelecimentoId { get; set; }
        public Estabelecimento estabelecimento { get; set; }
    }
}
