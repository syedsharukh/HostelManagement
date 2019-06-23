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
        public TenantController()
        {
        }
        [HttpGet]
        public IList<Tenant> GetAllTenantDetails()
        {
            IList<Tenant> tenants = new List<Tenant>();
            tenants = new TenantBLL().GetAllTenantDetails();
            return tenants;
        }
    }
}