// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "forge-std/Script.sol";
import "../src/ERC20Token.sol";

contract DeployMyTokenScript is Script {

    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        ERC20Token token = new ERC20Token();

        vm.stopBroadcast();
        console.log("ERC20Token desplegado en:", address(token));
    }
}

