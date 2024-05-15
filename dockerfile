FROM node:22-alpine3.18 AS builder

USER node

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY --chown=node . .
# Building the production-ready application code - alias to 'nest build'
RUN yarn install --frozen-lockfile --production

FROM node:22-alpine3.18

USER node

WORKDIR /home/node/app

COPY --from=builder --chown=node /home/node/app/node_modules ./node_modules
# Copying the production-ready application code, so it's one of few required artifacts
COPY --from=builder --chown=node /home/node/app/dist ./dist
COPY --from=builder --chown=node /home/node/app/views ./views
COPY --from=builder --chown=node /home/node/app/package.json .

EXPOSE 3000

CMD [ "yarn", "start" ]