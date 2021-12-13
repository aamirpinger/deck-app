FROM node:14.18-alpine

WORKDIR /app

COPY package.json tsconfig.json ./

COPY src ./src

RUN npm install

RUN npm run build

FROM node:14.18-alpine

WORKDIR /app

COPY package.json ./

RUN npm install --only=production

COPY --from=0 /app/dist .

EXPOSE 5000

CMD ["node","index.js"]
