pragma solidity ^0.4.2;

contract Project {

  address owner;
  uint target;

   mapping (address => uint) public contributions;
   uint public totalAmountRaised;

   function Project(address _owner, uint _target) public {
     owner = _owner;
     target = _target;
   }

   function contribute(address _contributor, uint _amount) public returns (bool) {
     contributions[_contributor] += _amount;
     totalAmountRaised += _amount;
     return true;
   }

   function balanceOf(address _contributor) public view returns (uint balance) {
        return contributions[_contributor];
    }

}
