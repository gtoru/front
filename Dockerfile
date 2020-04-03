FROM node:13.8 as build

WORKDIR /app
COPY package.json /app
COPY package-lock.json /app
RUN npm install

COPY . /app

FROM nginx:1.17.8-alpine as deploy

COPY --from=build /app /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]