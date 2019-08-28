using AutoMapper;
using ProAgil.Domain;
using ProAgil.WebAPI.Dtos;

namespace ProAgil.WebAPI.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles(){
            CreateMap<Evento,  EventoDTO>();
            CreateMap<Palestrante,  PalestranteDTO>();
            CreateMap<Lote,  LoteDTO>();
            CreateMap<RedeSocial,  RedeSocialDTO>();
        }
    }
}