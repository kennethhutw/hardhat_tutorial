/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
const ALCHEMY_API_KEY="KEY";

const ROPSTEN_PRIVATE_KEY="";
module.exports = {
  solidity: "0.7.3",
  networks:{
    localhost:{
      url:"http://localhost:8545"
    },
    ropsten:{
      url:`https://eth-ropsten.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts:[`${ROPSTEN_PRIVATE_KEY}`]
    },
    rinkeby: {
      url: process.env.RINKEBY_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    }
  }
};
