using HostelManagementService.Models;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using Microsoft.Extensions.Configuration;
using System;
using HostelManagementService.Shared;

namespace HostelManagementService.DAL
{
    public class TenantDAL
    {
        private static string _configuration = string.Empty;
        public TenantDAL()
        {
            _configuration = ConnectionUtil.AppSettings["DefaultConnection"];
        }
        public IList<Tenant> GetAllTenantDetails()
        {
            IList<Tenant> tenants = null;
            Tenant tenant = null;
            string connString = _configuration;
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
                            tenant.DateOfJoining = string.IsNullOrEmpty(reader["DateOfJoining"].ToString())?new DateTime():Convert.ToDateTime(reader["DateOfJoining"].ToString());
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
