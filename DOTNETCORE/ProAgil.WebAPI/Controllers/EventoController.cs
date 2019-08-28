using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProAgil.Domain;
using ProAgil.Repository;

namespace ProAgil.WebAPI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class EventoController : ControllerBase
    {
        private readonly IProAgilRepository _repos;
        public EventoController(IProAgilRepository repos)
        {
            this._repos = repos;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var results = await _repos.GetAllEventoAsync(true);
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
                var results = await _repos.GetAllEventoAsyncById(eventoId, true);
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
                var results = await _repos.GetAllEventoAsyncByTema(tema, true);
                return Ok(results); 
            }
            catch (System.Exception)
            {                
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou.");
            }
            
        }

        [HttpPost]
        public async Task<IActionResult> Post(Evento model)
        {
            try
            {
                _repos.Add(model);

                if(await _repos.SaveChangesAsync()){
                    return Created($"/api/evento/{model.EventoId}", model);
                }
                return Ok(); 
            }
            catch (System.Exception)
            {                
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou.");
            }
        }

        [HttpPut("{eventoId}")]
        public async Task<IActionResult> Put(int eventoId, Evento model)
        {
            try
            {
                var evento = await _repos.GetAllEventoAsyncById(eventoId, false);

                if(evento == null) return NotFound();
                
                _repos.Update(model);

                if(await _repos.SaveChangesAsync()){
                    return Created($"/api/evento/{model.EventoId}", model);
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