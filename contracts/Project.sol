pragma solidity ^0.4.2;

contract Project {

  /* public properties */
  address public owner;
  uint public target;
  uint public totalAmountRaised;
  address[] public contributors;
  mapping (address => uint) public contributions;

  /* events */
  event ContributionMade(address contributor, uint amount);
  event GoalReached(uint amount, address beneficiary);

  function Project(address _owner, uint _target) public {
    owner = _owner;
    target = _target;
  }

  /* This modifier ensures that the function it modifies is only run if the
  deadline of the project has passed. */
  modifier afterDeadline() { if (now >= deadline) _; }

  function contribute(address _contributor, uint _amount) public returns (bool success) {
    contributions[_contributor] += _amount;
    totalAmountRaised += _amount;
    contributors.push(_contributor);
    ContributionMade(_contributor, _amount);
    return true;
  }

  function balanceOf(address _contributor) public view returns (uint balance) {
    return contributions[_contributor];
  }

  function isFullyFunded() public view returns (bool funded) {
    return totalAmountRaised >= target;
  }

  function numberOfContributions() public view returns (uint number) {
    return contributors.length;
  }

}
