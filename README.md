# Contacts

This repository contains a full-stack Contacts web-application with a **Laravel backend** and a **React frontend**.

## Cloning the Repository

To get started, clone the repository to your local machine:

```sh
git clone https://github.com/mubashirzamir/contacts.git
cd contacts
```

## Prerequisites
Ensure you have the following installed on your system:
- **PHP** (>= 8.4.1)
- **Composer** (>= 2.8.3)
- **Node.js** (>= 23.8.0) 
- **npm** (>= 10.9.2)

## Project Structure
```sh
contacts/
│-- contacts-backend/   # Laravel API (Backend)
│-- contacts-frontend/  # React App (Frontend)
```

---

## Backend Setup (Laravel)

### 1. Install PHP & Composer
If PHP and Composer are not installed:
- **Windows Powershell:** 
```sh
# Run as administrator...
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://php.new/install/windows/8.4'))
```
- **macOS:**
```sh
/bin/bash -c "$(curl -fsSL https://php.new/install/mac/8.4)"
```
- **Linux:**
```sh
/bin/bash -c "$(curl -fsSL https://php.new/install/linux/8.4)"
```

### 2. Set Up Laravel Project
Navigate to the backend folder:
```sh
cd contacts-backend
```

Install dependencies:
```sh
composer install
```

### 3. Generate Application Key
```sh
php artisan key:generate
```

### 4. Run Migrations & Seed Database (Optional: Since the SQLite database is already seeded)
```sh
php artisan migrate:fresh --seed
```

### 5. Serve the Backend
Run the Laravel development server:
```sh
php artisan serve
```
Your API should now be running at: **http://localhost:8000**

---

## Frontend Setup (React)

### 1. Install Node.js & npm
If not installed:
- **Windows/macOS/Linux:** Install from [nodejs.org](https://nodejs.org/)

### 2. Set Up React Project
Navigate to the frontend folder:
```sh
cd ../contacts-frontend
```

Install dependencies:
```sh
npm install
```

### 3. Run the React App
Start the development server:
```sh
npm run dev
```
Your frontend should now be running at: **http://localhost:5173**

---

# **Deployment Instructions (DigitalOcean)**

## **1. Create a DigitalOcean Droplet**
1. Sign up or log in to [DigitalOcean](https://www.digitalocean.com/).
2. Click **Create → Droplets**.
3. Choose an **Ubuntu 22.04** image.
4. Select a Droplet size (at least **2GB RAM** recommended).
5. Add SSH keys or create a root password.
6. Click **Create Droplet** and note the **IP address**.

## **2. Connect to the Droplet**
Run the following command from your local machine:
```sh
ssh root@your_droplet_ip
```

## **3. Install Dependencies**
Update the system and install required dependencies:
```sh
apt update && apt upgrade -y
apt install -y nginx git curl unzip ufw
```

### **Install PHP and Composer (for Laravel)**
```sh
/bin/bash -c "$(curl -fsSL https://php.new/install/linux/8.4)"

```

### **Install Node.js and npm (for React)**
```sh
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs
```

## **4. Clone the Repository**
```sh
cd /var/www
git clone https://github.com/your-username/contacts.git
cd contacts
```

## **5. Setup Laravel Backend**
```sh
cd contacts-backend
cp .env.example .env
composer install
php artisan key:generate
```

### **Configure Environment Variables**
Edit the `.env` file and set up database connection, application URL, and other settings.

### **Setup Database**
1. Run Laravel migrations:
   ```sh
   php artisan migrate --seed
   ```
2. Start Laravel server:
   ```sh
   php artisan serve --host=0.0.0.0 --port=8000 &
   ```

## **6. Setup React Frontend**
```sh
cd ../contacts-frontend
cp .env.example .env
npm install
npm run build
```

## **7. Configure Nginx**
Create an Nginx config file:
```sh
nano /etc/nginx/sites-available/contacts
```

Paste the following:
```nginx
server {
    listen 80;
    server_name your_droplet_ip;

    location /api {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location / {
        root /var/www/contacts/contacts-frontend/dist;
        index index.html;
        try_files $uri /index.html;
    }
}
```

Activate the Nginx config:
```sh
ln -s /etc/nginx/sites-available/contacts /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

## **8. Setup Firewall**
```sh
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw enable
```

## **9. Access the Application**
- Visit `http://your_droplet_ip` to access the React frontend.
- API is available at `http://your_droplet_ip/api`.



