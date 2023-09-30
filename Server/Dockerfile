FROM node:18-alpine
RUN npm install -g nodemon
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
ENV DB_URL=''
ENV PORT=5001
ENV JWT_SECRET=''
EXPOSE 5001
CMD ["npm", "run", "dev"]