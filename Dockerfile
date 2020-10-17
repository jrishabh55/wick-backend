FROM node:14

WORKDIR /usr/src/app

COPY . .

RUN yarn
RUN yarn build --prod
RUN mkdir build/tmp
RUN cd build

RUN export NODE_ENV="production"
RUN node ace migration:run

EXPOSE 3333

CMD ["node", "build/server.js"]
