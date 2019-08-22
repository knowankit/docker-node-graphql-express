FROM node:10

COPY . /usr/src/app/
RUN rm -f -r /usr/src/app/node_modules
WORKDIR /usr/src/app/
RUN npm install

EXPOSE 4100

ENTRYPOINT ["npm"]
CMD ["start"]
