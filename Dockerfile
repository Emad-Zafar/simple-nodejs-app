FROM node:16

WORKDIR /myapp

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "test"]