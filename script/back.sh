#!/usr/bin/env sh
while getopts p:db flag
do
    case "$flag" in
        p) port=$OPTARG;;
        d) exec="dev";;
        m) exec="migrate";;
        b) exec="build";;
    esac
done

dist="${npm_package_config_path_dist:-.}"
server="${npm_package_config_path_server:-source/server.js}"
file=$dist/$server

pwd=$PWD
cd "$pwd";

if [ -f ".env" ]; then
    echo ".env exists."
    cat .env | grep -v '#' | grep PORT
    export "$(cat .env | grep -v '#' | grep PORT)"
fi

port="${PORT:=3000}"

echo "setted Port: $port"

case $exec in
  "dev")
    node_modules/next/dist/bin/next -p "$port";;

  "build")
    node_modules/next/dist/bin/next build;;

  "migrate")
    if test -f "$file"; then
      (node "$file" -m)
    else
      (node ./node_modules/@backapirest/express/script/migrate.mjs -f "$pwd")
    fi;;

  "")
    node_modules/next/dist/bin/next start;;
esac