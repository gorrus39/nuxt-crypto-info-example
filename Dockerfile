FROM node:18-alpine

WORKDIR /app

# Установка pnpm
RUN npm install -g pnpm

COPY pnpm-lock.yaml ./
COPY package.json ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

EXPOSE 3000

CMD ["pnpm", "run", "start"]
