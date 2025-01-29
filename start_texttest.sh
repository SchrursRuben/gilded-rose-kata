#!/bin/sh

export PATH="$(pwd)/venv/bin:$PATH"

if [ ! -d "venv" ]; then
    python3.12 -m venv venv
fi
venv/bin/pip install texttest
venv/bin/texttest -d . -con "$@"
