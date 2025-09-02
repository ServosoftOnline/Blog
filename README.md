# 🍽️🚧 **BLOG GASTRONÓMICO EN CONSTRUCCIÓN / FOOD BLOG UNDER CONSTRUCTION** 🚧🍽️

> 🛠️ **Español:** Este proyecto está en desarrollo activo. Funcionalidades, recetas, código y documentación pueden cambiar en cualquier momento. **Se encuentra despleguado en https://recetas-online.vercel.app/**
 
> 🛠️ **English:** This project is under active development. Features, recipes, code, and documentation may change at any time.  **It is deployed in https://recetas-online.vercel.app/**

---

# 🥗 Blog Gastronómico

[![Made with React](https://img.shields.io/badge/Frontend-React-blue?logo=react)](https://react.dev/)
[![Made with Node.js](https://img.shields.io/badge/Backend-Node.js-green?logo=node.js)](https://nodejs.org/)
[![Database MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen?logo=mongodb)](https://www.mongodb.com/)
[![License MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Status](https://img.shields.io/badge/Status-En%20Construcción-orange)](#)
[![Category](https://img.shields.io/badge/Category-Food%20Blog-red)](#)

---

## 📌 Descripción (Español)
He desarrollado un blog de recetas de cocina con funcionalidades **CRUD (Crear, Leer, Actualizar, Eliminar).** La aplicación permite a los usuarios gestionar recetas completas con **subida de imágenes a través de Cloudinary, optimizando la experiencia visual con un **diseño completamente responsive.**

El proyecto está construido como una aplicación **MERN (MongoDB, Express, React, Node.js)** y demuestra habilidades clave en el despliegue full-stack y la integración con servicios de terceros.

**Actualmente, el proyecto se encuentra en desarrollo**. La próxima fase incluirá la implementación de autenticación de usuarios con JWT, lo que permitirá a los usuarios registrarse y gestionar sus propias recetas de forma segura.

---

## 📌 Description (English)
I have developed a cooking recipe blog with **CRUD (Create, Read, Update, Delete) functionality.** The application allows users to manage complete recipes with **image uploads via Cloudinary, optimizing the visual experience with a **fully responsive design.**

The project is built as a **MERN application (MongoDB, Express, React, Node.js)** and demonstrates key skills in full-stack deployment and integration with third-party services.

**The project is currently under development**. The next phase will include implementing user authentication with JWT, allowing users to register and manage their own recipes securely.



---

## 📂 Estructura del proyecto / Project structure

```bash
Blog/
│
├── backend/     # API REST con Node.js + Express / REST API with Node.js + Express
├── frontend/    # Aplicación web con React + Vite / Web app with React + Vite
├── package.json # Scripts para ejecutar front y back juntos / Scripts to run both
├── .gitignore
└── README.md

🚀 Instalación y ejecución
📜 Español
Requisitos:

1.- Tener instalado nodejs, puede ser que sea necesario actualizarlo si la lo tienes instalado previamente
2.- Instalar mongodb en su pc
3.-  Opcionalmente tener instalado mongo compass si se desea tener control sobre la colección creada y crear una conexión con la bbdd mi_blog en la URI mongodb://localhost:27017 que suele venir por defecto

Paso	Comando                                     Acción
1️⃣ Clonar el repositorio	        git clone https://github.com/ServosoftOnline/Blog.git
2️⃣ Instalar dependencias backend	cd Blog/backend && npm install
3️⃣ Instalar dependencias frontend	cd Blog/frontend && npm install
4️⃣ Ejecutar el proyecto	        cd Blog && npm install && npm run dev

Esto iniciará frontend y backend de forma simultánea.


🚀 Installation & Running (English)
📜 English

Requirements:
1.- Have Node.js installed. You may need to update it if you have a previous version installed.
2.- Install MongoDB on your computer.
3.- Optionally, have Mongo Compass installed if you want to manage the created collection and connect to the mi_blog database at the default URI: mongodb://localhost:27017


Step	Command                                     Action
1️⃣ Clone repository	            git clone https://github.com/ServosoftOnline/Blog.git
2️⃣ Install backend dependencies	cd Blog/backend && npm install
3️⃣ Install frontend dependencies	cd Blog/frontend && npm install
4️⃣ Run the project	                cd Blog && npm install && npm run dev

This will start both frontend and backend simultaneously.