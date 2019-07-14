import React, { Component } from "react";
import "../styles/contractCode.css"

class ContractCode extends Component {

  render() {
    return (
      <div className="contract-code-block">
        <h6>Address (main): <a target="_blank" href="https://ropsten.etherscan.io/address/0x37ca6f372a91b794cb2995164f8b19c7372f658e">0x37ca6F372A91B794CB2995164F8B19c7372f658e</a></h6>
        <h6 className="ropsten">Address (ropsten): <a target="_blank" href="https://ropsten.etherscan.io/address/0x37ca6f372a91b794cb2995164f8b19c7372f658e">0x37ca6F372A91B794CB2995164F8B19c7372f658e</a></h6>
        <pre>
        <code><p>
        {`
        pragma solidity ^0.5.8;

        import "./MultiSig.sol";

        contract InitNewWallet {
        
            address public newWalletAddress = 0x0;
        
            function initNewWallet(address _owner1, address _owner2) public {
                newWalletAddress = address(new MultiSig(_owner1, _owner2));
            }
        
            function get() public view returns (address) {
                return newWalletAddress;
            }
        
        }        
        `}
        </p>
        </code>
        </pre>
        <h6>Address (main): <a target="_blank" href="https://ropsten.etherscan.io/address/0xe3043c1e8c46affbae21794670e2fde8fe5838f1">0xe3043c1e8C46AFfbae21794670E2FDE8fE5838F1</a></h6>
        <h6 className="ropsten">Address (ropsten): <a target="_blank" href="https://ropsten.etherscan.io/address/0xe3043c1e8c46affbae21794670e2fde8fe5838f1">0xe3043c1e8C46AFfbae21794670E2FDE8fE5838F1</a></h6>
        <pre className="second-pre">
        <code>
        {`
        pragma solidity ^0.5.8;

        contract ${<span className="contract-name">MultiSig</span>} {
            
            address public owner1;
            address public owner2;
            bool public owner1RequestedWithdraw = false;
            bool public owner2RequestedWithdraw = false;
            address public owner1RequestedWithdrawTo;
            address public owner2RequestedWithdrawTo;
            uint public owner1RequestedWithdrawAtBlock;
            uint public owner2RequestedWithdrawAtBlock;
            uint public balance = 0;
        
            modifier owner() {
                require(msg.sender == owner1 || msg.sender == owner2, 
                  "You are not a contract owner...");
                _;
            }
            
            constructor(address _owner1, address _owner2) public {
                owner1 = _owner1;
                owner2 = _owner2;
            }
            
            function() external payable {
                balance += msg.value;
            }
            
            function withdraw(uint _amount, address payable _to) public owner {
                require(balance >= _amount, "Requested too much ether...");
        
                if (msg.sender == owner1) {
                    owner1RequestedWithdraw = true;
                    owner1RequestedWithdrawTo = _to;
                    owner1RequestedWithdrawAtBlock = block.number;
                }
                if (msg.sender == owner2) {
                    owner2RequestedWithdraw = true;
                    owner2RequestedWithdrawTo = _to;
                    owner2RequestedWithdrawAtBlock = block.number;
                }
                if (owner1RequestedWithdraw && owner2RequestedWithdraw && 
                  owner1RequestedWithdrawTo == owner2RequestedWithdrawTo && 
                  owner1RequestedWithdrawAtBlock - owner2RequestedWithdrawAtBlock <= 6000 || 
                  owner2RequestedWithdrawAtBlock - owner1RequestedWithdrawAtBlock <= 6000) {
                    balance -= _amount;
                    owner1RequestedWithdraw = false;
                    owner1RequestedWithdrawTo = 0x0;
                    owner2RequestedWithdraw = false;
                    owner2RequestedWithdrawTo = 0x0;
                    _to.transfer(_amount);
                }
            }  
        }       
        `}
        </code>
        </pre>
      </div>
    );
  }
}

export default ContractCode;

// syntax highlight code