#!/bin/bash

# Initialize Config Server
docker compose exec cfg1 mongosh --eval '
rs.initiate(
  {
    _id: "cfgrs",
    configsvr: true,
    members: [
      { _id: 0, host: "cfg1:27017" },
      { _id: 1, host: "cfg2:27017" },
      { _id: 2, host: "cfg3:27017" }
    ]
  }
)'

# Wait for config servers to initialize
sleep 10

# Initialize Shard 1
docker compose exec shard1a mongosh --eval '
rs.initiate(
  {
    _id: "shard1rs",
    members: [
      { _id: 0, host: "shard1a:27017" },
      { _id: 1, host: "shard1b:27017" },
      { _id: 2, host: "shard1c:27017" }
    ]
  }
)'

# Wait for shard initialization
sleep 10

# Add shard to cluster
docker compose exec mongos mongosh --eval '
sh.addShard("shard1rs/shard1a:27017,shard1b:27017,shard1c:27017");
sh.enableSharding("transport_db");
sh.shardCollection("transport_db.cities", { "_id": "hashed" });
sh.shardCollection("transport_db.districts", { "city_id": 1 });
sh.shardCollection("transport_db.stops", { "city_id": 1 });
sh.shardCollection("transport_db.routes", { "city_id": 1 });
sh.shardCollection("transport_db.vehicles", { "city_id": 1 });
'