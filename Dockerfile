ARG IMAGE=node:16.13-alpine

#COMMON
FROM $IMAGE as build

WORKDIR /app
COPY ./package*.json .
RUN npm i
COPY . .
RUN npm run build


#PRODUCTION
FROM $IMAGE
WORKDIR /app
COPY ./package.json .
RUN npm install --only=production

COPY --from=build ./app/dist ./dist
CMD npm run start:prod

# stworzenie obrazu:
# docker image build -t megak-gameover-back:v1.0.0 .
# docker image build -t nazwaTwojegoKontaDockerHub/megak-gameover-back:v1.0.0 .

# testowe uruchomienie kontenera
# docker run -p 3000:3000 nazwaTwojegoKontaDockerHub/megak-gameover-back:v1.0.0

# wypchniecie obrazu na zewnętrzne repo
# docker image push nazwaTwojegoKontaDockerHub/megak-gameover-back:v1.0.0
