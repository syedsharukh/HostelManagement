using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace HostelManagementService.Shared
{
    public static class ConnectionUtil
    {
            static ConnectionUtil()
            {
                string basePath = Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().Location);
                Dictionary<string, string> appSettings = new Dictionary<string, string>();
                Dictionary<string, string> JobSettings = new Dictionary<string, string>();
                try
                {
                    IConfigurationBuilder builder = new ConfigurationBuilder()
                            .SetBasePath(basePath)
                            .AddJsonFile("appsettings.json");

                    IConfigurationRoot configuration = builder.Build();
                    appSettings = configuration.GetSection("AppSettings").GetChildren().Select(item => new KeyValuePair<string, string>(item.Key, item.Value)).ToDictionary(x => x.Key, x => x.Value);


                }
                catch (FileNotFoundException) { }
                AppSettings = appSettings.GroupBy(d => d.Key).ToDictionary(d => d.Key, d => d.First().Value);
            }
            public static Dictionary<string, string> AppSettings { get; private set; }
    }
}
