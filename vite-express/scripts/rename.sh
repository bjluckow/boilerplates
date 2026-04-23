#!/bin/bash

if [ -z "$1" ]; then
  echo "Usage: ./scripts/rename.sh <project-name>"
  exit 1
fi

NAME=$1

# Root
sed -i '' "s/\"name\": \".*\"/\"name\": \"$NAME\"/" package.json

# Packages
for pkg in packages/*/package.json; do
  dir=$(basename $(dirname "$pkg"))
  sed -i '' "s/\"name\": \"@[^/]*\/$dir\"/\"name\": \"@$NAME\/$dir\"/" "$pkg"
done

# TSConfig paths
find packages -name "tsconfig*.json" -exec sed -i '' "s/@[^/]*\/shared/@$NAME\/shared/g" {} +

# Workspace scripts referencing package names
sed -i '' "s/@[^/]*\/server/@$NAME\/server/g" package.json
sed -i '' "s/@[^/]*\/client/@$NAME\/client/g" package.json

echo "Renamed to @$NAME/*"