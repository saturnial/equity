module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 7545, // ganache-gui
      // port: 8545, // ganache-cli
      network_id: "*" // Match any network id
    }
  }
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
};
