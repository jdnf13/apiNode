FROM node:14.20.0-alpine3.16

WORKDIR /home/david/Documentos/Repos/apiNode/
COPY . .
RUN npm install --production

CMD ["node","/home/david/Documentos/Repos/apiNode/src/index.js"]

