const Ship = require('../models/ship');

const log = function log(data) {
  process.stdout.write(`${data}\n`);
};

class ShipService {
  static async getShips() {
    try {
      return Ship.getAll();
    } catch (error) {
      log(error);
      throw error;
    }
  }

  static async addShip(data) {
    try {
      const ship = new Ship(data);
      const result = await ship.save();
      return result;
    } catch (error) {
      log(error);
      throw error;
    }
  }
}

module.exports = ShipService;
