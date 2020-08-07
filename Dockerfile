FROM node:14

WORKDIR /usr/src/app

COPY . .

RUN yarn
RUN yarn build --prod
RUN mkdir build/tmp
RUN touch build/tmp/db.sqlite3
RUN cd build && node ace migration:run

EXPOSE 3333

CMD ["node", "build/server.js"]
