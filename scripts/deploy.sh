#!/bin/bash
npm run build

openssl aes-256-cbc -K $encrypted_a9337adee03a_key -iv $encrypted_a9337adee03a_iv -in deploy_key.enc -out deploy_key -d

rm deploy_key.enc
chmod 600 deploy_key
mv deploy_key ~/.ssh/id_rsa

scp ./dist/rs-bumblebee.js "$USERNAME@$SERVER_ADDRESS:/home/$USERNAME/rs-bumblebee/"
ssh "$USERNAME@$SERVER_ADDRESS" ./rs-bumblebee/run.sh

exit
