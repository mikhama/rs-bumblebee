# rs-bumblebee &middot; [![GitHub license](https://img.shields.io/github/license/mikhama/rs-bumblebee)](https://github.com/mikhama/rs-bumblebee/blob/master/LICENSE) [![TravisCI Status](https://travis-ci.org/mikhama/rs-bumblebee.svg?branch=master)](https://travis-ci.org/mikhama/rs-bumblebee)

⚠️ ⚠️ ⚠️ **Moved permanently to [rsschool-app](https://github.com/rolling-scopes/rsschool-app)!** ⚠️ ⚠️ ⚠️

RS Bumblebee is a bridge bot for transfer messages from Discord to Telegram created especially for the Rolling Scopes School

## Developing
These librares are using for developing:
- [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api/blob/master/doc/api.md)
- [discord.js](https://discord.js.org/#/docs/main/stable/general/welcome)

## How to setup encrypted keys for deploy?
**Note:** All the steps should be made in the folder in which `.travis.yml` is placed.
1. Generate ssh keys for travis:
    ```
    ssh-keygen -t rsa -b 4096 -C 'build@travis-ci.org' -f ./deploy_key
    ```
2. Setup [travis cli](https://docs.travis-ci.com/user/encryption-keys/). You can use `gem`:
    ```
    gem install travis 
    ```
3. Add private key to `.travis.yml` and encrypt it:
    ```
    travis login
    travis encrypt-file deploy_key --add
    ```
    **Note:** this operation cannot be perfpormed on Windows, due to [the issue](https://github.com/travis-ci/travis-ci/issues/4746). You should use Linux or MacOS.

4. Copy open key to remote server:
    ```
    ssh-copy-id -i deploy_key.pub user@host
    ```
5. Delete open and private keys:
    ```
    rm -f deploy_key deploy_key.pub
    ```
6. Add encrypted file to `.git`:
    ```
    git add deploy_key.enc
    ```
