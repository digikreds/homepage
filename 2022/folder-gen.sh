#!/bin/bash

# RUN THIS BY HAND
mkdir p
cd p
python3 ../folder-gen.py | xargs
for f in $(python3 ../folder-gen.py); do cp ../wrong.html $f/index.html; done

cp ../solution.html 1845274336594385/index.html
cp ../letter.pdf 1845274336594385/letter.pdf
# Celebrate
