FROM node:18.13.0

WORKDIR /usr/src/reeq-backend

# Copy files modules and configs
COPY package*.json ./
COPY package-lock.json ./
COPY nodemon.json ./
COPY tsconfig.json ./
COPY .env ./

# Add prisma schema
COPY ./prisma/schema.prisma ./prisma/schema.prisma

# Install dependencies
RUN npm ci

#prisma init
RUN npx prisma generate

## Push prisma schema to database
#RUN npx prisma db push

# Copy folder project
COPY . .


CMD ["npm", "run", "dev"]
