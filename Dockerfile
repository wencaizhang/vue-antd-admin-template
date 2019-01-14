FROM node:8-slim
RUN apt-get update && apt-get install -y nginx
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
WORKDIR /app
ADD package.json /app/package.json
RUN cnpm install
COPY . /app/
RUN rm /var/www/html/* -rf
RUN npm run build && mkdir /var/www/html -p && cp -r dist/* /var/www/html && rm -rf /app
COPY ./nginx.conf /etc/nginx/
ENTRYPOINT ["nginx"]