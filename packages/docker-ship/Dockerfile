# This Dockerfile is unsupported. Please do not create any issues about Docker.

FROM ubuntu:19.04

RUN apt-get -y update
ENV DEBIAN_FRONTEND=noninteractive 
RUN apt-get -y install postgresql-server-dev-all build-essential git libssl-dev libboost-all-dev cmake libpqxx-dev ninja-build libgmp-dev
RUN apt-get -y install wget

WORKDIR /root
RUN wget https://dl.bintray.com/boostorg/release/1.70.0/source/boost_1_70_0.tar.gz
RUN tar -zxvf boost_1_70_0.tar.gz
WORKDIR /root/boost_1_70_0
RUN ./bootstrap.sh --prefix=/usr/local/boost_1_70_0
RUN ./b2 install

WORKDIR /root
RUN git clone --recursive https://github.com/EOSIO/history-tools.git

WORKDIR /root/history-tools/
RUN git checkout empty-block-filter-2.0
RUN git submodule update --init --recursive
RUN mkdir /root/history-tools/build
COPY CMakeLists.txt .

WORKDIR /root/history-tools/build
RUN apt-get -y install libz-dev
RUN cmake .. 
WORKDIR /root/history-tools/build
RUN make fill-pg

WORKDIR /root/history-tools/
COPY ./scripts .
