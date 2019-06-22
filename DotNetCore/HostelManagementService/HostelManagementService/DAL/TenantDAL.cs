using HostelManagementService.Models;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using Microsoft.Extensions.Configuration;
using System;

namespace HostelManagementService.DAL
{
    public class TenantDAL
    {
        private IConfiguration _configuration = null;
        public TenantDAL(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public IList<Tenant> GetAllTenantDetails()
        {
            IList<Tenant> tenants = null;
            Tenant tenant = null;
            string connString = _configuration.GetSection("DefaultConnection").Value;
            using (SqlConnection conn = new SqlConnection())
            {
                conn.ConnectionString = connString;
                using(SqlCommand command = new SqlCommand("[dbo].[GetTenantDetails]", conn))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    conn.Open();
                    using(SqlDataReader reader = command.ExecuteReader())
                    {
                        tenants = new List<Tenant>();
                        while(reader.Read())
                        {
                            tenant = new Tenant();
                            tenant.TenantId = Convert.ToInt32(reader["TenantId"].ToString());
                            tenant.Name = reader["Name"].ToString();
                            tenant.MobileNumber = reader["AlternateMobileNo"].ToString();
                            tenant.Gender = reader["Gender"].ToString();
                            tenant.Email = reader["Email"].ToString();
                            tenant.Address = reader["Address"].ToString();
                            tenant.DateOfJoining = Convert.ToDateTime(reader["DateOfJoining"].ToString());
                            tenant.Age = Convert.ToInt32(reader["Age"].ToString());
                            tenant.AdvanceAmount = Convert.ToDecimal(reader["AdvanceAmount"].ToString());
                            tenant.Referral = reader["Referral"].ToString();
                            tenant.IsActive = Convert.ToBoolean(reader["IsActive"].ToString());
                            tenants.Add(tenant);
                        }
                    }
                }
            }
            return tenants;
        }
    }
}
