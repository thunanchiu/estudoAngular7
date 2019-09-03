using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.Configuration;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ProAgil.Domain.Identity;

namespace ProAgil.WebAPI.Controllers
{
    [Route("api[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IMapper _mapper;

        public UserController(IConfiguration configuration,
                            UserManager<User> userManager,
                            SignInManager<User> signInManager,
                            IMapper mapper)
        {
            this._config = configuration;
            this._userManager = userManager;
            this._signInManager = signInManager;
            this._mapper = mapper;

        }

        [HttpGet("GetUser")]
        public async Task<IActionResult> GetUser(){
            return Ok(new User());
        }
    }
}