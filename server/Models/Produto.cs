using System;
using System.Collections.Generic;

namespace server.Models
{
    class Produto
    {
        public int id { get; set; }
        public String nome { get; set; }
        public double preco { get; set; }
        public String descricao { get; set; }
        public int estabelecimentoId { get; set; }
        public Estabelecimento estabelecimentos { get; set; }
    }
}
