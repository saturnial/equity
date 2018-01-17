var Collect = artifacts.require("Collect");

contract('Collect', function(accounts) {

  it("should set initial balances to 0", function() {
   return Collect.deployed().then(function(instance) {
     return instance.balanceOf(accounts[0]);
   }).then(function(balance) {
     assert.equal(balance, 0, "No money should have been collected.");
   });
 });

 it("should store a balance of 100", function() {
   var amount = 100;
   var collect;

  return Collect.deployed().then(function(instance) {
    collect = instance;
    return collect.contribute(accounts[0], amount);
  }).then(function(success) {
    return collect.balanceOf(accounts[0]);
  }).then(function(balance) {
    assert.equal(balance, amount, "A balance of 100 should be stored.");
  });
});

});
