var Project = artifacts.require("Project");

contract('Project', function(accounts) {

  it("should set initial balances to 0", function() {
   return Project.deployed().then(function(instance) {
     return instance.balanceOf(accounts[0]);
   }).then(function(balance) {
     assert.equal(balance, 0, "No money should have been collected.");
   });
 });

 it("should store a balance of 100", function() {
   var amount = 100;
   var project;

  return Project.deployed().then(function(instance) {
    project = instance;
    return project.contribute(accounts[0], amount);
  }).then(function(success) {
    return project.balanceOf(accounts[0]);
  }).then(function(balance) {
    assert.equal(balance, amount, "A balance of 100 should be stored.");
  });
});

});
