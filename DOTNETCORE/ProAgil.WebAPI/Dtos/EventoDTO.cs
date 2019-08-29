using System;
using System.Collections.Generic;

namespace ProAgil.WebAPI.Dtos
{
    public class EventoDTO
    {        
        public int EventoId { get; set; }
        public string Local { get; set; }
        public string LocalEvento { get; set; }
        public string Tema { get; set; }
        public int QtdPessoas { get; set; }        
        public string DataEvento { get; set; }
        public string ImagemURL { get; set; }        
        public string Email { get; set; }
        public string Telefone { get; set; }
        public string Lote { get; set; }
        public List<LoteDTO> Lotes { get; set; }
        public List<RedeSocialDTO> RedeSociais { get; set; }
        public List<PalestranteDTO> Palestrantes { get; set; }
    }
}