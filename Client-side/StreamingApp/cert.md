# Add cert for specific IP for Vite host config

**1. Run**

```console

mkdir certs
openssl req -x509 -newkey rsa:2048 -keyout certs/key.pem -out certs/cert.pem -days 365 -nodes -subj "/CN=youripaddress"

```

- Replace `youripaddress` with your ip (`localhost` is also accepted)

- Or with config file:

```console

openssl req -x509 -newkey rsa:2048 -keyout certs/key.pem -out certs/cert.pem -days 365 -nodes -config server_cert.cfg

```

- Example of server_cert.cfg:

```cfg
[ req ]
default_bits       = 2048
prompt             = no
default_md         = sha256
distinguished_name = dn
req_extensions     = req_ext

[ dn ]
CN = yourip

[ req_ext ]
subjectAltName = @alt_names

[ alt_names ]
IP.1 = yourip
```

**2. Config your `vite.config.js`**

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, "certs/key.pem")),
      cert: fs.readFileSync(path.resolve(__dirname, "certs/cert.pem")),
    },
    host: true,
  },
});
```

**3. Config your `dev` in `package.json` as below**

```json

"scripts": {
    "dev": "vite --host",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },

```

**4. Run the project:**

```console

npm run dev

```

- The example output should be similar to this:

```
VITE v5.4.9  ready in 287 ms

  ➜  Local:   https://localhost:5173/
  ➜  Network: https://192.168.1.11:5173/
  ➜  Network: https://192.168.136.1:5173/
  ➜  Network: https://192.168.56.1:5173/
  ➜  press h + enter to show help

```
