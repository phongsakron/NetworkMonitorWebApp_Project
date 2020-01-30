FROM node:latest as node
WORKDIR /ng-app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build


### STAGE 2: Setup ###

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=node /ng-app/dist/monitorweb /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


# docker run -it -p 8000:80 --name angudoc monitorweb:latestssss24    