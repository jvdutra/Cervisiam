using System;
using System.Collections.Generic;
using System.Linq;

namespace server.Models
{
    class Estabelecimento
    {
        public int id { get; set; }
        public string CNPJ { get; set; }
        public string razaoSocial { get; set; }
        public string nomeFantasia { get; set; }
        public string endereco { get; set; }
        public List<produtoEstabelecimeto> produtos { get; set; }
    }
}
