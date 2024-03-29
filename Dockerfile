# Base image
FROM node:16

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install yarn and env-cmd
RUN npm install -g env-cmd

# Install package
RUN yarn

# Bundle app source
COPY . .

# Run migration
# RUN yarn typeorm migration:run -d src/configs/data-source.ts

# Creates a "dist" folder with the production build
RUN yarn build

# Start the server using the production build
CMD [ "node", "dist/main.js" ]
