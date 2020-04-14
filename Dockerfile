FROM node:13.8 as build

WORKDIR /app
COPY package.json /app
COPY package-lock.json /app

ARG npm_token
ENV NPM_TOKEN $npm_token
RUN echo "//npm.pkg.github.com/:_authToken="$NPM_TOKEN > /app/.npmrc
RUN echo "registry=https://npm.pkg.github.com/gtoru" >> /app/.npmrc

RUN npm install

COPY . /app

RUN npm run build

FROM nginx:1.17.8-alpine as deploy

COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
