# Update system and install essentials
apt update && apt upgrade -y && \
apt install -y git curl build-essential ufw && \
ufw allow ssh && \
ufw allow http && \
ufw allow https && \
ufw --force enable && \
# Install Node.js 20 LTS and npm
curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
apt install -y nodejs && \
# Verify installation
node -v && npm -v && \
# Prepare project folder
mkdir -p /var/www && cd /var/www && \
git clone https://github.com/Laudkyle/BPSL.git && \
cd BPSL && \
# Install React project dependencies
npm install
npm run build
sudo apt install -y nginx
sudo systemctl enable --now nginx
sudo nano /etc/nginx/sites-available/bpsl_website
"""
server {
    listen 80;
    server_name _;

    root /var/www/BPSL/build;
    index index.html;

    location / {
        try_files $uri /index.html;
    }
}

"""

sudo ln -s /etc/nginx/sites-available/bpsl_website /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx


sudo apt install -y certbot python3-certbot-nginx

### Move the domain to your Droplet

Change the A record for bestpointgh.com and www.bestpointgh.com -> point it to the Droplet IP on sitegrounds.
216.198.79.1 -> 138.68.158.54 (www.bestpointgh.com)
216.198.79.1 -> 138.68.158.54 (bestpointgh.com)

sudo certbot --nginx -d bestpointgh.com -d www.bestpointgh.com