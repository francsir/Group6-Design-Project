FROM node:14

WORKDIR /frontend
COPY . .

COPY package*.json ./

RUN npm install
RUN npm install axios



EXPOSE 3000

CMD ["npm", "start"]
