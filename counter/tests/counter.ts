import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Counter } from "../target/types/counter";
import { assert } from "chai";
describe("counter", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.counter as Program<Counter>;
  const counterAccount = anchor.web3.Keypair.generate();
  const provider = anchor.getProvider();

  it("Initialize Counter", async () => {
    await program.methods.initialize()
    .accounts({
      counter: counterAccount.publicKey,
      user: provider.wallet.publicKey
    })
    .signers([counterAccount])
    .rpc()
    const currentCount = await program.account.counterAccount.fetch(counterAccount.publicKey);

    assert(currentCount.counter.toNumber() === 0, 'Expected counter value to be 0');
  });
  it("Increment Counter", async () => {
    await program.methods.increment()
    .accounts({
      counter: counterAccount.publicKey,
    })
    .rpc()
    await program.methods.increment()
    .accounts({
      counter: counterAccount.publicKey,
    })
    .rpc()
    const currentCount = await program.account.counterAccount.fetch(counterAccount.publicKey);

    assert(currentCount.counter.toNumber() === 2, 'Expected counter value to be 2');
  });
  it("Decrement Counter", async () => {
    await program.methods.decrement()
    .accounts({
      counter: counterAccount.publicKey,
    })
    .rpc()
    const currentCount = await program.account.counterAccount.fetch(counterAccount.publicKey);

    assert(currentCount.counter.toNumber() === 1, 'Expected counter value to be 1');
  });
});
