using System.Security.Cryptography.X509Certificates;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace StreamingApp
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>().ConfigureKestrel(serverOptions =>
                          {
                              serverOptions.ConfigureHttpsDefaults(httpsOptions =>
                              {
                                  httpsOptions.ServerCertificate = new X509Certificate2("./DevCert/_192.168.56.1_cert.pfx", "huukhoa");
                              });
                          });
                });
    }
}

