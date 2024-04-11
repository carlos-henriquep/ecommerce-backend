FROM node:latest

WORKDIR /api

COPY . .

RUN rm -rf .env
RUN rm -rf node_modules
RUN npm install


ENV DATABASE=ecommerce
ENV USER_DATABASE=postgres
ENV USER_PASSWORD=pHlp8ADe@puCHE9teSTo
ENV HOST=host.docker.internal
ENV PORT=5432
ENV SECRET_KEY=N3JpRDjyPV4XaC3Hn3WG9ajtbKEzrVvLwdrCkMynjzmkFULddb

CMD ["npm", "start"]

EXPOSE 3000