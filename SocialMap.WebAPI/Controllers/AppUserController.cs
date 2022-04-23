using Microsoft.AspNetCore.Mvc;
using SocialMap.Infrastructure.Commands;
using SocialMap.Infrastructure.DTO;
using SocialMap.Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocialMap.WebAPI.Controllers
{
    [Route("[Controller]")]
    public class AppUserController : Controller
    {
        private readonly IAppUserService _AppUserService;
        public AppUserController(IAppUserService AppUserService)
        {
            _AppUserService = AppUserService;
        }

        [HttpPost]
        public async Task<IActionResult> AddAppUser([FromBody] CreateAppUser createAppUser)
        {
            if (createAppUser is null || string.IsNullOrEmpty(createAppUser.Record?.UserUuid))
                return BadRequest();

            var user = await _AppUserService.AddAsync(createAppUser);

            return CreatedAtAction(nameof(GetAppUser), new { id = user.Id }, user);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAppUser(int id)
        {
            AppUserDTO u = await _AppUserService.GetAsync(id);
            return Json(u);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAppUsers(string uuid)
        {
            if (!string.IsNullOrEmpty(uuid))
            {
                var u = await _AppUserService.GetByUuidAsync(uuid);
                return Json(u);
            } else
            {
                var u = await _AppUserService.GetAllAsync();
                return Json(u);
            }
        }
    }
}
