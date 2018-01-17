// Specifically request an abstraction for MetaCoin
var Collect = artifacts.require("Collect");

contract('Collect', function(accounts) {

  it("should set initial balances to 0", function() {
   return Collect.deployed().then(function(instance) {
     return instance.balanceOf.call(accounts[0]);
   }).then(function(balance) {
     assert.equal(balance.valueOf(), 0, "No money should have been collected.");
   });
 });

});
