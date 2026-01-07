---
title: "Setting up SSH on a Linux Server"
date: 2025-12-24 01:45:00 -0500
tags: [homelab, security, linux]
description: "A quick guide on setting up a reverse proxy 'Nginx' up and running securely."
---

When getting a new Linux server or VM ready for remote access, setting up Nginx (reverse proxy) is one of the first tasks. Here’s a quick guide to get you started securely.

# 🚀 Quick-Start Guide: Reverse Proxy Setup with Nginx  

## **Overview**  
This guide walks you through setting up **Nginx as a reverse proxy**, which forwards incoming HTTP/HTTPS requests to a local service (e.g., FastAPI running on `localhost:8000`). This is common for securing, scaling, or managing backend services.  

---

## **1. Install Nginx**  
```bash
sudo apt update
sudo apt install nginx -y
```

- Verify installation:
  ```bash
  systemctl status nginx
  ```

---

## **2. Configure the Reverse Proxy**  
### 📄 Create a New Config File  
Create a configuration file for your domain (e.g., `yourdomain.com`) in `/etc/nginx/sites-available/`:

```bash
sudo nano /etc/nginx/sites-available/yourdomain.com
```

### ✏️ Paste This Example Configuration  
Replace `yourdomain.com` and the backend service (`localhost:8000`) with your actual domain and app:

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:8000;  # Forward requests to your app
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 🔗 Enable the Config File  
Link it to Nginx’s active config directory:

```bash
sudo ln -s /etc/nginx/sites-available/yourdomain.com /etc/nginx/sites-enabled/
```

---

## **3. Test & Reload Nginx**  

- Check for syntax errors:
  ```bash
  sudo nginx -t
  ```

- Apply changes:
  ```bash
  sudo systemctl reload nginx
  ```

---

## **4. Verify It Works**  
Make sure your backend service is running (e.g., FastAPI on `localhost:8000`).  

### ✅ Test with `curl` or a Browser  
Visit `http://yourdomain.com` in your browser or run:
```bash
curl http://yourdomain.com
```

You should see the output from your backend app!

---

## **5. (Optional) Secure with HTTPS Using Let’s Encrypt**  

### 🔐 Install Certbot & Obtain Certificate  
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com
```

- Follow the prompts (agree to terms, select email).
- Nginx will be automatically configured for HTTPS.

### ✅ Verify HTTPS Works  
Visit `https://yourdomain.com` and ensure you see a secure connection (lock icon).

---

## **6. Common Checks & Fixes**  

- 🔧 If Nginx fails:  
  ```bash
  sudo systemctl status nginx
  sudo tail -n 20 /var/log/nginx/error.log
  ```

- 🔄 Ensure your backend app is listening on the correct port (e.g., `localhost:8000`).

- 🔓 Open firewall ports if needed:
  ```bash
  sudo ufw allow 'Nginx'
  ```

---

## **7. Done!**  
You now have a working reverse proxy with Nginx, ready to serve your app securely over HTTP or HTTPS.

💡 Next steps: Set up automatic SSL renewal (`sudo certbot renew --dry-run`) or explore advanced config options like rate limiting or caching.