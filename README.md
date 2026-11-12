# GLEDITECH — Página web corporativa

Sitio público, independiente del sistema administrativo GLEDITECH. Diseño responsive con logo oficial proporcionado, presentación de ingeniería civil y eléctrica, servicios, metodología, espacio para proyectos y contacto editable. No usa base de datos ni credenciales. **No subir este sitio sobre el repositorio actual de la plataforma administrativa**: crear uno nuevo, por ejemplo `gleditech-web`.

## Probar localmente

Con Node 20+:

```bash
npm start
```

Abrir http://localhost:10000. Comprobar salud: http://localhost:10000/health.

## GitHub y Render

1. Crear un **nuevo repositorio** GitHub llamado `gleditech-web`. No reemplazar el repositorio de la aplicación empresarial.
2. Subir **los archivos contenidos dentro de esta carpeta** directamente a la raíz del nuevo repositorio (incluidos `public`, `package.json`, `server.js`, `render.yaml`).
3. En Render seleccionar **New → Web Service** y conectar el nuevo repositorio.
4. Elegir Node, `npm install --omit=dev` como Build Command y `npm start` como Start Command; `render.yaml` contiene estas opciones. Plan gratuito si está disponible.
5. No agregar `ADMIN_PASSWORD` ni `DATABASE_URL`. Esta web no los utiliza.
6. Render asignará una URL propia; para utilizar un dominio personalizado, configurarlo desde Settings.

## Completar datos de contacto

Editar `public/config.js` y poner el correo electrónico, número de WhatsApp con código de país, ubicación y redes sociales oficiales. Los botones se activan cuando esos datos están completos. No hay formulario que almacene información; se usan enlaces a WhatsApp o correo.

## Fotografías y videos incorporados (versión real V2)

Los medios proporcionados por GLEDITECH se encuentran en `public/assets/`, incluidos seis archivos WebP y cuatro videos MP4 con poster. El portafolio, la portada y la sección de videos usan estos archivos originales; no se añadieron imágenes generadas con IA. La ilustración corporativa está identificada como tal.

Los textos de trabajos eléctricos, inspecciones, obras y sistemas de videovigilancia están redactados a partir del material recibido. No se atribuyen certificaciones, magnitudes, años de experiencia ni proyectos específicos no identificados. Los MP4 se reproducen a petición del visitante (`preload=none`) para reducir consumo de datos.

## Nota importante

Los servicios mencionados describen las áreas y módulos presentes en el sistema GLEDITECH compartido; **no se afirman obras terminadas, licencias, acreditaciones, cifras, años de experiencia ni clientes** que no hayan sido documentados.


## Fotografías reales e Instagram
El enlace oficial de Instagram está integrado en `public/config.js` y en la sección Proyectos. Instagram limita la descarga automática: para mostrar fotografías reales dentro del sitio, exporta o comparte los archivos originales con permiso de uso. No se han atribuido imágenes de terceros a GLEDITECH ni se han generado obras con IA.
