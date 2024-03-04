FROM node:18-alpine as builder

WORKDIR /app

COPY package.json package.json
COPY yarn.lock yarn.lock
COPY public public
COPY config config
COPY src src

RUN yarn install --pure-lockfile
RUN yarn build

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/package.json /app/yarn.lock ./
COPY --from=builder /app/public ./public/
COPY --from=builder /app/src ./src/
COPY --from=builder /app/config ./config/
COPY --from=builder /app/build ./build/

RUN yarn install --production --pure-lockfile

EXPOSE 80

CMD ["yarn", "start"]
