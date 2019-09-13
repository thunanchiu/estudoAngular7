using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
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

        [HttpPost("upload")]
        public async Task<IActionResult> upload()
        {
            try
            {
                //Pegando o arquivo
                var file = Request.Form.Files[0];
                //Pegando o diretorio onde quer armazenar ele
                var folderName = Path.Combine("Resources","Images");
                //Está combinando o diretório onde que armazenar mais o diretorio da aplicação.
                //Neste caso quer que armazene a imagem no diretório da aplicação.
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);


                if(file.Length > 0){
                    //Converte o arquivo e pega o nome dele
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName;
                    //Verifica se o nome do arquivo possui aspas duplas ou espaço e remove
                    var fullPath = Path.Combine(pathToSave, fileName.Replace("\"", " ").Trim());
                    
                    //Vai pegar o fullpath e vai dizer que é nele que quer salvar, onde irá criar o arquivo. 
                    using(var stream = new FileStream(fullPath, FileMode.Create)){
                        file.CopyTo(stream);
                    }
                }

                return Ok(); 
            }
            catch (System.Exception ex)
            {                
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco de dados falhou. {ex.Message}" );
            }

           // return BadRequest("Erro ao tentar realizar upload.")
            
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

                var idLotes = new List<int>();
                var idRedesSociais = new List<int>();

                model.Lotes.ForEach(item => idLotes.Add(item.LoteId));
                model.RedesSociais.ForEach(item => idRedesSociais.Add(item.Id));

                var lotes = evento.Lotes.Where(l => !idLotes.Contains(l.LoteId)).ToArray();
                var redesSociais = evento.RedesSociais.Where(rs => !idRedesSociais.Contains(rs.RedeSocialId)).ToArray();       


                if(lotes.Length > 0){
                     _repos.DeleteRange(lotes);
                }

                if(redesSociais.Length > 0){
                     _repos.DeleteRange(redesSociais);
                }

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