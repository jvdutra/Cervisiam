using System;
using System.Collections.Generic;
using System.Linq;

namespace server.Models
{
    class Estabelecimento
    {
        public int id { get; set; }
        public int usuarioId { get; set; }
        public Usuario usuario { get; set; }
        public string CNPJ { get; set; }
        public string nomeFantasia { get; set; }
        public string razaoSocial { get; set; }
        public string uf { get; set; }
        public string cidade { get; set; }
        public string rua { get; set; }
        public int latitude { get; set; }
        public int longitude { get; set; }
    }
}
