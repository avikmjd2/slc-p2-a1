#!/bin/bash
echo "Waiting for subgraphs to export schemas..."
sleep 10
npx rover supergraph compose --skip-update --config ./composer/supergraph.yml > supergraph.graphql \
    && npm start
