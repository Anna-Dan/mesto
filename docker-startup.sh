#!/bin/bash
docker run --rm -d --name npm-builder -p 8080:8080 -v  $(pwd):/opt/build node:lts-alpine3.15 sleep inf
docker exec -i npm-builder sh < container-startup.sh
docker exec -it npm-builder sh
