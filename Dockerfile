# Stage 1 - Build React App
FROM node:20-alpine as build

#set working directory
WORKDIR /app

#copying package.json and package-lock.json
COPY package*.json ./

#install dependencies
RUN npm install

#copy the rest of the application files
COPY . .

#build the react app
RUN npm run build

#stage 2 serve react app using nginx
FROM nginx:alpine

#copy built files from the previous stage
COPY --from=build  /app/dist /usr/share/nginx/html

#expose port 80
EXPOSE 80

#start nginx
CMD [ "nginx","-g","daemon off;" ]