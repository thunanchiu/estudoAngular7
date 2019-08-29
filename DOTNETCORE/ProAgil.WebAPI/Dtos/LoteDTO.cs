using System;
using System.ComponentModel.DataAnnotations;

namespace ProAgil.WebAPI.Dtos
{
    public class LoteDTO
    {
        public int LoteId { get; set; }
        public string Nome { get; set; }
        [Required (ErrorMessage= "O campo é obrigatório.")]
        public decimal Preco { get; set; }
        public DateTime DataInicio { get; set; }
        public DateTime DataFim { get; set; }
        [Range(5, 5000)]
        public int Quantidade { get; set; }
    }
}