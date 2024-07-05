FROM node:22 AS base
WORKDIR /app
RUN apt update -y && apt upgrade -y
