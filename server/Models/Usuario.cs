using System.Linq;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
	class Usuario
	{
		public int id { get; set; }
		public string pNome { get; set; }
		public string sNome { get; set; }
		public string cpf { get; set; }
		public string email { get; set; }
		public string senha { get; set; }
		public string dataNascimento { get; set; }
		public bool administrador { get; set; }
		public List<CupomCliente> cupons { get; set; }

	}
}
