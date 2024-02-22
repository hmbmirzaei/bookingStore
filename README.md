# bookingStore

# CRUD Test project for Booking

postman doc: http://serever_url/postman

## project descr:

### [ ] Coding Challenge (Node.js & MongoDB)
*Develop a Node.js service for library management using MongoDB as the database.*
1. [x] Implement CRUD operations for managing books and users.
2. [ ] Utilize MongoDB's aggregation framework for reports.
3. [x] Ensure proper error handling and validation.
4. [x] Use Express.js for HTTP requests.

### [x] Security Measures:
*Propose security measures for sensitive data protection.*
1. [x] Implement authentication and authorization using JSON Web Tokens (JWT).
2. [x] Ensure secure storage of sensitive data.
3. [x] Guard against security threats like injection attacks and XSS.

### [ ] Scalability and Performance:
*Discuss strategies for scaling the library management service.*
1. [ ] Describe horizontal and vertical scaling options for Node.js and MongoDB.
2. [x] Optimize MongoDB queries and indexes for performance.
3. [ ] Consider caching mechanisms and load balancing strategies.

### [ ] Database Design (MongoDB):
*Design MongoDB schema for storing book and user information.*
1. [x] Define collections and document structures for books.
2. [x] Define collections and document structures for users. 
3. [ ] Optimize schema for efficient querying and updating operations. 

### [x] Deployment on Ubuntu Server:
*Deploy the library management service on an Ubuntu server.*
1. [x] Install Node.js and MongoDB on the server.
    ```
    sudo apt update
    sudo apt install nodejs
    node -v
    sudo apt install npm

    sudo npm install pm2 -g

    sudo apt install nginx
    sudo ufw allow 'Nginx HTTP'

    sudo apt install redis-server
    sudo nano /etc/redis/redis.conf
    ------> supervised systemd
    ```
    

    ```
    sudo systemctl restart redis.service
    ```

2. [x] Configure Nginx as a reverse proxy.
    *nginx server block
    /etc/nginx/sites-available/bookingStore 

    ```
    server {
        listen 80;
        root /home/<USER>/bookingStore;
        server_name bookingStore.testdomain.id;
        location / {
            proxy_pass  http://localhost:8000;
            proxy_set_header Host $host;
            proxy_set_header X-Forwarded-For $remote_addr;
        }
    }
    ```
    ```
    sudo nginx -t
    nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
    nginx: configuration file /etc/nginx/nginx.conf test is successful
    ```

3. [x] Document the deployment process with configurations.
    ```
    cd ~/
    git clone https://github.com/hmbmirzaei/bookingStore
    cd bookingStore
    npm install
    pm2 start index.js
    pm2 save
    pm2 enable
    ```

### [x] API Documentation with Swagger:
*Create comprehensive API documentation using Swagger.*
Used Postman insted
1. [x] Generate Postman documentation for all API endpoints.
2. [x] Include request/response formats, authentication requirements, and examples.
3. [x] Ensure well-formatted and understandable documentation.

### [x] Version Control and GitHub:
*Commit code regularly to the provided GitHub repository.*
1. [x] Use the provided GitHub repository for version control.
2. [x] Make regular commits with meaningful messages.
3. [x] Organize codebase with clear folder structures and documentation

## Project folder structure:

```
project
└─── apis
└─── controller
└─── model
└─── middle_ware
└─── route_controller
└─── router
└─── schema
```