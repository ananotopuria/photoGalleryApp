# 📸 Photo Gallery App

A photo gallery application built using React, React Query, and the Unsplash API. 
This project demonstrates:

## 🌐 Live Demo

Check out the live demo of the app here: [stellular-chaja-4116e9.netlify.app](https://stellular-chaja-4116e9.netlify.app/)

## ✨ Features

🏞️ **Popular Images** – Displays popular images when no search term is provided.  
🔍 **Live Search** – Users can search for photos in real-time.  
🔄 **Infinite Scrolling** – More images load automatically when scrolling.  
🕒 **Search History Page** – Previous search terms are saved for quick navigation.  
🖼️ **Modal View** – Clicking an image opens a detailed modal with likes, downloads, and views. 
🪞 **React Portal** – The modal is rendered using React Portal for better layering.  
👾 **Data Caching** – React Query caches data efficiently to minimize API calls. 
📱 **Responsive Design** – Fully optimized for desktop and mobile screens using Tailwind CSS. 

## 💻 Tech Stack 

⚛️ **React** – UI Library 
🚀 **React Query** – Data fetching and caching 
🗺️ **React Router** – Routing 
📷 **Unsplash API** – Photo data source 
🎨 **Tailwind CSS** – Styling framework 
⚡ **Vite** – Build tool 

## Code Quality Tools 🛠️

This project uses several tools to maintain code quality and consistency:

🧹 **ESLint:** For linting your code and enforcing coding standards. 
💅🏻 **Prettier:** For automatic code formatting. 
🔒 **Husky:** To run pre-commit hooks ensuring that your code meets quality standards before commits. 

Configuration files for ESLint and Prettier are included in the project root (e.g., `.eslintrc.js` and `.prettierrc`), and Husky is configured to run these checks on every commit.

## 🛠️ Installation 

1. **Clone the Repository** 📦

   ```bash
   git clone git@github.com:ananotopuria/photoGalleryApp.git
   cd photo-gallery-app
   npm install
   ```

2. **Setup Environment Variable** 🔑

   Create a .env file in the root directory and add your Unsplash API key: VITE_API_KEY=your_unsplash_api_key
   You can obtain an API key by signing up at (https://unsplash.com/documentation)

3. **Running the App** 🚀

   To start the development server, run:

   ```bash
   npm run dev
   ```

   To build the app for production, run:

   ```bash
   npm run build
   ```
