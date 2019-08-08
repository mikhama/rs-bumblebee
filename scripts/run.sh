#!/bin/bash
screen -S rs-bumblebee -p 0 -X quit
cd ~/rs-bumblebee
screen -dmS rs-bumblebee node rs-bumblebee
exit
