using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SocialMap.Infrastructure.Commands;
using SocialMap.Infrastructure.DTO;
using SocialMap.Infrastructure.Services;
using SocialMap.WebAPI.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocialMap.WebAPI.Controllers
{
    [Route("[Controller]")]
    public class AppUserController : Controller
    {
        private readonly IAppUserService _appUserService;
        public AppUserController(IAppUserService appUserService)
        {
            _appUserService = appUserService;
        }

        [HttpPost]
        public async Task<IActionResult> AddAppUser([FromHeader] string authorization, [FromBody] CreateAppUser createAppUser)
        {
            if (!HeaderChecker.IsUserfrontWebhookTokenValid(authorization))
            {
                return Unauthorized();
            }

            if (createAppUser is null || string.IsNullOrEmpty(createAppUser.Record?.UserUuid))
            {
                return BadRequest();
            }

            var user = await _appUserService.AddAsync(createAppUser);

            return CreatedAtAction(nameof(GetAppUser), new { id = user.Id }, user);
        }

        [HttpGet("{id}")]
        [Authorize(Policy = "Admin")]
        public async Task<IActionResult> GetAppUser(int id)
        {
            AppUserDTO u = await _appUserService.GetAsync(id);
            return Json(u);
        }

        [HttpGet]
        [Authorize(Policy = "Admin")]
        public async Task<IActionResult> GetAllAppUsers(string uuid)
        {
            if (!string.IsNullOrEmpty(uuid))
            {
                var u = await _appUserService.GetByUuidAsync(uuid);
                return Json(u);
            }
            else
            {
                var us = await _appUserService.GetAllAsync();
                return Json(us);
            }
        }
    }
}
