FROM node:10

# this will get set at build time
#ARG build_docker_tag_version=0.0.0-know-ankit-diary

LABEL maintainer="Ankit"

COPY . /usr/src/app/
RUN rm -f -r /usr/src/app/node_modules
WORKDIR /usr/src/app/
RUN npm install

EXPOSE 3000

ENTRYPOINT ["npm"]
CMD ["start"]
