FROM node:8-slim as builder

RUN npm install -g yarn --registry=https://registry.npm.taobao.org
WORKDIR /app
ADD package.json /app/package.json
RUN chmod a+rwx  /usr/local/lib/node_modules/yarn/bin/yarn* \
  && chmod a+rwx  /usr/local/bin/yarn* \
  && yarn
COPY . /app/
RUN npm build

FROM nginx:alpine
RUN adduser -D -H -s /sbin/nologin www-data
COPY --from=builder /app/dist/ /var/www/html/
COPY ./nginx.conf /etc/nginx/
CMD ["nginx"]