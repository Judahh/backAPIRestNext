#! /bin/bash
while getopts p:db flag; do
  case "$flag" in
    p) port=$OPTARG ;;
    d) exec="dev" ;;
    b) exec="build" ;;
  esac
done

pwd=$PWD
cd "$pwd"

if [ -f ".env" ]; then
  echo ".env exists."
  export "$(cat .env | grep -v '#' | sed 's/\r$//' | awk '/=/ {print $1}')"
fi

port="${PORT:=3000}"

echo "setted Port: $port"

case $exec in
  "dev")
    node_modules/next/dist/bin/next -p "$port"
    ;;

  "build")
    node_modules/next/dist/bin/next build
    ;;

  "")
    node_modules/next/dist/bin/next start
    ;;
esac
