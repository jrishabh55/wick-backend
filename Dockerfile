FROM node:12.18.0

WORKDIR /usr/src/app

COPY . .

RUN npm i
RUN npm run build --prod
RUN mkdir build/tmp
RUN cd build

RUN export NODE_ENV="production"
RUN node ace migration:run

EXPOSE 3333

CMD ["node", "build/server.js"]
