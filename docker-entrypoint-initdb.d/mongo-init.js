let test = [
    {
      "name": "jvn",
      "score": 1234,
      "date": "Tue Feb 25 2020 23:40:51 GMT+0000 (Coordinated Universal Time)"
    },
    {
      "name": "Ivn",
      "score": 4321,
      "date": "Tue Feb 25 2020 23:41:33 GMT+0000 (Coordinated Universal Time)"
    }
  ];


db.createCollection('highscore');
const usersCollection = db.getCollection('highscore');

for (let t of test)
  usersCollection.insert(t);
