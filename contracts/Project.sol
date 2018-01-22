pragma solidity ^0.4.2;

contract Project {

  /* Public properties */
  address public owner;
  uint public target;
  uint public deadline;
  uint public totalAmountRaised;
  address[] public contributors;
  mapping (address => uint) public contributions;

  /* Internal properties */
  mapping (address => uint) internal balances;
  bool hasOwnerWithdrawnFunds = false;

  /* Events */
  event ContributionMade(address contributor, uint amount);
  event GoalReached(uint amount, address beneficiary);

  /* Constructor */
  function Project(address _owner, uint _target, uint _durationInHours) public {
    owner = _owner;
    target = _target;
    deadline = now + _durationInHours * 1 hours;
  }

  /* Modifiers */
  modifier afterDeadline() { if (now >= deadline) _; }
  modifier projectOpen() { if (deadline < now) _; }

  /* Publicly-exposed interface */

  function contribute(address _contributor, uint _amount) public projectOpen returns (bool success) {
    require(_amount > 0);

    contributions[_contributor] += _amount;
    totalAmountRaised += _amount;
    balances[_contributor] += _amount;
    contributors.push(_contributor);
    ContributionMade(_contributor, _amount);
    return true;
  }

  function balanceOf(address _contributor) public view returns (uint balance) {
    return balances[_contributor];
  }

  function isFullyFunded() public view returns (bool funded) {
    return totalAmountRaised >= target;
  }

  function numberOfContributions() public view returns (uint number) {
    return contributors.length;
  }

  function withdraw() public afterDeadline {
    if (isFullyFunded()) {
      withdrawForOwner();
    } else {
      withdrawForContributor();
    }
  }

  /* Internal functions */

  function withdrawForContributor() internal {
    if (balances[msg.sender] > 0) {
      msg.sender.transfer(balances[msg.sender]);
      balances[msg.sender] = 0;
    }
  }

  function withdrawForOwner() internal {
    if (!hasOwnerWithdrawnFunds) {
      owner.transfer(totalAmountRaised);
      hasOwnerWithdrawnFunds = true;
    }
  }

}
