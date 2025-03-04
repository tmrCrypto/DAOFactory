// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {SomniaConsensusDAO} from "./SomniaConsensusDAO.sol";

contract SomniaDAOFactory {


    address public factoryOwner;
    mapping(address => address[]) public userDAOs;

    event DAOCreated(address indexed creator, address daoAddress, uint timestamp);

    constructor() {
        factoryOwner = msg.sender;
    }

    function createDAO(address[] memory _owners, uint _confirmationsRequired, uint _graceperiod) external  {
        SomniaConsensusDAO newDAO = new SomniaConsensusDAO(_owners, _confirmationsRequired, _graceperiod);
        userDAOs[msg.sender].push(address(newDAO));
        emit DAOCreated(msg.sender, address(newDAO), block.timestamp);
    }

    function withdrawEther(address payable _to) external {
        require(msg.sender == factoryOwner, "Not owner");
        require(address(this).balance > 0, "No ETH to withdraw");

        uint256 balance = address(this).balance;
        (bool success, ) = _to.call{value: balance}("");
        require(success, "Transfer failed");

    }


}

