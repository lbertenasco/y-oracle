const { Confirm } = require('enquirer');
const hre = require('hardhat');
const ethers = hre.ethers;

const prompt = new Confirm({
  message: 'Do you wish to deploy UniswapV3OracleWrapper contract?',
});

async function main() {
  await hre.run('compile');
  await promptAndSubmit();
}

function promptAndSubmit() {
  return new Promise(async (resolve) => {
    const [owner] = await ethers.getSigners();
    console.log('using address:', owner.address);
    try {
      prompt.run().then(async (answer) => {
        if (answer) {
          console.time('UniswapV3OracleWrapper deployed');
          
          const UniswapV3OracleWrapper = await ethers.getContractFactory(
            'UniswapV3OracleWrapper'
          );
          const uniswapV3OracleWrapper = await UniswapV3OracleWrapper.deploy();

          console.timeEnd('UniswapV3OracleWrapper deployed');

          console.log('UniswapV3OracleWrapper address:', uniswapV3OracleWrapper.address);
          console.log(
            'PLEASE: change .config.json & example.config.json oracle.uniswapV3OracleWrapper address to:',
            uniswapV3OracleWrapper.address
          );
          resolve();
        } else {
          console.error('Aborted!');
          resolve();
        }
      });
    } catch (err) {
      reject(err);
    }
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
