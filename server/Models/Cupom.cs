using System;
using System.Collections.Generic;

namespace server.Models
{
	class Cupom
	{
		public int id { get; set; }
		public string tipo { get; set; }
		public double valor { get; set; }
		public List<cupomCliente> usuario{ get; set; }
	}
}
