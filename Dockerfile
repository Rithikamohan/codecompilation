#
# Base stage with Node.js
#
FROM node:14 AS base
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

#
# Development stage with GCC
#
FROM base AS development
RUN apt-get update && apt-get install -y build-essential

#
# Production stage
#
FROM base AS production
CMD ["npm", "index"]
