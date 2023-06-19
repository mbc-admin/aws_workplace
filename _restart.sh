#!/bin/bash
sleep 2
port=3003
port_info=$(ss -lptn "sport = :$port" | awk 'END{print $6}' | cut -d "," -f 2 | sed "s/pid=//")

if [ ! -z $port_info ] && [ "$port_info" != "Peer" ] && [ "$port_info" -eq "$port_info" ]
then
    echo "Killing process $port_info"
    kill -9 $port_info
    sleep 2
    echo "Starting node server"
    PORT=$port npm start
else
    echo "No process found port $port"
    PORT=$port npm start
fi

exit 0
