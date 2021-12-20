const { assert } = require("console");
require("chai").use(require("chai-as-promised")).should();

const Store = artifacts.require("Store");

contract("StoreCIDContract", ([deployer]) => {
  let store;
  before(async () => {
    store = await Store.deployed();
  });
  describe("deployment", async () => {
    it("deployed correctly", async () => {
      // see whether the smart contract was properly deployed
      const address = await store.address;
      assert(address !== "");
    });
  });
  describe("store cid", async () => {
    let initialId, result;
    before(async () => {
      initialId = await store.newItemId(); // get initial id
      result = await store.storeCID("random text", { from: deployer }); //store cid
    });
    it("add cid correctly", async () => {
      const event = result.logs[0].args;
      assert(event.id.toNumber() == initialId + 1); // new id should equal to old id +1
    });
  });
});
