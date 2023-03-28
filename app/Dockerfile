FROM node:18-alpine
EXPOSE $PORT

WORKDIR /src/app
RUN yarn install


ENTRYPOINT [ "yarn", "dev" ]