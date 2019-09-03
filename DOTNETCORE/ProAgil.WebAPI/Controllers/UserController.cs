using System;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.Configuration;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProAgil.Domain.Identity;
using ProAgil.WebAPI.Dtos;

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
        public async Task<IActionResult> GetUser(UserDTO userDTO){
            return Ok(userDTO);
        }

        [HttpPost("Register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register(UserDTO userDTO){
            
            try
            {
                var user = _mapper.Map<User>(userDTO);
                var result = await _userManager.CreateAsync(user, userDTO.Password);
                var userToReturn = _mapper.Map<UserDTO>(user);

                if(result.Succeeded)
                {
                    return Created("GetUser", userToReturn);
                }

                return BadRequest(result.Errors);
            }
            catch(System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco de dados Falhou {ex.Message}");
            }
        }


        [HttpPost("Login")]
        public async Task<IActionResult> Login(UserLoginDTO userLoginDTO){

            try
            {
                var user = await _userManager.FindByNameAsync(userLoginDTO.UserName);
                var result = await _signInManager.CheckPasswordSignInAsync(user, userLoginDTO.Password, false);

                if(result.Succeeded)
                {
                    var appUser = await _userManager.Users.FirstOrDefaultAsync(u => u.NormalizedUserName == userLoginDTO.UserName.ToUpper());
                    var userToReturn = _mapper.Map<UserLoginDTO>(appUser);

                    return Ok(new {
                        token = GenerateJWToken(appUser).Result,
                        user = userToReturn
                    });
                }

                return Unauthorized();
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco de dados Falhou {ex.Message}");
            }

        }

        private async Task<string> GenerateJWToken(User user)
        {
            return "";
        }
    }
}