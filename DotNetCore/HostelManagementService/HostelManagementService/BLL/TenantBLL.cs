using HostelManagementService.DAL;
using HostelManagementService.Models;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
namespace HostelManagementService.BLL
{
    public class TenantBLL
    {
        private IConfiguration _configuration = null;
        public TenantBLL(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public IList<Tenant> GetAllTenantDetails()
        {
            IList<Tenant> tenants = new List<Tenant>();
            tenants = new TenantDAL(_configuration).GetAllTenantDetails();
            return tenants;
        }
    }
}
