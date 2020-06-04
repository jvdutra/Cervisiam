using System;

namespace server.Models
{
    class DonoDoEstabelecimento : Usuario
    {   
        public Estabelecimento estabelecimento { get; set; }
    }
}