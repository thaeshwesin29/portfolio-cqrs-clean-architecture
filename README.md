📌 Portfolio CQRS Clean Architecture

A full-stack portfolio management system built with Laravel (CQRS + Event-Driven Architecture), Vue 3 (Vite), and Docker.
This project demonstrates a scalable, clean, and maintainable architecture featuring CQRS, Event Sourcing, and Real-time UI updates — ideal for modern enterprise-level applications.

🚀 Features

⚙️ CQRS Pattern – Separation of Write (MySQL) and Read (MongoDB) models.

🔔 Event-Driven Architecture – Powered by RabbitMQ for asynchronous communication.

⚡ Real-time Frontend – Vue updates instantly through Laravel Echo broadcasts.

🧩 Clean Codebase – Domain-Driven, SOLID, and DRY principles applied throughout.

🐳 Dockerized Stack – One command to spin up all services: Laravel, Vue, MySQL, MongoDB, RabbitMQ, and phpMyAdmin.

🔐 JWT Authentication – Secure register, login, logout, and profile management.

💼 Portfolio Module – Manage projects with CRUD operations, statuses, and featured flags.

🛠️ Tech Stack
Layer	Technology
Backend	Laravel 10 (PHP-FPM)
Frontend	Vue 3 + Vite + TailwindCSS
Database (Write)	MySQL 8
Database (Read)	MongoDB 6
Message Broker	RabbitMQ 3 (with management UI)
Queue Worker	Laravel Queue Worker (domain-events, default)
Reverse Proxy	Nginx
Admin Tool	phpMyAdmin
📂 Architecture Overview
portfolio-cqrs-clean-architecture/
│
├── auth-system/              # Laravel backend (CQRS + API + Events)
│   ├── app/                  # Domain, Application, Infrastructure layers
│   ├── config/               # Laravel configuration
│   ├── graphql/              # GraphQL schemas
│   ├── routes/               # API + GraphQL routes
│   └── .env                  # Backend environment variables
│
├── vue-auth-system/          # Vue 3 frontend (Vite + Tailwind + Auth)
│   ├── src/                  # Components, pages, stores
│   ├── tests/                # Unit & integration tests
│   └── .env                  # Frontend environment variables
│
├── nginx/                    # Nginx reverse proxy configuration
│   └── default.conf
│
├── docker-compose.yml        # Main Docker stack configuration
└── README.md                 # Project documentation


✅ Provides eventual consistency, real-time synchronization, and clean modular separation.

🐳 Docker Setup
1️⃣ Clone the Repository
git clone https://github.com/thaeshwesin29/portfolio-cqrs-clean-architecture.git
cd portfolio-cqrs-clean-architecture

2️⃣ Copy Environment Variables
cp auth-system/.env.example auth-system/.env
cp vue-auth-system/.env.example vue-auth-system/.env

3️⃣ Start the Docker Stack
docker compose up --build -d

🌐 Exposed Services
Service	URL	Description
Laravel API	http://localhost:81
	Backend (API + GraphQL)
Vue Frontend	http://localhost:5174
	Vite Dev Server
phpMyAdmin	http://localhost:8083
	Manage MySQL Database
RabbitMQ UI	http://localhost:15673
	RabbitMQ Dashboard (guest/guest)
MongoDB	localhost:27017	Read Model Storage
MySQL	localhost:3308	Write Model Storage
Nginx	Ports 81 and 443	Reverse Proxy for Backend + Frontend
🔄 Data Flow Overview

Write Operation → Data written to MySQL (Write Model).

Domain Event → ModelChanged event dispatched.

RabbitMQ → Publishes event to the broker.

Worker → Listens and syncs data to MongoDB (Read Model).

Broadcast → Triggers ModelChangedBroadcast via Laravel Echo.

Vue Frontend → Reacts instantly and updates UI in real time.

✅ Includes automatic retries, error handling, and eventual consistency between services.

📦 Core Modules

Portfolio – CRUD for project management (title, description, status, featured).

Auth – Register, login, logout, JWT-based auth.

Real-Time UI – Instant updates across all user sessions.

🧠 Clean Architecture Principles

🧱 CQRS – Commands handle writes; Queries handle reads.

🧩 SOLID – Single Responsibility, Dependency Injection, and Clean Abstractions.

🔁 DRY – Reusable shared services across modules.

🔔 Event-Driven – RabbitMQ for decoupled asynchronous workflows.

🧪 Testing – Unit & Integration tests for core modules.

⚡ Developer Commands
Run Migrations + Seed
docker exec -it docker-stack-laravel-1 php artisan migrate:fresh --seed

View Worker Logs
docker logs -f docker-stack-laravel-worker-1

Access Laravel Tinker
docker exec -it docker-stack-laravel-1 php artisan tinker

🤝 Contributing

Fork this repository.

Create a new feature branch.

Submit a Pull Request (PR).


