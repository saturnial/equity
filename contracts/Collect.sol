pragma solidity ^0.4.2;

contract Project {

   mapping (address => uint256) public balances;

   function contribute(address _contributor, uint256 _amount) public returns (bool) {
     balances[_contributor] += _amount;
     return true;
   }

   function balanceOf(address _owner) public view returns (uint256 balance) {
        return balances[_owner];
    }

}
