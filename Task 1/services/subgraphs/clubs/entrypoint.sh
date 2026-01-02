#!/bin/bash

# This exports the schema so the Gateway can see it
strawberry export-schema main > schema.graphql

# Copy it to the shared volume so the Gateway knows the structure
cp ./schema.graphql /subgraphs/clubs.graphql

# Start the server on port 80
uvicorn main:app --host 0.0.0.0 --port 80