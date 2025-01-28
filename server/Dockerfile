FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN apk add --no-cache python3 make g++ bash \
    && npm install --only=production \
    && apk del python3 make g++ bash \
    && rm -rf /tmp/* /root/.npm

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
