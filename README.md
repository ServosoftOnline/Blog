# 🍽️🚧 **BLOG GASTRONÓMICO EN CONSTRUCCIÓN / FOOD BLOG UNDER CONSTRUCTION** 🚧🍽️

> 🛠️ **Español:** Este proyecto está en desarrollo activo. Funcionalidades, recetas, código y documentación pueden cambiar en cualquier momento. 
 
> 🛠️ **English:** This project is under active development. Features, recipes, code, and documentation may change at any time.  

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
Este es un **blog gastronómico** desarrollado con un **frontend** en React (Vite) y un **backend** en Node.js + Express, con base de datos MongoDB. La aplicación permite **publicar, gestionar y comentar recetas** de forma sencilla, incluyendo imágenes, descripciones e ingredientes.

---

## 📌 Description (English)
This is a **food blog** developed with a **frontend** in React (Vite) and a **backend** in Node.js + Express, using MongoDB as the database. The application allows users to **publish, manage, and comment on recipes** easily, including images, descriptions, and ingredients.

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