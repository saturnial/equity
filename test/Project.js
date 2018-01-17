var Project = artifacts.require("Project");

contract('Project', function(accounts) {

  it("starts with 0 funds", function() {
   return Project.deployed().then(function(instance) {
     return instance.totalAmountRaised();
   }).then(function(total) {
     assert.equal(total, 0, "No funds should be tied to a new project.");
   });
 });

 it("should be able to accept a contribution of 100", function() {
   var amount = 100;
   var project;

  return Project.deployed().then(function(instance) {
    project = instance;
    return project.contribute(accounts[0], amount);
  }).then(function(success) {
    return project.balanceOf(accounts[0]);
  }).then(function(balance) {
    assert.equal(balance, amount, "A balance of 100 should be mapped to the contributor.");
    return project.totalAmountRaised();
  }).then(function(total) {
    assert.equal(total, amount, "Total amount raised should be 100.");
  });
});

});
