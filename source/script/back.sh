#! /bin/bash
while getopts p:db flag
do
    case "${flag}" in
        p) port=${OPTARG};;
        d) exec="dev";;
        b) exec="build";;
    esac
done

port="${PORT:-port}"

echo "Starting server... (port: ${port}) (dist: ${dist}) (server: ${server}) (exec: ${exec})"
case $exec in
  "dev")
    node_modules/next/dist/bin/next -p $port;;

  "build")
    node_modules/next/dist/bin/next build;;

  *)
    node_modules/next/dist/bin/next start;;
esac