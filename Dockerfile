FROM node:18-alpine AS builder 
RUN mkdir /app
ARG ENV_TYPE
# COPY .env.${ENV_TYPE} ./app/.env
COPY .env ./app/.env
COPY . /app
RUN cd app && npm install  && npm run build

FROM node:18-alpine
RUN mkdir /app
COPY --from=builder /app/.env /app/.env.file
COPY --from=builder /app/build /app/build
COPY --from=builder app/package.json /app/package.json /app/

RUN cd /app && npm install

WORKDIR /app

CMD ["node","build/index.js"]