using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HostelManagementService.Models
{
    public class Tenant
    {
        public int TenantId { get; set; }
        public string Name { get; set; }
        public string MobileNumber { get; set; }
        public string AlternativeMobileNumber { get; set; }
        public string Gender { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public DateTime DateOfJoining { get; set; }
        public int Age { get; set; }
        public decimal AdvanceAmount { get; set; }
        public string Referral { get; set; }
        public bool IsActive { get; set; }
    }
}
