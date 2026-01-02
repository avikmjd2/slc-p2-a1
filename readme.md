 
 # 🚀 IIIT Clubs & Events Portal

 TASK1 is done in Task 1 folder directory. with screenshots of each working gateway query and mutation and its output is shown in slca1.docx. 
 BTW A IMPORTANT POINT:
 TASK1 was does in window so the code can be run in windows (maybe in Linux not sure)
 TASK2 (wordpress) can be both run in linux and windows.

 
 A full-stack, federated GraphQL application built with **Next.js**, **Apollo Federation**, **FastAPI**, and **MongoDB**. This project is fully containerized using Docker for seamless "one-click" deployment on Windows and Linux (Fedora).

 TASK 2:  This Project contains a fully working wordpress website with backend and frontend. The frontend can send and recieve data to backend. Furthemore as a bonus you can search clubs/events with the the search bar in the frontent website of TASK2.
 
 ---
 
 ## ✨ Features
 
 * **Microservices Architecture:** Independent subgraphs for Clubs and Events.
 * **Apollo Federation:** A unified Gateway to query multiple services in a single request.
 * **Automated Data Seeding:** Python scripts automatically populate MongoDB on up.
 * **Responsive Frontend:** Built with Next.js and Tailwind/Bootstrap for a modern UI.
 * **Cross-Platform Ready:** Tested on Fedora (Linux) and Windows via Docker Desktop.
 
 ---
 
 ## 🏗️ System Architecture
 
 The application consists of 6 core services:
 1.  **Frontend:** Next.js (Port 3000)
 2.  **Gateway:** Apollo Gateway (Port 4000)
 3.  **Clubs Subgraph:** FastAPI/Python (Port 8000)
 4.  **Events Subgraph:** FastAPI/Python (Port 8001)
 5.  **Database:** MongoDB (Port 27018)
 6.  **DB-Seed:** Python utility for initial data import.
 
 ---
 
 ## 🚀 Getting ed
 
 ### 📋 Prerequisites
 
 * **Docker Desktop** (Running on Windows or Linux)
 * **Git**
 
 ### ⚙️ Installation & Setup
 
 1. **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/slc-p2-a1.git](https://github.com/your-username/slc-p2-a1.git)
    cd slc-p2-a1
    ```
 
 2. **Run with Docker Compose:**
    Open your terminal in the project root and run:
    ```bash
    docker compose up --build
    ```
    *Note: On Linux, ensure Docker Desktop is open. Do not use `sudo` with Docker Desktop.*
 
 3. **Verify the Services:**
    Once the logs show "Application up complete," you can access the project:
    * **Frontend:** [http://localhost:3000](http://localhost:3000)
    * **GraphQL Gateway:** [http://localhost:4000/graphql](http://localhost:4000/graphql)
    * **MongoDB:** `mongodb://localhost:27018`
 
 ---
 
 ## 🔧 Troubleshooting (Linux/Fedora)
 
 If you encounter issues on Fedora, check the following:
 
 * **Permission Denied:** Ensure you have added the `:z` flag to your volumes in `docker-compose.yml` to satisfy SELinux.
 * **Failed to Fetch:** Ensure the Gateway is up. Use `docker compose logs gateway` to check for connection errors.
 * **Folder Names:** Avoid spaces in your project path (e.g., use `Project_Folder` instead of `Project Folder`).
 
 ---
 
 ## 🛠️ Commands Reference
 
 | Action | Command |
 | :--- | :--- |
 | ** all services** | `docker compose up -d` |
 | **Rebuild and re** | `docker compose up --build` |
 | **Stop all services** | `docker compose down` |
 | **View logs (Gateway)** | `docker compose logs -f gateway` |
 | **Reset Database** | `docker compose down -v` |
 
