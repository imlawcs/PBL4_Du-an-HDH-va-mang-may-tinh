# Add cert for specific IP for ASP.NET CORE API Kestrel Config

**1. Run**

```console

mkdir DevCert
openssl req -x509 -newkey rsa:2048 -keyout DevCert/key.pem -out DevCert/cert.pem -days 365 -nodes -subj "/CN=youripaddress"
openssl pkcs12 -export -out certificate.pfx -inkey key.pem -in cert.pem -passout pass:yourpassword

```

- Replace `youripaddress` with your ip (`localhost` is also accepted)
- Replace `yourpassword` with your desired password

Flow:

- Create folder `DevCert`
- Gennerate SSL Private key `key.pem` and Certificate `cert.pem`
- Convert to PFX file `certificate.pfx`

**2. Config your `Program.cs`**

```cs
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
                    webBuilder.UseStartup<Startup>()
                    .ConfigureKestrel(serverOptions =>
                          {
                              serverOptions.ConfigureHttpsDefaults(httpsOptions =>
                              {
                                  httpsOptions.ServerCertificate = new X509Certificate2("./DevCert/certificate.pfx", "huukhoa");
                              });
                          }); ;
                });
    }
}


```

## NOTE

- Make sure to change your `appsetting.json`'s Kestrel IP to match the same as SSL Trusted IP by replacing `youripaddress`

```json
//rest of codes
"Kestrel": {
    "Endpoints": {
      "Http": {
        "Url": "http://youripaddress:3000"
      },
      "Https": {
        "Url": "https://youripaddress:3001"
      }
    }
  }
//...
```

**3. Run the project:**

```console

dotnet run

```
