const seedModel = async (Model, data) => {
  const { collectionName } = Model.collection;
  try {
    console.log(`---Seeding to ${collectionName} collection---`);

    await Model.insertMany(data);

    console.log(` ${data.length} document inserted to ${collectionName}`);
  } catch (err) {
    console.log('Inserteion failed!');
    console.log(err);
  }
};

const dropCollection = async (Model) => {
  const { collectionName } = Model.collection;
  try {
    await Model.deleteMany({});
    console.log(`---${collectionName} collection dropped---`);
  } catch (err) {
    console.log(`---${collectionName} collection drop failed---`);
  }
};

module.exports = {
  seedModel,
  dropCollection,
};
