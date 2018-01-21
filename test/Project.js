var Project = artifacts.require("Project");

contract("Project", accounts => {
  it("is initialized with an owner and target", async () => {
    const target = 200;
    const owner = accounts[0];
    const contract = await Project.new(owner, target);
    const contractOwner = await contract.owner();
    assert.equal(contractOwner, owner);
    const contractTarget = await contract.target();
    assert.equal(contractTarget, target);
  });

  it("starts with 0 funds raised", async () => {
    const contract = await Project.deployed();
    const total = await contract.totalAmountRaised();
    assert.equal(total, 0, "No funds should be tied to a new project.");
  });

  it("should be able to accept a contribution of 100", async () => {
    const amount = 100;
    const contract = await Project.deployed();
    await contract.contribute(accounts[0], amount);
    const balance = await contract.balanceOf(accounts[0]);
    assert.equal(
      balance,
      amount,
      "A balance of 100 should be mapped to the contributor."
    );
    const total = await contract.totalAmountRaised();
    assert.equal(total, amount, "Total amount raised should be 100.");
  });

  it("should be able to determine if its target has been reached", async () => {
    let funded = false;
    const contract = await Project.new(accounts[0], 200);
    await contract.contribute(accounts[1], 100);
    funded = await contract.isFullyFunded();
    // Project is not yet fully funded.
    assert.isFalse(funded);
    await contract.contribute(accounts[2], 200);
    // Project should now be fully funded.
    funded = await contract.isFullyFunded();
    assert.isTrue(funded);
  });

  it("should return the total number of contributions", async () => {
    const contract = await Project.new(accounts[0], 200);
    await contract.contribute(accounts[1], 100);
    await contract.contribute(accounts[2], 200);
    await contract.contribute(accounts[3], 300);
    const numberOfContributions = await contract.numberOfContributions();
    assert.equal(numberOfContributions, 3, "There are 3 contributions.");
  });
});
