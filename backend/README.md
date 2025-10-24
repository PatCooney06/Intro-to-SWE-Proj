SmartFit Backend Setup Guide



This guide explains how to set up and run the SmartFit backend locally using Docker, PostgreSQL, Prisma ORM, and Node.js.



Tech Stack

Component	Purpose



Node.js / Express	Backend server handling API requests

PostgreSQL		Production database

SQLite			Lightweight local development database (optional)

Prisma ORM		Database schema, migrations, and query layer

Docker Compose		Containerized Postgres + pgAdmin setup

pgAdmin			Web interface to manage PostgreSQL visually

🧩 Prerequisites



You must have these installed before continuing:



Docker Desktop



Node.js (v18+) \& npm



Git



PostgreSQL CLI Tools (psql)



(for manual testing — optional if you use Docker only)



📦 Folder Structure

backend/

├── prisma/

│   └── schema.prisma        # Database schema

├── src/

│   └── index.js             # Express server entry point

├── .env                     # Local environment variables

├── .env.example             # Template for .env setup

├── package.json

├── prisma.config.js         # Prisma configuration (optional)

└── README.md



🔐 Environment Variables



Copy the example .env file to create your local version:



Windows:

copy .env.example .env



macOS/Linux:

cp .env.example .env





Then open .env and set your values:



DATABASE\_URL=postgresql://admin:admin123@127.0.0.1:5432/smartfit?schema=public

JWT\_SECRET=super\_secret\_key



🐳 Database Setup (Docker)



The database and pgAdmin run inside Docker containers for consistency.



1️⃣ Start Docker services



From the SmartFitDB/ directory:



docker compose up -d





This starts:



PostgreSQL (port 5432)



pgAdmin (port 5050)



2️⃣ Access pgAdmin



Open: http://localhost:5050



Login:



Email: admin@admin.com

Password: admin123





Then add a new server:



Name: SmartFitDB



Host: db



Port: 5432



Username: admin



Password: admin123



✅ You now have a local database called smartfit.



🧱 Running Prisma



Prisma handles migrations and models for your database.



1️⃣ Install dependencies



From the backend/ folder:



npm install



2️⃣ Generate Prisma client

npx prisma generate



3️⃣ Run initial migration

npx prisma migrate dev --name init





This creates your database tables automatically.



4️⃣ (Optional) View database in Prisma Studio

npx prisma studio





Then open http://localhost:5555

&nbsp;to browse data visually.



🚀 Run the Backend Server



From the backend/ folder:



node src/index.js





Expected output:



Server running on port 3001





Test in browser:



http://localhost:3001

&nbsp;→ ✅ should return “Backend is running!”



http://localhost:3001/test-db

&nbsp;→ ✅ should return \[] (empty array) if DB connection works



🧠 Common Commands

Action	Command

Restart DB containers	docker compose restart

Reset DB (wipe all data)	docker compose down -v \&\& docker compose up -d

Run migrations again	npx prisma migrate dev --name <name>

Open pgAdmin	http://localhost:5050



Open Prisma Studio	http://localhost:5555

🧰 Troubleshooting

Issue	Fix

P1000: Authentication failed	Run inside Docker container: ALTER USER admin WITH PASSWORD 'admin123';

Can’t connect to DB	Ensure docker ps shows 0.0.0.0:5432->5432

pgAdmin connection fails	Use Host = db instead of localhost

.env not loading	Run commands from inside the backend/ folder

Docker port blocked	Restart Docker Desktop or run Restart-Service com.docker.service

🤝 Team Workflow



Each team member should:



Clone the repository



Run docker compose up -d in SmartFitDB/



Copy .env.example → .env



Run npm install



Run npx prisma migrate dev to sync schema



✅ Everyone will then have the same local backend and database structure.

