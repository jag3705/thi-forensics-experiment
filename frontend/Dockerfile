FROM node:18-slim as build

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY . .

# Install deps
RUN npm install
# Do the TypScript compilation
RUN npm run build


# Run Stage
FROM registry.lets-byte.it/byteit/docker/nginx-angular-alpine:1.21
WORKDIR /var/www/html/web

COPY --from=build  /usr/src/app/dist/thi-app .

CMD ["nginx", "-g", "daemon off;"]

