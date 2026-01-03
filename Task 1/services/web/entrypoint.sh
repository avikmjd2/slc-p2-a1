#!/bin/bash
# Remove existing link/folder if it exists to avoid conflicts
rm -rf /web/node_modules
# Link the cached modules
ln -s /cache/node_modules /web/node_modules
exec "$@"