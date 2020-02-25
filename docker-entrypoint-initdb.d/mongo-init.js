let test = [
    {
      "name": "jvn",
      "score": 1234,

    },
    {
      "name": "Ivn",
      "score": 4321,

    }
  ];


db.createCollection('highscore');
const usersCollection = db.getCollection('highscore');

for (let t of test)
  usersCollection.insert(t);