#!/bin/bash

echo "+++++ Start up +++++"
date

# Set PROMISC mode on eth0 to ON
ip link set dev eth0 promisc on
echo "eth0 set to PROMISC"
ip link set dev eth1 promisc on
echo "eth1 set to PROMISC"

service nginx start

echo "Webserver started"

# Run actual docker startup
exec "$@"