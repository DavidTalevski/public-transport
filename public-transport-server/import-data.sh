# 1. Drop collection manually
docker-compose exec mongos mongosh --port 27017 --eval "use public-transport; db.cities.drop()"

# 2. Recreate as sharded collection
docker-compose exec mongos mongosh --port 27017 --eval "
sh.shardCollection('public-transport.cities', { _id: 1 }, true);
db.adminCommand({ flushRouterConfig: 1 });"

docker-compose exec mongos mongorestore `
  --host localhost `
  --port 27017 `
  --nsInclude='public-transport.cities' `
  --dir=/docker-mongo-dump/public-transport/cities.bson `
  --numInsertionWorkersPerCollection=4 `
  --noIndexRestore `
  --noOptionsRestore

  # Check sharding status post-restore
docker-compose exec mongos mongosh --port 27017 --eval "
use public-transport;
db.cities.stats().sharded;
db.cities.getShardDistribution();"

