#!/bin/bash

# Initialize config server
docker-compose exec config-server mongosh --port 27019 --eval '
rs.initiate({
  _id: "configrs",
  configsvr: true,
  members: [{ _id: 0, host: "config-server:27019" }]
})'

# Initialize shard1
docker-compose exec shard1 mongosh --port 27018 --eval '
rs.initiate({
  _id: "shard1rs",
  members: [{ _id: 0, host: "shard1:27018" }]
})'

# Initialize shard2
docker-compose exec shard2 mongosh --port 27018 --eval '
rs.initiate({
  _id: "shard2rs",
  members: [{ _id: 0, host: "shard2:27018" }]
})'

# Wait for mongos to be ready
echo "Waiting for mongos to become operational..."
until docker-compose exec mongos mongosh --port 27017 --eval "sh.status()" > /dev/null 2>&1
do
  sleep 5
done

# Configure sharding
docker-compose exec mongos mongosh --port 27017 --eval "
sh.addShard('shard1rs/shard1:27018');
sh.addShard('shard2rs/shard2:27018');
sh.enableSharding('public-transport');
sh.shardCollection('public-transport.cities', {_id: 1});
sh.shardCollection('public-transport.districts', {city_id: 1});"
