#!/bin/bash

############################
# Update and Upgrade system
############################
echo "Installing system apps..."
sudo apt update
sudo apt upgrade -y


########################
# Install docker engine
########################
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


################
# Install Nginx
################
sudo apt install nginx -y


##################
# Install Node js
##################
sudo apt update && sudo apt upgrade -y
sudo apt install -y nodejs npm


####################################
# Setup and configure your firewall
####################################
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 8080/tcp
sudo ufw allow 8444/tcp
sudo ufw allow 3306/tcp
sudo ufw allow 8080/tcp

sudo ufw --force enable
sudo ufw status verbose


###############################
# Add your SSL/TLS certificate
###############################
mkdir /etc/nginx/ssl

echo "# Add your SSL/TLS certificate" | cat - /etc/nginx/ssl/certificate.crt | sudo tee /etc/nginx/ssl/certificate.crt.tmp > /dev/null
sudo mv /etc/nginx/ssl/certificate.crt.tmp /etc/nginx/ssl/certificate.crt

echo "# Add your SSL/TLS key" | cat - /etc/nginx/ssl/certificate.key | sudo tee /etc/nginx/ssl/certificate.key.tmp > /dev/null
sudo mv /etc/nginx/ssl/certificate.key.tmp /etc/nginx/ssl/certificate.key

nano /etc/nginx/ssl/certificate.crt
nano /etc/nginx/ssl/certificate.key


########################################
# Copy Nginx config and enable services
########################################
sudo rm /etc/nginx/sites-enabled/default
cp moodle.conf /etc/nginx/sites-available/moodle
cp backend.conf /etc/nginx/sites-available/backend
cp supabase.conf /etc/nginx/sites-available/supabase
cp react-app.conf /etc/nginx/sites-available/react-app
sudo ln -s /etc/nginx/sites-available/moodle /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/backend /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/supabase /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/react-app /etc/nginx/sites-enabled/

sudo nginx -t
sudo systemctl restart nginx


#################
# Clone supabase
#################
git clone --depth 1 https://github.com/supabase/supabase


#############################
# Copy supabase env file and
# generate keys for supabase
# moodle and website files
#############################
cp supabase/docker/.env.example supabase/docker/.env
chmod +x gen-passwords.sh
./gen-passwords.sh


#############################
# Build and install supabase
#############################
cd supabase/docker || exit 1
sudo nano .env
docker compose pull
docker compose up -d
cd - || exit 1


#################
# Install Moodle
#################
cd moodle || exit 1
sudo nano docker-compose.yml
docker-compose build
docker-compose up -d
cd - || exit 1


####################
# Install react-app
####################
cd website/docker || exit 1
sudo nano docker-compose.yml
docker-compose up --build -d
cd - || exit 1


######################
# Install email resend
######################
cd backend/docker || exit 1
sudo nano docker-compose.yml
docker-compose up --build -d
cd - || exit 1