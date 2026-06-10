# TodoList Express
Todo List con autenticación JWT, Drive de archivos y HTTPS.
## Tecnologías
- Backend: Node.js + Express + MongoDB
- Frontend: React
- Auth: Passport.js + JWT + bcrypt
- HTTPS: mkcert
## Requisitos
- Node.js v18 o superior
- npm
- mkcert
- Chocolatey (para instalar mkcert en Windows)

## Instalación
### 1. Clonar el repositorio
git clone https://github.com/JMCS10/todolist-express.git

cd todolist-express

### 2. Configurar el backend
cd backend

npm install

luego crear el archivo .env con este contenido:

MONGODB_URI=tu_cadena_de_conexion_de_mongodb_atlas

JWT_SECRET=mi_secreto_jwt

PORT=5000

Para obtener MONGODB_URI: crear una cuenta en MongoDB Atlas, crear un cluster gratuito y copiar la cadena de conexión

### 3. Generar certificados HTTPS
-Instalar Chocolatey abriendo PowerShell como administrador y ejecutar:

Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

nota:Reiniciar powersell luego de la instalacion

-Instalar mkcert, ejecutar en powersell como administrador:

choco install mkcert

-generar los certificados dentro de la carpeta backend(desde el mismo powersell y a la carpeta del backend):

cd backend

mkcert -key-file key.pem -cert-file cert.pem localhost
### 4. Cargar datos de prueba
cd backend

node datosdb.js

Usuarios de prueba:
- Jherlan / contrasena: 123456
- Marcelo / contrasena: 123456
### 5. Iniciar el backend
cd backend

npm run dev
### 6. Configurar el frontend
cd frontend

npm install

npm start
### 7. Abrir en el navegador
https://localhost:3000

nota:El navegador puede mostrar una advertencia de certificado, hacer click en "Avanzado" y "Continuar"
