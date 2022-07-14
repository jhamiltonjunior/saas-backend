FROM node:17-alpine

WORKDIR /home/node/app
COPY package.json package-lock.json ./

RUN npm i

COPY . .

# RUN npm run build
RUN ls

EXPOSE 5001
# CMD ["npm", "run", "production"]
CMD ["npm", "start"]