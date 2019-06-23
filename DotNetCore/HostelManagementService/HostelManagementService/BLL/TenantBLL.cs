using HostelManagementService.DAL;
using HostelManagementService.Models;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using System;

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

        internal bool InsertTenantDetails(Tenant tenant)
        {
            return new TenantDAL().InsertTenantDetails(tenant);
        }
    }
}
