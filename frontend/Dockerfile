FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

ENV NODE_OPTIONS="--max-old-space-size=1536"
RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

RUN echo "    location / {                               \
                root   /usr/share/nginx/html;            \
                index  index.html index.htm;             \
                try_files \$uri \$uri/ /index.html;      \
            }" > /etc/nginx/conf.d/default.conf

EXPOSE 80

RUN adduser -D nonroot && \
    chown -R nonroot:nonroot /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html && \
    chown -R nonroot:nonroot /var/cache/nginx && \
    chown -R nonroot:nonroot /var/log/nginx && \
    touch /var/run/nginx.pid && \
    chown -R nonroot:nonroot /var/run/nginx.pid

USER nonroot

CMD ["nginx", "-g", "daemon off;"]