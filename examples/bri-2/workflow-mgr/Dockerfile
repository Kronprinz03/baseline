FROM node:14.17-alpine AS build

WORKDIR /app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
# Install packages
RUN npm ci

# Bundle app source
# See ignore for exclusions
COPY . .
RUN npm run tsc
RUN npm ci --production

# ! ATTACH DEBUGER TO LAUNCH
FROM alpine:3 as debug
RUN apk add nodejs --no-cache
RUN apk add --update npm
RUN npm install -g nodemon 
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

# Start
# CMD [ "node", "./dist/index.js" ]
ENTRYPOINT [ "nodemon","-L","--inspect=0.0.0.0:9229","./dist/index.js" ]
EXPOSE 5001
EXPOSE 9229

FROM alpine:3
RUN apk add nodejs --no-cache
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

# Start
CMD [ "node", "./dist/index.js" ]
EXPOSE 5001
