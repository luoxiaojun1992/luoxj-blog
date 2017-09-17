#! /bin/bash

ssh root@114.55.142.227 -l root 'supervisorctl stop luoxj-blog && cd ~/luoxj-blog && git pull && npm install && npm run build && supervisorctl start luoxj-blog'

if [ $? -eq 0 ]; then
    echo 'Build succeed'
else
    echo 'Build failed'
fi
