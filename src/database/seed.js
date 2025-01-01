require('dotenv').config();
const mongoose = require('mongoose');
const BusStop = require('./models/BusStop');
const Route = require('./models/Route');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const seedDatabase = async () => {
  try {
    await BusStop.deleteMany({});
    await Route.deleteMany({});

    const stop1 = await BusStop.create({
      name: 'Central Station',
      location: { city: 'City A', latitude: 40.7128, longitude: -74.0060 },
      routes: ['A1', 'B2'],
      facilities: ['Shelter', 'Bench'],
    });

    const stop2 = await BusStop.create({
      name: 'North Square',
      location: { city: 'City A', latitude: 40.7148, longitude: -74.0050 },
      routes: ['A1'],
      facilities: ['Bench'],
    });

    await Route.create({
      routeNumber: 'A1',
      citiesCovered: ['City A'],
      stops: [stop1._id, stop2._id],
      frequency: 4,
    });

    console.log('Database seeded successfully!');
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
