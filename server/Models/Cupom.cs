using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
	class Cupom
	{
		public int id { get; set; }
		public string tipo { get; set; }
		public double valor { get; set; }
		public int estabelecimentoId {get;set;}
		public Estabelecimento estabelecimento {get;set;}
		public List<CupomCliente> usuarios { get; set; }
	}
}
