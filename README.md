# Installation and Project Setup Guide

This document outlines the steps to install, prepare, and run the classification model in your project. Be sure to follow each step carefully to ensure everything works correctly.

## Prerequisites

- Ubuntu server 24.04.1 or higher
- Internet access to install necessary dependencies.

## 1. Setting up sistem configuration

expliacion en inglés

### Steps to set up system configuration:
1. Update system dependecies:

    ```bash
    sudo apt update
    ```

2. Upgrade system dependencies:

    ```bash
    sudo apt upgrade -y
    ```

3. Install necessary dependecies:

    - Net tools

    ```bash
    sudo apt install net-tools -y
    ```

    - Git

    ```bash
    sudo apt install git -y
    ```

    - Docker enviroment

    ```bass
    # Add Docker's official GPG key:
    sudo apt-get update
    sudo apt-get install ca-certificates curl
    sudo install -m 0755 -d /etc/apt/keyrings
    sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
    sudo chmod a+r /etc/apt/keyrings/docker.asc

    # Add the repository to Apt sources:
    echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
    $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
    sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    sudo apt-get update

    sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y
    sudo apt install docker-compose
    ```

    - Nginx

    ```bash
    sudo apt install nginx -y
    ```
### Configure firewal rules
- Set new rules
    ```bash
    ufw allow 22/tcp
    ufw allow 80/tcp
    ufw allow 443/tcp
    ufw allow 81/tcp
    ufw allow 3010/tcp
    ufw allow 40000:40100/tcp
    ufw allow 40000:40100/udp

    # Check the status of firewall
    ufw status

    # Activate firewall
    ufw enable

    # Check again firewall status
    ufw status
    ```
### Configure Nginx
- Delete default nginx config
    ```bash
    sudo rm /etc/nginx/sites-enabled/default
    ```
- Create react-app config
    ```bash
    sudo nano /etc/nginx/sites-available/react-app
    ```
- Set react-app config
    ```bash
    server {
        listen 80;
        server_name www.uksaidiomas.com;

        location / {
            proxy_pass http://localhost:8081;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
    ```
    - Enable react-app config
    ```bash
    sudo ln -s /etc/nginx/sites-available/react-app /etc/nginx/sites-enabled/
    ```

- Create moodle config
    ```bash
    sudo nano /etc/nginx/sites-available/moodle
    ```
    - Set moodle config
    ```bash
    server {
        listen 80;
        server_name classrooms.uksaidiomas.com;

        location / {
            proxy_pass http://localhost:8080;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
    ```
    - Enable moodle config
    ```bash
    sudo ln -s /etc/nginx/sites-available/moodle /etc/nginx/sites-enabled/
    ```

- Create supabase config
    ```bash
    sudo nano /etc/nginx/sites-available/supabase
    ```
    - Set supabase config
    ```bash
    server {
        listen 80;
        server_name api.uksaidiomas.com;

        location / {
            proxy_pass http://localhost:8000;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
    ```
    - Enable supabase config
    ```bash
    sudo ln -s /etc/nginx/sites-available/supabase /etc/nginx/sites-enabled/
    ```
    
- Check the configuration (optional)

    ```bash
    sudo nginx -t
    ```

- Restart Nginx to apply the changes

    ```bash
    sudo systemctl restart nginx
    ```

## 2. Build Project
1. Clone project and active sh scripts

    ```bash
    git clone https://github.com/GashpidPlatformDev/uksa-platform.git
    ```

    - go to folder path

    ```bash
    cd uksa-platform/scripts
    ```

    - give execute permissions

    ```bash
    chmod +x build-docker.sh
    chmod +x stop-services.sh
    chmod +x start-services.sh
    ```

2. Build the docker compose instances

    ```bash
    sudo ./build-docker.sh
    ```

## 2. Start & Stop services

1. Start services

    ```bash
    sudo ./start-services.sh
    ```

2. Stop services

    ```bash
    sudo ./stop-services.sh
    ```

---
# Manual Installation
## 1. Mount Nginx proxy manager
- Crate nginex proxy manager path
    ```bash
    mkdir ~/nginx-proxy-manager
    cd ~/nginx-proxy-manager
    ```
    - Create docker compose file
```bash
version: '3'

services:
  nginx-proxy-manager:
    image: jc21/nginx-proxy-manager:latest
    container_name: nginx-proxy-manager
    restart: always
    ports:
      - "80:80"
      - "443:443"
      - "81:81"  # Puerto de administración
    volumes:
      - ./data:/data
      - ./letsencrypt:/etc/letsencrypt
    environment:
      DB_SQLITE_FILE: "/data/database.sqlite"
```
- Build & start service
    ```bash
    docker-compose up -d
    ```
    You can login as admin using default credentials:
    - User: admin@example.com
    - Password: changeme
## 2. Mount website
- Go to website doker folder
    ```bash
    cd website/docker
    ```
- Run & build docker compose
    ```bash
    docker-compose up --build -d
    ```
## 3. Mount supabase
- Clone repository
    ```bash
    git clone --depth 1 https://github.com/supabase/supabase
    ```
- Go to supabase docker folder
    ```bash
    cd supabase/docker
    ```
- Copy enviroment variables
    ```bash
    cp .env.example .env
    ```
- Pull supabase
    ```bash
    docker compose pull
    ```
- Run compose
    ```bash
    docker compose up -d
    ```
## 4 Mount moodle
- Go to moodle folder
    ```bash
    cd moodle
    ```
- Build compose
    ```bash
    docker-compose build
    ```
- Start compose
    ```bash
    docker-compose up -d
    ```
## Additional Notes:
1.  If you want modify the website follow these steps
    - Install react-scripts
    ```bash
    npm i -g react-scripts
    ```
    - Install dependencies
    ```bash
    npm install
    ```
    - Start
    ```bash
    npm start
    ```
    - Build
    ```bash
    npm run build
    ```

- 
- 

```bash
echo 'deb htts://download.jitsi.org stable/' | sudo tee /etc/apt/sources.list.d/jitsi-stable.list (edit https removed letters)

wget -qO -  htts://download.jitsi.org/jitsi-key.gpg.key | sudo apt-key add - (edit https removed letters)

sudo apt install apt-transport-https

systemctl status jitsi-videobridge2

sudo ufw enable
sudo ufw allow 80/tcp 
sudo ufw allow 443/tcp
sudo ufw allow 10000/udp
sudo ufw allow 22/tcp
sudo ufw allow 3478/udp
sudo ufw allow 5349/tcp
sudo ufw enable
```