FROM node:18
#node:18-alpine
RUN npm install -g nodemon
WORKDIR /app
COPY package.json .
RUN npm install
#    && \
#    npm rebuild bcrypt --build-from-source
# If you are building your code for production
# RUN npm ci --omit=dev
COPY . .
EXPOSE 5001
CMD ["npm", "run", "dev"]