FROM node:13.8 as build

WORKDIR /app
COPY package.json /app
COPY yarn.lock /app

ARG npm_token
ENV NPM_TOKEN $npm_token
RUN echo "//npm.pkg.github.com/:_authToken="$NPM_TOKEN > /app/.npmrc
RUN echo "@gtoru:registry=https://npm.pkg.github.com" >> /app/.npmrc

RUN yarn install

COPY . /app

RUN yarn build

FROM nginx:1.17.8-alpine as deploy

COPY config/default.conf /etc/nginx/conf.d
COPY --from=build /app/build /etc/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
