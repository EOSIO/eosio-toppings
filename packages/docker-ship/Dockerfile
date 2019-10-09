# This Dockerfile is unsupported. Please do not create any issues about Docker.

FROM ubuntu:19.04

RUN apt-get -y update
ENV DEBIAN_FRONTEND=noninteractive 
RUN apt-get -y install postgresql-server-dev-all build-essential git libssl-dev libboost-all-dev cmake libpqxx-dev ninja-build libgmp-dev
RUN apt-get -y install wget

WORKDIR /root
RUN git clone --recursive https://github.com/EOSIO/history-tools.git

WORKDIR /root/history-tools/
RUN git checkout empty-block-filter
RUN git submodule update --init --recursive
RUN mkdir /root/history-tools/build

WORKDIR /root/history-tools/build
RUN apt-get -y install libz-dev
RUN cmake .. -GNinja -DCMAKE_BUILD_TYPE=Release -DBOOST_ROOT=/usr
RUN ninja

WORKDIR /root/history-tools/
COPY ./scripts .
