const redis = require('redis');
const promisify = require('util').promisify;

class RedisClient {
  constructor() {  
    this.client = redis.createClient();
    this.client.on('error', (err) => {
      console.log(err);
    });

    const isAlive = () => {
      return this.client.connected;
    }

    const get = async (key) => {
      const getKey = promisify(this.client.get).bind(this.client);
      return getKey(key);
    }

    const set = async (key, value, duration) => {
      const setKey = promisify(this.client.set).bind(this.client);
      return setKey(key, value, 'EX', duration);
    }

    const del = async (key) => {
      const delKey = promisify(this.client.del).bind(this.client);
      return delKey(key);
    }
  }
}

const redisClient = new RedisClient();

module.exports = redisClient;