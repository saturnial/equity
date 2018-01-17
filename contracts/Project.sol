pragma solidity ^0.4.2;

contract Project {

   mapping (address => uint256) public contributions;
   uint public totalAmountRaised;

   function contribute(address _contributor, uint _amount) public returns (bool) {
     contributions[_contributor] += _amount;
     totalAmountRaised += _amount;
     return true;
   }

   function balanceOf(address _contributor) public view returns (uint balance) {
        return contributions[_contributor];
    }

}
