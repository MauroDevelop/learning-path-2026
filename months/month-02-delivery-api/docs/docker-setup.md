# 🐳 Local Execution Guide with Docker

## 📦 About the API & Tech Stack

This API is designed for order, user, and product management in the food and beverage sector (Delivery). The entire environment has been packaged and optimized using Alpine Linux to ensure a lightweight and secure image.

**Main technologies:**

- **TypeScript**: Strict typing and safety.
- **Node.js & Express**: Runtime environment and web framework.
- **Prisma ORM**: Database modeling and management.
- **Bcrypt & JWT**: Password encryption and authentication.
- **Dotenv**: Environment variable management.

## 🛠️ Prerequisites

To build and run this container, you need to have one of the following options:

- **Docker Desktop**: Installed and running on your local machine.
- **GitHub Codespaces**: If you prefer using a Cloud Native environment directly in your browser without consuming your computer's resources.

## ⚙️ Environment Variables (.env)

Before spinning up the container, it is mandatory to create an empty file named `.env` in the root of the project. This file will contain the sensitive credentials and configurations the API needs to work.

**Structure example:**

```env
# Server
PORT=3000

# Database (Prisma)
DATABASE_URL=mysql://user:password@localhost:3306/delivery_db

# JWT Auth
JWT_SECRET=write_a_super_secure_secret_here_to_sign_tokens

# Cloudinary (Image Uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

⚠️ IMPORTANT NOTE

Environment variables in this file MUST NOT have single ('') or double ("") quotes.

Why? Unlike the local environment, when we inject the .env file into the container, Docker reads the text literally. If you use quotes, Docker will include them as part of the value (e.g., "3000"), which will cause critical errors and crash the application.

## Image Build

To "bake" or build our API image based on the Dockerfile, you must open your terminal in the root of the project and run the following command:

```bash
docker build -t delivery-api .
```
## Command explanation:

**docker build**: Reads our Dockerfile line by line and executes its instructions to create the static image.

**-t delivery-api**: The `-t` (Tag) flag allows us to name or tag our image with a human-readable name (`delivery-api`) instead of a hard-to-remember alphanumeric code.

**.** (dot): Tells Docker that the "build context" is the current directory. That is, it will look for the Dockerfile and all source code files exactly in the folder where you are standing.

---

## Container Execution (Run)

To spin up the container we will use the following command:

```bash
docker run --name delivery-container --env-file .env -p 3000:3000 delivery-api
```

## Command Breakdown

- **`--name delivery-container`**: Assigns a specific and easy-to-remember name to our running container.

- **`--env-file .env`**: Injects all environment variables from our local file directly into the container's operating system.

- **`-p 3000:3000`**: Maps the ports following the `[HOST_PORT]:[CONTAINER_PORT]` rule. It opens a "tunnel" from port 3000 on your physical computer to the isolated port 3000 of the container (the latter must match the `PORT` defined in your `.env`).

- **`delivery-api`**: It's the name of the base image we just built and will use as a template.

---

## Stopping and Cleaning the Container

In case you need to destroy the container (for example, if you updated the code and need to build a new image) or if something went wrong and you want to restart it, run the following command:

```bash
docker rm -f delivery-container
```

Through this flag, we force the removal. This allows us to stop and delete the container at the same time in a single step, eliminating the need to run the `docker stop` command first.
