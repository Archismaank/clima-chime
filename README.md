# 🌦️ Weather App – Real-Time Weather Tracking & Forecast

Welcome to the **Weather App**, a modern and intuitive application that provides **real-time weather updates** and **7-day forecasts**. Whether you want to check the conditions for your current location or search for weather anywhere in the world, this app has you covered.

---

## ✨ Features

- 🌍 **Search by Location** – Enter any city name to get live weather details.  
- 📍 **Current Location Support** – Automatically fetch weather based on your device’s geolocation.  
- ⏱️ **Real-Time Weather Tracking** – Get up-to-the-minute details like temperature, humidity, wind speed, and conditions.  
- 📅 **7-Day Forecast** – Stay prepared with detailed forecasts for the entire week.  
- 📱 **Responsive Design** – Optimized for both desktop and mobile devices.  

---

## 📊 Application Flow

The diagram below shows how users interact with the app and how data flows through different modules.

```mermaid
graph TD
    A[User Opens App] --> B{Choose Input Method}
    B --> C["📍 Use Current Location"]
    B --> D["🔍 Enter City Name"]

    C --> E[Browser Geolocation API]
    D --> F[User Input Handler]

    E --> G[Get Latitude & Longitude]
    G --> H[Weather API Request]
    F --> H

    H --> I{Weather Data Received}
    I --> J[☀️ Current Weather Display]
    I --> K[📅 7-Day Forecast]

    subgraph "User Interface"
        J
        K
    end
