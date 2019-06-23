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
                            tenant.MobileNumber = reader["MobileNo"].ToString();
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

        public bool InsertTenantDetails(Tenant tenant)
        {
            bool isInserted = true;
            string connString = _configuration;
            using (SqlConnection conn = new SqlConnection())
            {
                conn.ConnectionString = connString;
                using (SqlCommand command = new SqlCommand("[dbo].InsertTenantDetails", conn))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@Name", tenant.Name);
                    command.Parameters.AddWithValue("@MobileNo", tenant.MobileNumber);
                    command.Parameters.AddWithValue("@AlternateMobileNo", tenant.AlternativeMobileNumber);
                    command.Parameters.AddWithValue("@Email", tenant.Email);
                    command.Parameters.AddWithValue("@Address", tenant.Address);
                    command.Parameters.AddWithValue("@DateOfJoining", tenant.DateOfJoining);
                    command.Parameters.AddWithValue("@Gender", tenant.Gender);
                    command.Parameters.AddWithValue("@Age", tenant.Age);
                    command.Parameters.AddWithValue("@AdvanceAmount", tenant.AdvanceAmount);
                    command.Parameters.AddWithValue("@Referral", tenant.Referral);
                    conn.Open();
                    command.ExecuteNonQuery();
                   
                    return isInserted;
                }
            }

        }
    }
}
