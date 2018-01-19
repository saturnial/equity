var Project = artifacts.require("Project");

contract('Project', function(accounts) {

  it("is initialized with an owner and target", async function() {
    const target = 200;
    const contract = await Project.new(accounts[0], target);
    const contractOwner = await contract.owner();
    assert.equal(contractOwner, accounts[0]);
    const contractTarget = await contract.target();
    assert.equal(contractTarget, target);
  });

  it("starts with 0 funds raised", async function() {
    const contract = await Project.deployed();
    const total = await contract.totalAmountRaised();
    assert.equal(total, 0, "No funds should be tied to a new project.");
  });

 it("should be able to accept a contribution of 100", async function() {
   const amount = 100;
   const contract = await Project.deployed();
   _ = await contract.contribute(accounts[0], amount);
   const balance = await contract.balanceOf(accounts[0]);
   assert.equal(balance, amount, "A balance of 100 should be mapped to the contributor.");
   const total = await contract.totalAmountRaised();
   assert.equal(total, amount, "Total amount raised should be 100.");
 });

 it("should be able to determine if its target has been reached", async function() {
   var funded = false;
   const contract = await Project.new(accounts[0], 200);
   _ = await contract.contribute(accounts[1], 100);
   funded = await contract.isFullyFunded();
   // Project is not yet fully funded.
   assert.isFalse(funded);
   _ = await contract.contribute(accounts[2], 200);
   // Project should now be fully funded.
   funded = await contract.isFullyFunded();
   assert.isTrue(funded);
 });

});
