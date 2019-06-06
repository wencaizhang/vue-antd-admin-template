FROM node:8-slim as builder

RUN npm config set registry https://registry.npm.taobao.org
WORKDIR /app
ADD package.json /app/package.json
RUN npm install
COPY . /app/
RUN npm run build

FROM nginx:alpine
RUN adduser -D -H -s /sbin/nologin www-data
COPY --from=builder /app/dist/ /var/www/html/
COPY ./nginx.conf /etc/nginx/
CMD ["nginx"]