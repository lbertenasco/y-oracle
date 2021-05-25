import { expect } from 'chai';
import { ethers, network } from 'hardhat';
import { e18, ZERO_ADDRESS } from '../../../utils/web3-utils';
import config from '../../../.config.json';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/dist/src/signer-with-address';

describe('UniswapV3OracleWrapper', () => {
  let owner: SignerWithAddress;

  before('Setup accounts and contracts', async () => {
    [owner] = await ethers.getSigners();
  });

  it('Should deploy on mainnet fork', async function () {
    const UniswapV3OracleWrapper = await ethers.getContractFactory(
      'UniswapV3OracleWrapper'
    );
    const uniswapV3OracleWrapper = await UniswapV3OracleWrapper.deploy();
    const univ3EthDaiPool = '0xc2e9f25be6257c210d7adf0d4cd6e3e881ba25f8';
    const weth = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';
    const dai = '0x6b175474e89094c44da98b954eedeac495271d0f';
    const amountIn = e18;
    const amountOut = await uniswapV3OracleWrapper.getAmountOut(
      univ3EthDaiPool, // address _pair, // uniswapv3 pool
      weth, // address _tokenIn,
      amountIn, // uint256 _amountIn,
      dai // address _tokenOut
    );
    console.log('amountOut:', amountOut.div(e18).toNumber());
  });
});
