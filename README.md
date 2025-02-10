# Installation and Setup Guide

This document outlines the steps to install, prepare, and run the classification model in your project. Be sure to follow each step carefully to ensure everything works correctly.

## Prerequisites

- Ubuntu server 22.04 or higher
- RAM Memory: 4 GB or more
- Cores: 2 vCPU or more
- Bandwidth: 1Gbps
- Internet access

# Build and start services
### Get source code and prepare installation permissions
- Clone source code repository
```bash
git clone --depth=1 https://github.com/GashpidPlatformDev/uksa-platform-services.git
```
- Go to source code path
```bash
cd uksa-platform-services
```
- Give permissions to run
```bash
sudo chmod +x install.sh
```
### Prepare system and build platform
- Run install.sh
```bash
sudo ./install.sh
```
During the installation process, the SSL/TLS certificate files will be opened where you should place your SSL/TLS values

# Manual Installation
### Update and Upgrade system
```bash
sudo apt update
sudo apt upgrade -y
```

### Install docker engine
```bash
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

sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin docker-compose -y
```

### Install Nginx
```bash
sudo apt install nginx -y
```

### Setup and configure your firewall
```bash
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 8080/tcp
sudo ufw allow 8444/tcp
sudo ufw allow 3306/tcp
sudo ufw allow 8080/tcp

sudo ufw --force enable
sudo ufw status verbose
```

### Add your SSL/TLS certificate
```bash
mkdir /etc/nginx/ssl

echo "# Add your SSL/TLS certificate" | cat - /etc/nginx/ssl/certificate.crt | sudo tee /etc/nginx/ssl/certificate.crt.tmp > /dev/null
sudo mv /etc/nginx/ssl/certificate.crt.tmp /etc/nginx/ssl/certificate.crt

echo "# Add your SSL/TLS key" | cat - /etc/nginx/ssl/certificate.key | sudo tee /etc/nginx/ssl/certificate.key.tmp > /dev/null
sudo mv /etc/nginx/ssl/certificate.key.tmp /etc/nginx/ssl/certificate.key

nano /etc/nginx/ssl/certificate.crt
nano /etc/nginx/ssl/certificate.key
```

### Copy Nginx config and enable services
```bash
sudo rm /etc/nginx/sites-enabled/default
cp moodle.conf /etc/nginx/sites-available/moodle
cp react-app.conf /etc/nginx/sites-available/react-app
sudo ln -s /etc/nginx/sites-available/moodle /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/react-app /etc/nginx/sites-enabled/

sudo nginx -t
sudo systemctl restart nginx
```

### Install Moodle
```bash
cd moodle || exit 1
docker-compose build
docker-compose up -d
cd - || exit 1
```

### Install react-app
```bash
cd website/docker || exit 1
docker-compose up --build -d
cd - || exit 1
```