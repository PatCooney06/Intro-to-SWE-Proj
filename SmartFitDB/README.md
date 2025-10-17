# SmartFit – Local Setup Guide

This README explains how to set up PostgreSQL and pgAdmin locally using Docker.

# Prerequisites
- Docker Desktop   
- Git installed

# Environment
Example environment file and then create your local one:
- Windows: "copy .env.example .env" (Mac/Linux: cp instead of copy)

Verify ".env" includes:
DB_USER=admin  
DB_PASSWORD=admin123  
DB_NAME=smartfit  
PGADMIN_EMAIL=admin@admin.com  
PGADMIN_PASSWORD=admin123  

# Start Database and pgAdmin
Run: "docker compose up -d"
This starts:
- PostgreSQL (port 5432)
- pgAdmin (port 5050)

# Open pgAdmin
Go to http://localhost:5050  
Login with:  
Email: admin@admin.com  
Password: admin123  

Add a new server:  
- Name: SmartFitDB  
- Host: db  
- Port: 5432  
- Username: admin  
- Password: admin123  

This creates the "smartfit" database.

# Create Tables
In pgAdmin, open Tools then Query Tool then paste the contents of "schema.sql" and then click execute.  
The tables that should be created are: users, wardrobe_items, wishlist_items, outfits, outfit_items.

# Add Sample Data
In pgAdmin Query Tool, run:  
INSERT INTO users (name, email, password_hash)  
VALUES ('Demo User', 'demo@smartfit.app', 'placeholder_hash');

# Restart or Reset
Restart: "docker compose restart"  
Reset which will wipe data: "docker compose down -v" and "docker compose up -d"

# Troubleshooting
- pgAdmin not opening then try making sure Docker is running or try http://127.0.0.1:5050  
- pgAdmin connection fails then try use Host = db instead of localhost
- Schema missing then try rerunning schema.sql in Query Tool  
- Changed .env not applied then try "docker compose down -v" and "docker compose up -d"
- Containers stuck then try "docker rm -f postgres-db pgadmin"
