# ============================
# Stage 1: Build (Vite)
# ============================
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies first (cache-efficient)
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

# Copy application source
COPY . .

# Build static assets
RUN npm run build


# ============================
# Stage 2: Runtime (Nginx)
# ============================
FROM nginx:alpine

# Remove default Nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy SPA-safe Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy only the built assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Standard HTTP port (internal only)
EXPOSE 80

# Run Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]