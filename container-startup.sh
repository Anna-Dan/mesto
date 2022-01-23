#!/bin/sh
apk update
apk add openssh git nano
chmod 700 /root/.ssh || true
chmod 600 /tood/.ssh/id_ed25519 || true
git config --global user.name "Anna Danilenko"
git config --global user.email "danilenko.anna2016@yandex.ru"
