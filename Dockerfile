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
COPY --from=development /usr/bin/gcc /usr/bin/gcc
WORKDIR /app/codes
COPY codes .
RUN gcc -o program 196b64bc-748f-4be1-9199-01b09e3b0154.cpp
CMD ["node", "index"]
