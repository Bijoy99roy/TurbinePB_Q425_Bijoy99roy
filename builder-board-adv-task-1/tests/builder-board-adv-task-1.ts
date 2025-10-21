import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { BuilderBoardAdvTask1 } from "../target/types/builder_board_adv_task_1";
import { assert } from "chai";

describe("builder-board-adv-task-1", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.builderBoardAdvTask1 as Program<BuilderBoardAdvTask1>;

  const provider = anchor.getProvider();

  const projectOwner = anchor.web3.Keypair.generate();
  const user = anchor.web3.Keypair.generate();

  async function getPda(seed) {
    const [pda, bump] = anchor.web3.PublicKey.findProgramAddressSync(
      seed,
      program.programId
    );

    return {pda, bump};
  }

  async function prepareProject(projectId: anchor.BN, publicKey: anchor.web3.PublicKey){
    const projectAccountPdaSeed = [
      Buffer.from("projects"),
      publicKey.toBuffer(),
      projectId.toArrayLike(Buffer, "le", 8)
    ]

    const {pda: projectAccountPda} = await getPda(projectAccountPdaSeed);
    return projectAccountPda
  }

  async function prepareUpvote(
    projectId: anchor.BN, 
    projectOwnerPubkey: anchor.web3.PublicKey,
    projectAccountPdaKey: anchor.web3.PublicKey,
    userPubkey: anchor.web3.PublicKey
  ){
    const projectAccountPdaSeed = [
      Buffer.from("projects"),
      projectOwnerPubkey.toBuffer(),
      projectId.toArrayLike(Buffer, "le", 8)
    ]

    const {pda: projectAccountPda} = await getPda(projectAccountPdaSeed);

    const upvotePdaSeed = [
      Buffer.from("upvote"),
      projectAccountPdaKey.toBuffer(),
      userPubkey.toBuffer()
    ]
    const {pda: upvotePda} = await getPda(upvotePdaSeed);

    return {projectAccountPda, upvotePda};
  }

  async function getAirdrop(
    publicKey: anchor.web3.PublicKey,
    amount: number = 100 * anchor.web3.LAMPORTS_PER_SOL
  ){
    const airdropTxn = await provider.connection.requestAirdrop(
      publicKey,
      amount
    );

    await provider.connection.confirmTransaction(airdropTxn);
  }

  
  before(async ()=>{
    await getAirdrop(projectOwner.publicKey);
    await getAirdrop(user.publicKey);
  })

  it("Create a project", async () => {
    const projectId = new anchor.BN(1);
    const projectName = "AMM";
    const description = "A simple implementation of a Constant Product Automated Market Maker (CP-AMM), inspired by Raydium.";
    const githubUrl = "https://github.com/Bijoy99roy/AMM";
    const projectAccountPda = await prepareProject(projectId, projectOwner.publicKey);
    await program.methods.initializeProject(
      projectId, 
      projectName, 
      githubUrl, 
      description)
      .accounts({
        owner: projectOwner.publicKey,
        projectAccountPda
      })
      .signers([projectOwner])
      .rpc();
    const project = await program.account.project.fetch(projectAccountPda);
    console.log(project)
    assert.equal(project.projectId.toString(), "1", "Expected projectId value to be 1")
    assert.equal(project.projectName, projectName, `Expected projectName value to be ${projectName}`)
    assert.equal(project.description, description, `Expected description value to be ${description}`)
    assert.equal(project.url, githubUrl, `Expected url value to be ${githubUrl}`)
    assert.equal(project.upvotes.toString(), "0", `Expected upvotes value to be 0`)
  });
});
