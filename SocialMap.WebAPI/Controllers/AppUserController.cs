using Microsoft.AspNetCore.Mvc;
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

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAppUser(string id)
        {
            AppUserDTO z = await _AppUserService.GetAsync(id);
            if (z == null)
            {
                return NotFound();
            }
            return Json(z);
        }

        [HttpGet]
        public async Task<IActionResult> BrowseAllAsync()
        {
            IEnumerable<AppUserDTO> z = await _AppUserService.BrowseAllAsync();
            if (z == null)
            {
                return NotFound();
            }
            return Json(z);
        }
    }
}
