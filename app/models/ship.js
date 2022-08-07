const { ObjectId } = require('mongodb');
const ships = require('../../lib/mongo-client');

class Ship {
  constructor(data) {
    this._id = data._id || ObjectId();
    this.name = data.name;
    this.speed = data.speed;
  }

  static async getAll() {
    return ships.find({}).toArray();
  }

  async save() {
    const result = await ships.insertOne(this);
    if (result.acknowledged) {
      return this.toJSON();
    } else {
      throw new Error(`Could not save ship with id: ${this._id} into db`);
    }
  }

  static async removeAll() {
    return ships.deleteMany({});
  }

  toJSON() {
    return {
      _id: this._id.toString(),
      name: this.name,
      speed: this.speed,
    };
  }
}

module.exports = Ship;
