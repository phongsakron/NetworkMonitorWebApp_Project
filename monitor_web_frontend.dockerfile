FROM node:12.16

RUN sed -i '/jessie-updates/d' /etc/apt/sources.list

RUN apt-get update
RUN apt-get install -y apache2 && apt-get clean

RUN npm i npm@latest -g && \
    npm i -g @angular/cli@latest
RUN mkdir -p /var/www/app

WORKDIR /var/www/app

COPY  --chown=root . /var/www/app
RUN npm i
# RUN npm rebuild node-sass

# RUN npm update

RUN ng build --prod --base-href ./

WORKDIR /var/www/html
RUN rm -fr /var/www/html/*
RUN cp -a /var/www/app/dist/monitorweb/. /var/www/html/

RUN a2enmod rewrite

ADD apache-config.conf /etc/apache2/sites-enabled/000-default.conf

EXPOSE 80
CMD apachectl -D FOREGROUND
