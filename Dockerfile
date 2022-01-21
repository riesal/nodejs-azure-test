FROM debian:jessie

# update container packages
RUN apt-get update --fix-missing
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libxml2-dev \
    wget \
    apt-utils \
    sudo \
    vim.tiny \
    net-tools

# fix the localisation
RUN dpkg-reconfigure -f noninteractive tzdata

# set environment
ENV LC_ALL C.UTF-8

# install nodejs 4xx
RUN wget -qO- https://deb.nodesource.com/setup_4.x | sudo -E bash -
RUN apt-get install -y nodejs

# install gulp
RUN npm install gulp -g

# create app directory
RUN mkdir -p /opt/phoenix
WORKDIR /opt/phoenix

# install app dependencies
COPY package.json /opt/phoenix/
RUN npm install -g

# bundle app source
COPY . /opt/phoenix/

# cleanup
RUN apt-get clean && apt-get clean all
RUN rm -rf /var/cache/apt/archives/

EXPOSE 8080
CMD [ "npm", "start" ]
