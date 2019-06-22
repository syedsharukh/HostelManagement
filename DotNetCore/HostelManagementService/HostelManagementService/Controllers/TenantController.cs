using HostelManagementService.BLL;
using HostelManagementService.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
namespace HostelManagementService.Controllers
{
    [Route("api/[controller]")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TenantController : ControllerBase
    {
        private IConfiguration _configuration = null;
        public TenantController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpPost]
        public IList<Tenant> GetAllTenantDetails()
        {
            IList<Tenant> tenants = new List<Tenant>();
            tenants = new TenantBLL(_configuration).GetAllTenantDetails();
            return tenants;
        }
    }
}