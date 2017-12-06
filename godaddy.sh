#!/bin/bash
GD_API=https://api.godaddy.com/v1

prefix=$1
domain=$2

[  -z "$1" ] && echo "Prefix required" && exit 1
[  -z "$2" ] && echo "Target subdomain required" && exit 1

echo -n "making GoDaddy request for ${prefix} to point to ${domain}... "
gd=$(curl -sX PATCH \
	-H "Authorization: sso-key ${GD_KEY}:${GD_SECRET}"\
	-H "Content-Type: application/json" \
	-d "[{\"name\": \"${prefix}\", \"data\": \"${domain}\", \"type\": \"CNAME\"}]"\
	${GD_API}/domains/outcome-hub.com.au/records/)
echo "done"