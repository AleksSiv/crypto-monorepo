FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx tailwindcss -i ./app/globals.css -o ./public/tailwind.css --minify || true
RUN npm run build

CMD ["npm", "start"]
