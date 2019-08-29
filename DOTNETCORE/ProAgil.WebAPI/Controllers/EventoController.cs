using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProAgil.Domain;
using ProAgil.Repository;
using ProAgil.WebAPI.Dtos;

namespace ProAgil.WebAPI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class EventoController : ControllerBase
    {
        private readonly IProAgilRepository _repos;
        private readonly IMapper _mapper;
        public EventoController(IProAgilRepository repos, IMapper mapper)
        {
            this._repos = repos;
            this._mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var eventos = await _repos.GetAllEventoAsync(true);
                var results = _mapper.Map<IEnumerable<EventoDTO>>(eventos);

                return Ok(results); 
            }
            catch (System.Exception ex)
            {                
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco de dados falhou. {ex.Message}" );
            }
            
        }

        [HttpGet("{EventoId}")]
        public async Task<IActionResult> Get(int eventoId)
        {
            try
            {
                var evento = await _repos.GetAllEventoAsyncById(eventoId, true);
                var results = _mapper.Map<EventoDTO>(evento);
                return Ok(results); 
            }
            catch (System.Exception)
            {                
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou.");
            }
            
        }

        [HttpGet("getByTema/{tema}")]
        public async Task<IActionResult> Get(string tema)
        {
            try
            {
                
                var evento = await _repos.GetAllEventoAsyncByTema(tema, true);
                var result = _mapper.Map<EventoDTO>(evento);
                return Ok(result); 
            }
            catch (System.Exception)
            {                
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou.");
            }
            
        }

        [HttpPost]
        public async Task<IActionResult> Post(EventoDTO model)
        {
            try
            {
                var evento = _mapper.Map<Evento>(model);

                _repos.Add(evento);

                if(await _repos.SaveChangesAsync()){
                    return Created($"/api/evento/{model.EventoId}", _mapper.Map<EventoDTO>(evento));
                }
                return Ok(); 
            }
            catch (System.Exception)
            {                
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou.");
            }
        }

        [HttpPut("{eventoId}")]
        public async Task<IActionResult> Put(int eventoId, EventoDTO model)
        {
            try
            {
                var evento = await _repos.GetAllEventoAsyncById(eventoId, false);

                if(evento == null) return NotFound();

                _mapper.Map(model, evento);
                
                _repos.Update(evento);

                if(await _repos.SaveChangesAsync()){
                    return Created($"/api/evento/{evento.EventoId}", _mapper.Map<EventoDTO>(evento));
                }
                return Ok(); 
            }
            catch (System.Exception)
            {                
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou.");
            }
        }


        [HttpDelete("{eventoId}")]
        public async Task<IActionResult> Delete(int eventoId)
        {
            try
            {
                var evento = await _repos.GetAllEventoAsyncById(eventoId, false);

                if(evento == null) return NotFound();
                
                _repos.Delete(evento);

                if(await _repos.SaveChangesAsync()){
                    return Ok();
                }
            }
            catch (System.Exception)
            {                
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou.");
            }

            return BadRequest();
        }
    }
}