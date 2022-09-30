#!/bin/bash

# RUN THIS BY HAND
mkdir p
cd p
python3 ../folder-gen.py | xargs
for f in $(python3 ../folder-gen.py); do cp ../index.html $f/; done

# Celebrate
