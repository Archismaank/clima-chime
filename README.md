# Weather-Live: A Real-Time Weather Dashboard 🌦️

Welcome to Weather-Live, a dynamic and intuitive weather dashboard that provides real-time weather data, forecasts, and intelligent alerts. Built with a modern tech stack, it offers a seamless user experience for getting up-to-the-minute weather information for any location in the world.

## 📸 Preview

![Weather-Live application screenshot showing the dashboard with current weather, forecast, and map.](https://storage.googleapis.com/gemini-prod-us-west1-d859560f-upload/image_c6934c.jpg)

---

## ✨ Features

* **Real-Time Weather Data**: Get the current temperature, humidity, wind speed, and "feels like" conditions instantly.
* **City Search**: Manually search for any city worldwide to get its weather information.
* **Geolocation Support**: Automatically detect and display weather for your current location with a single click.
* **Interactive Map Selector**: Pinpoint a location directly on a map to fetch weather data for that specific area.
* **5-Day Forecast**: View a detailed weather forecast for the next five days.
* **Dynamic Weather Alerts**: Receive intelligent alerts for significant weather conditions like upcoming rain, extreme heat, or high winds.
* **AI-Powered Visualizations**: An interactive map visualizes weather layers like temperature, clouds, and precipitation.
* **Responsive Design**: A clean and modern UI that works beautifully on both desktop and mobile devices.

---

## Diagrama de Flujo de la Aplicación 📊

Este diagrama ilustra el flujo de datos y la interacción del usuario dentro de la aplicación Weather-Live.

```mermaid
graph TD
    A[Usuario llega a la página] --> B{Elige el método de entrada};
    B --> C[📍 Usar Ubicación Actual];
    B --> D[🔍 Buscar Ciudad];
    B --> E[🗺️ Seleccionar en el Mapa];

    C --> F[API de Geolocalización del Navegador];
    D --> G[Entrada de Texto];
    E --> H[Coordenadas del Mapa];

    F --> I{Obtener Lat/Lon};
    G --> J[Nombre de la Ciudad];
    H --> I;

    I --> K[API Inversa de Geocodificación<br>(OpenWeatherMap)];
    K --> J;

    J --> L[Servicio Meteorológico<br>(Llamada a la API de OpenWeatherMap)];
    L --> M{Datos Obtenidos};
    M --> N[☀️ Tiempo Actual];
    M --> O[📅 Pronóstico];

    N --> P[Tarjeta de Tiempo Actual];
    N --> Q[Mapa Interactivo del Tiempo];
    O --> R[Tarjeta de Pronóstico de 5 Días];

    subgraph "Interfaz de Usuario"
        P;
        Q;
        R;
        S[Panel de Alertas Inteligentes];
    end

    M --> T[Generar Alertas];
    T --> S;
