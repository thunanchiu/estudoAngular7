using System;
using System.Collections.Generic;

namespace ProAgil.Domain
{
    public class Evento
    {
        public int EventoId { get; set; }
        public string Local { get; set; }
        public string LocalEvento { get; set; }
        public string Tema { get; set; }
        public int QtdPessoas { get; set; }        
        public DateTime DataEvento { get; set; }
        public string ImagemURL { get; set; }        
        public string Email { get; set; }
        public string Telefone { get; set; }
        public string Lote { get; set; }
        public List<Lote> Lotes { get; set; }
        public List<RedeSocial> RedeSociais { get; set; }
        public List<PalestranteEvento> PalestranteEvento { get; set; }
    }
}