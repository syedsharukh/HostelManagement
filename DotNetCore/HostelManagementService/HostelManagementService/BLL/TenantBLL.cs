using HostelManagementService.DAL;
using HostelManagementService.Models;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
namespace HostelManagementService.BLL
{
    public class TenantBLL
    {
        public TenantBLL()
        {
        }
        public IList<Tenant> GetAllTenantDetails()
        {
            IList<Tenant> tenants = new List<Tenant>();
            tenants = new TenantDAL().GetAllTenantDetails();
            return tenants;
        }
    }
}
