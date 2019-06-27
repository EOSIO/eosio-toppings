# This Dockerfile is unsupported. Please do not create any issues about Docker.

FROM ubuntu:19.04

RUN apt-get -y update
ENV DEBIAN_FRONTEND=noninteractive 
# RUN apt-get -y install build-essential sudo cmake libboost-all-dev git libssl-dev libpq-dev libpqxx-dev autoconf2.13 rustc cargo clang-7 nodejs npm ninja-build libgmp-dev liblmdb-dev
RUN apt-get -y install libpq-dev libpqxx-dev
RUN apt-get -y install wget

WORKDIR /root
RUN mkdir eosio.cdt

WORKDIR /root/eosio.cdt
COPY ./build .

COPY ./scripts .
COPY ./config.file .
COPY ./config.file.local .
