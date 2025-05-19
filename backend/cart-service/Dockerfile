# File: cart-service/Dockerfile
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package.json + yarn.lock
COPY package*.json ./
COPY yarn.lock ./

# Cài dependency
RUN yarn install

# Copy toàn bộ source
COPY . .

# Expose port của cart-service
EXPOSE 3003

# Command chạy dev (có thể đổi thành yarn start nếu dùng production)
CMD ["yarn", "start:dev"]
