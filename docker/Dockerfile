FROM node:18.13.0

WORKDIR /usr/src/reeq-backend

# Copy files modules and configs
COPY package*.json ./
COPY nodemon.json ./
COPY tsconfig.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm i

#prisma init
RUN npx prisma generate

# Copy folder project
COPY . .

# Build
RUN npm run build

EXPOSE 8000

CMD ["node", "build/app.js"]
