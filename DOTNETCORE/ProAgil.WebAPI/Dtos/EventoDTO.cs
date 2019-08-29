using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProAgil.WebAPI.Dtos
{
    public class EventoDTO
    {        
        public int EventoId { get; set; }
        [Required (ErrorMessage="Campo obrigatório.")]
        [StringLength (100, MinimumLength =3, ErrorMessage="Local deverá possuir no mínimo 3 carácteres e no maxímo 100.")]
        public string Local { get; set; }
        public string LocalEvento { get; set; }
        [Required (ErrorMessage = "O tema deve ser preenchido.")]
        public string Tema { get; set; }
        [Range(2, 50000, ErrorMessage="Quantidade de pessoas é entre 2 e 50000.")]
        public int QtdPessoas { get; set; }        
        public string DataEvento { get; set; }
        public string ImagemURL { get; set; }  
        [EmailAddress]      
        public string Email { get; set; }
        [Phone]
        public string Telefone { get; set; }
        public string Lote { get; set; }
        public List<LoteDTO> Lotes { get; set; }
        public List<RedeSocialDTO> RedeSociais { get; set; }
        public List<PalestranteDTO> Palestrantes { get; set; }
    }
}