// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/ERC20Token.sol";

contract MyTokenTest is Test {
    ERC20Token public token;
    address public owner;
    address public addr1;
    address public addr2;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    function setUp() public {
        owner = address(this); // The test contract is the deployer
        addr1 = address(0x1);
        addr2 = address(0x2);

        token = new ERC20Token();
    }

    function testInitialRoles() public {
        // The deployer should have DEFAULT_ADMIN_ROLE and MINTER_ROLE
        assertTrue(token.hasRole(token.DEFAULT_ADMIN_ROLE(), owner));
        assertTrue(token.hasRole(MINTER_ROLE, owner));
    }

    function testMintByMinter() public {
        uint256 amount = 1000 * (10 ** token.decimals());

        token.mint(addr1, amount);

        assertEq(token.balanceOf(addr1), amount);
        assertEq(token.totalSupply(), amount);
    }

    function testMintByNonMinter() public {
        uint256 amount = 1000 * (10 ** token.decimals());

        // Expect revert when non-minter tries to mint
        vm.prank(addr1);
        vm.expectRevert();
        token.mint(addr1, amount);
    }

    function testGrantMinterRole() public {
        // Grant MINTER_ROLE to addr1
        token.grantRole(MINTER_ROLE, addr1);

        // Check that addr1 has MINTER_ROLE
        assertTrue(token.hasRole(MINTER_ROLE, addr1));
    }

    function testMintByNewMinter() public {
        uint256 amount = 500 * (10 ** token.decimals());

        // Grant MINTER_ROLE to addr1
        token.grantRole(MINTER_ROLE, addr1);

        // Mint tokens to addr2 from addr1
        vm.prank(addr1);
        token.mint(addr2, amount);

        // Check the balance of addr2
        assertEq(token.balanceOf(addr2), amount);

        // Check the total supply
        assertEq(token.totalSupply(), amount);
    }

    function testBurn() public {
        uint256 amount = 1000 * (10 ** token.decimals());

        // Mint tokens to addr1
        token.mint(addr1, amount);

        // Burn tokens from addr1
        vm.prank(addr1);
        token.burn(amount / 2);

        // Check the balance of addr1
        assertEq(token.balanceOf(addr1), amount / 2);

        // Check the total supply
        assertEq(token.totalSupply(), amount / 2);
    }

    function testBurnFrom() public {
        uint256 amount = 1000 * (10 ** token.decimals());

        // Mint tokens to addr1
        token.mint(addr1, amount);

        // Approve owner to burn tokens on behalf of addr1
        vm.prank(addr1);
        token.approve(owner, amount);

        // Burn tokens from addr1 using burnFrom
        token.burnFrom(addr1, amount / 2);

        // Check the balance of addr1
        assertEq(token.balanceOf(addr1), amount / 2);

        // Check the total supply
        assertEq(token.totalSupply(), amount / 2);
    }

    function testPermit() public {
        uint256 amount = 1000 * (10 ** token.decimals());

        // Mint tokens to addr1
        token.mint(addr1, amount);

        uint256 ownerPrivateKey = 0xA11CE;
        address ownerAddress = vm.addr(ownerPrivateKey);

        // Transfer tokens to ownerAddress
        vm.prank(addr1);
        token.transfer(ownerAddress, amount);

        // Create permit parameters
        uint256 nonce = token.nonces(ownerAddress);
        uint256 deadline = block.timestamp + 1 hours;

        bytes32 digest = getPermitDigest(
            ownerAddress,
            addr2,
            amount,
            nonce,
            deadline
        );

        (uint8 v, bytes32 r, bytes32 s) = vm.sign(ownerPrivateKey, digest);

        // Use permit to approve addr2
        vm.prank(addr2);
        token.permit(ownerAddress, addr2, amount, deadline, v, r, s);

        // Check allowance
        uint256 allowance = token.allowance(ownerAddress, addr2);
        assertEq(allowance, amount);
    }

   // UTILS
    function getPermitDigest(
        address owner_,
        address spender,
        uint256 value,
        uint256 nonce,
        uint256 deadline
    ) internal view returns (bytes32) {
        bytes32 structHash = keccak256(
            abi.encode(
                keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)"),
                owner_,
                spender,
                value,
                nonce,
                deadline
            )
        );

        return keccak256(
            abi.encodePacked(
                "\x19\x01",
                token.DOMAIN_SEPARATOR(),
                structHash
            )
        );
    }
}
