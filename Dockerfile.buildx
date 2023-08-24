# build stage
FROM --platform=$BUILDPLATFORM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM --platform=$TARGETPLATFORM nginx:stable-alpine as production-stage

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build-stage /app/dist /app
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
