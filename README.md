# 🎵 StreamFlix / StreamBeat - Plataforma de Descargas & Streaming Multimedia

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-FF5722?logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**StreamFlix** (StreamBeat) es una aplicación web moderna, rápida y responsiva diseñada para la búsqueda, streaming y descarga de contenido multimedia (Audio en alta fidelidad **MP3 hasta 320 kbps** y Video **MP4 en HD/Full HD**), con soporte completo para instalación como aplicación web progresiva (**PWA**).

---

## 📸 Galería y Capturas de Pantalla

> *A continuación se presentan las vistas principales de la aplicación. Puedes reemplazar las rutas con tus capturas locales o remotas.*

| 🖥️ Vista Principal / Descargador | 📱 Modal de Descarga Multiformato |
| :---: | :---: |
| ![Vista Principal](./public/screenshot-home.png) | ![Modal de Descarga](./public/screenshot-download.png) |

| 📲 Instalación PWA (Móvil / Desktop) | 📂 Historial de Descargas Guardadas |
| :---: | :---: |
| ![Instalación PWA](./public/screenshot-install.png) | ![Historial de Descargas](./public/screenshot-downloads.png) |

---

## ✨ Características Principales

- 🔍 **Búsqueda Avanzada y Detección de Enlaces:**
  - Búsqueda en tiempo real por nombre de canción, artista o género.
  - Reconocimiento y extracción automática de URLs de YouTube (videos, shorts, embeds y playlists).
- 🎧 **Descargador de Audio de Alta Fidelidad:**
  - Conversión y descarga directa a formatos MP3 (320 kbps HD, 192 kbps, 128 kbps).
- 🎬 **Descargador de Video en Alta Definición:**
  - Descargas directas en formato MP4 (720p HD, 1080p Full HD).
- 💾 **Gestor de Historial Local:**
  - Registro de canciones y videos descargados persistente mediante `localStorage`.
- 📱 **Soporte PWA (Progressive Web App):**
  - Instalable en Android, iOS, Windows y macOS.
  - Modal interactivo con instrucciones de instalación directa según el dispositivo.
- 🎨 **Interfaz Moderna con Tema Oscuro (Dark Neon Theme):**
  - Construida con Tailwind CSS, efectos de desenfoque (`backdrop-blur`) y gradientes de acento en tonos rojos/neón.
- ⚡ **Despliegue Serverless Optimizado:**
  - Configurado con endpoints en `/api` listos para desplegar en plataformas como Vercel.

---

## 🏗️ Estructura del Proyecto

```plaintext
G:\streamflix\
├── 📁 api/                   # Serverless Functions (Vercel)
│   ├── download.js           # Endpoint para procesar y redirigir descargas
│   └── stream.js             # Endpoint para streaming de audio/video
├── 📁 musicas/               # Muestras y archivos multimedia locales
├── 📁 public/                # Recursos estáticos
│   └── manifest.json         # Manifiesto para Progressive Web App (PWA)
├── 📁 src/                   # Código fuente de la aplicación React
│   ├── 📁 components/        # Componentes UI modulares
│   │   ├── AudioVisualizer.jsx   # Visualizador de espectro de audio
│   │   ├── DownloadModal.jsx     # Modal selector de formatos y calidades
│   │   ├── DownloadsView.jsx     # Vista principal de búsqueda y descargas
│   │   ├── HomeView.jsx          # Vista de inicio / recomendaciones
│   │   ├── InstallModal.jsx      # Modal de guía e instalación PWA
│   │   ├── LibraryView.jsx       # Vista de biblioteca y listas
│   │   ├── LyricsModal.jsx       # Modal de letras de canciones
│   │   ├── Navbar.jsx            # Barra superior de navegación
│   │   ├── Player.jsx            # Reproductor multimedia integrado
│   │   ├── RingtoneModal.jsx     # Cortador/Creador de tonos
│   │   ├── SearchView.jsx        # Vista de resultados de búsqueda
│   │   ├── ShareModal.jsx        # Modal para compartir canciones
│   │   └── Sidebar.jsx           # Menú lateral colapsable
│   ├── 📁 services/          # Servicios y lógica de negocio
│   │   └── musicService.js   # APIs de Invidious, NoEmbed y almacenamiento local
│   ├── App.jsx               # Componente raíz de la aplicación
│   ├── index.css             # Estilos globales y utilidades Tailwind
│   └── main.jsx              # Punto de entrada de React DOM
├── index.html                # Plantilla HTML principal
├── package.json              # Dependencias y scripts del proyecto
├── postcss.config.js         # Configuración de PostCSS
├── tailwind.config.js        # Configuración de Tailwind CSS
├── vercel.json               # Reglas de enrutamiento y despliegue para Vercel
└── vite.config.js            # Configuración del bundler Vite
```

---

## 🚀 Requisitos Previos e Instalación

### Requisitos:
- **Node.js** >= 18.x
- **npm** >= 9.x (o yarn / pnpm)

### Pasos para ejecutar localmente:

1. **Clonar o abrir el directorio del proyecto:**
   ```bash
   cd G:\streamflix
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   *La aplicación estará disponible por defecto en: `http://localhost:5173`*

4. **Compilar para producción:**
   ```bash
   npm run build
   ```

5. **Previsualizar la compilación de producción:**
   ```bash
   npm run preview
   ```

---

## 🌐 Despliegue en Producción (Vercel)

El proyecto incluye el archivo `vercel.json` preconfigurado para manejar el enrutamiento del Single Page Application (SPA) y las funciones serverless de la carpeta `/api`:

```bash
# Instalar Vercel CLI si no está instalado
npm i -g vercel

# Desplegar el proyecto
vercel
```

---

## 🛠️ Tecnologías Utilizadas

- **Framework:** [React 18](https://reactjs.org/)
- **Empaquetador:** [Vite](https://vitejs.dev/)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
- **Iconos:** [Lucide React](https://lucide.dev/)
- **Streaming de Video:** [HLS.js](https://github.com/video-dev/hls.js/)

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más información.
