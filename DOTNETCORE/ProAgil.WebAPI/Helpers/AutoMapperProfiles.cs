using System.Linq;
using AutoMapper;
using ProAgil.Domain;
using ProAgil.WebAPI.Dtos;

namespace ProAgil.WebAPI.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles(){

            
            CreateMap<Palestrante,  PalestranteDTO>();
            CreateMap<Lote,  LoteDTO>();
            CreateMap<RedeSocial,  RedeSocialDTO>();

            //Mapeamento da Entidade para o DTO
            CreateMap<Evento,  EventoDTO>()
                //Dest é o Destinatario que no caso agora é o DTO.
                //A propriedade Palestrantes que está no DTO está associando a propriedade
                //PalestranteEvento que esta na Entidade.
                //Isso é um mapeamento Muitos para Muitos.
                .ForMember(dest => dest.Palestrantes, opt => {
                    //Ou seja, o mapeamento virá da Entidade Evento e dentro tem uma lista de PalestrantesEventos
                    //onde que para cada item de PalestranteEventos pegue o palestrante.
                    opt.MapFrom(src => src.PalestranteEventos.Select(x => x.Palestrante).ToList());
                });
            
            CreateMap<Palestrante, PalestranteDTO>()                
                .ForMember(dest => dest.Eventos, opt => {
                    opt.MapFrom(src => src.PalestranteEventos.Select(x => x.Evento).ToList());
                });

            

        }
    }
}