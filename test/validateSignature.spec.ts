import * as sinonChai from "sinon-chai";
import * as chai from "chai";
import * as sinon from "sinon";
import { validateSignature } from "../src/validateSignature";
import * as authenticator from "../src/aws/getGitHubSecretKey";

const expect = chai.expect;
chai.use(sinonChai);

describe("ValidateSignature", () => {
  let sandbox = sinon.createSandbox();
  let getKeyStub = sandbox
    .stub(authenticator, "getGitHubSecretKey")
    .resolves("TEST-Secret-KEY");

  it("Signatures are matching", async () => {
    const validationResult = await validateSignature(
      "sha1=9d3b84686c1fda5643314e36246f1fe76987952d",
      "Github - Response"
    );
    expect(validationResult).to.be.true;
  });
  it("Unmatched signatures", async () => {
    const validationResult = await validateSignature(
      "sha1=350b37036b11b23649e8b27506dd12886473bcfc1",
      "Github - Response"
    );
    expect(validationResult).to.be.false;
  });
  it("validateSignature throws an error", async () => {
    getKeyStub.reset();
    getKeyStub.rejects("key not found");
    try {
      await validateSignature(
        "sha1=9d3b84686c1fda5643314e36246f1fe76987952d",
        "Github - Response"
      );
    } catch (err) {
      return;
    }
    expect.fail("Error should have been thrown");
  });
});
