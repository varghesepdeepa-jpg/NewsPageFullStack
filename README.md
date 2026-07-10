# NewsPageFullStack

A responsive React news application built with a decoupled .NET Minimal API backend proxy. The frontend leverages Tailwind CSS for fluid mobile-first design and dynamic routing, while the backend functions as a secure server-to-server broker to fetch live news payloads without exposing private developer keys to browsers.

---

## 🛠️ Tech Stack

* **Frontend:** React (Vite), Tailwind CSS, React Router
* **Backend:** .NET 10.0 Minimal API, C#

---

## 🚀 Features

* **Decoupled Architecture:** Client-side presentation is completely separated from the server layer.
* **Secure API Proxy:** The backend functions as an intermediary gateway, appending security credentials safely out of public browser network tools.
* **Mobile-First UX:** Fluid layouts that scale automatically from small viewports to desktop multi-column news grids.
* **Dynamic Navigation:** Built using React Router segments for instant dashboard updates and detailed views.

---

## 💻 Getting Started

### Setup Backend (.NET)
1. Navigate to the backend folder: `cd NewsPageVS/NewsPageBackend`
2. Configure your secret News API key inside `appsettings.Development.json`
3. Launch the server: `dotnet run`

### Setup Frontend (React)
1. Navigate to the frontend folder: `cd NewPageReact`
2. Install dependencies: `npm install`
3. Run the client developer environment: `npm run dev`
