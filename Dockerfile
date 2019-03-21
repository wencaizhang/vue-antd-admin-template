FROM node:8-slim
RUN apt-get update && apt-get install -y nginx
RUN npm install -g yarn --registry=https://registry.npm.taobao.org
WORKDIR /app
ADD package.json /app/package.json
RUN yarn
COPY . /app/
RUN rm /var/www/html/* -rf
RUN yarn build && mkdir /var/www/html -p && cp -r dist/* /var/www/html && rm -rf /app
COPY ./nginx.conf /etc/nginx/
ENTRYPOINT ["nginx"]