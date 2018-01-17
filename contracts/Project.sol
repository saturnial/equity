pragma solidity ^0.4.2;

contract Project {

   mapping (address => uint256) public contributions;

   function contribute(address _contributor, uint256 _amount) public returns (bool) {
     contributions[_contributor] += _amount;
     return true;
   }

   function balanceOf(address _contributor) public view returns (uint256 balance) {
        return contributions[_contributor];
    }

}
