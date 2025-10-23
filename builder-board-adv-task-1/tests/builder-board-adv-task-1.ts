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
      projectAccountPda.toBuffer(),
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
    console.log(projectAccountPda)
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

  it("Create a project, Fails for invalid project name length", async () => {
    const projectId = new anchor.BN(2);
    const projectName = "A simple implementation of a Constant Product Automated Market Maker (CP-AMM), inspired by Raydium.";
    const description = "A simple implementation of a Constant Product Automated Market Maker (CP-AMM), inspired by Raydium.";
    const githubUrl = "https://github.com/Bijoy99roy/AMM";
    const projectAccountPda = await prepareProject(projectId, projectOwner.publicKey);
    try{
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
    } catch(err) {
      const anchorError = err as anchor.AnchorError;
      assert.equal(anchorError.error.errorCode.code, "InvalidProjectNameLength")
      assert.equal(anchorError.error.errorMessage, "Invalid project name length")
    }
    
  });

  it("Create a project, Fails for invalid description length", async () => {
    const projectId = new anchor.BN(3);
    const projectName = "AMM";
    const description = "A simple implementation of a Constant Product Automated Market Maker (CP-AMM), inspired by Raydium. A simple implementation of a Constant Product Automated Market Maker (CP-AMM), inspired by Raydium. A simple implementation of a Constant Product Automated Market Maker (CP-AMM), inspired by Raydium. A simple implementation of a Constant Product Automated Market Maker (CP-AMM), inspired by Raydium.";
    const githubUrl = "https://github.com/Bijoy99roy/AMM";
    const projectAccountPda = await prepareProject(projectId, projectOwner.publicKey);
    try{
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
    } catch(err) {
      const anchorError = err as anchor.AnchorError;
      assert.equal(anchorError.error.errorCode.code, "InvalidDescriptionLength")
      assert.equal(anchorError.error.errorMessage, "Invalid description length")
    }
    
  });

  it("Create a project, Fails for invalid url length", async () => {
    const projectId = new anchor.BN(4);
    const projectName = "AMM";
    const description = "A simple implementation of a Constant Product Automated Market Maker (CP-AMM), inspired by Raydium.";
    const githubUrl = "https://github.com/Bijoy99roy/AMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM";
    console.log(githubUrl.length)
    const projectAccountPda = await prepareProject(projectId, projectOwner.publicKey);
    try{
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
    } catch(err) {
      const anchorError = err as anchor.AnchorError;
      assert.equal(anchorError.error.errorCode.code, "InvalidUrlLength")
      assert.equal(anchorError.error.errorMessage, "Invalid url length")
    }
    
  });

  it("Upvote a project", async ()=>{
    const projectId = new anchor.BN(1);
    const {projectAccountPda, upvotePda} = await prepareUpvote(projectId, projectOwner.publicKey, user.publicKey);
    console.log(projectAccountPda)
    console.log(upvotePda)
    console.log(projectOwner.publicKey)
    console.log(user.publicKey)
    await program.methods.upvoteProject(projectId)
    .accounts({
      user: user.publicKey,
      projectAccountPda,
      upvotePda
    })
    .signers([user])
    .rpc();
    const project = await program.account.project.fetch(projectAccountPda);
    const upvote = await program.account.upvote.fetch(upvotePda);
    console.log(project)
    console.log(upvote)
    assert.equal(project.upvotes.toString(), "1", "Expected upvotes value to be 1")
    assert.equal(upvote.project.toString(), projectAccountPda.toString(), `Expected project value to be ${projectAccountPda.toString()}`)
    assert.equal(upvote.user.toString(), user.publicKey.toString(), `Expected user value to be ${user.publicKey.toString()}`)

  });

  it("Upvote a project, Fails to same user votes more than once", async ()=>{
    const projectId = new anchor.BN(1);
    const {projectAccountPda, upvotePda} = await prepareUpvote(projectId, projectOwner.publicKey, user.publicKey);
    console.log(projectAccountPda)
    console.log(upvotePda)
    console.log(projectOwner.publicKey)
    console.log(user.publicKey)
    try{
      await program.methods.upvoteProject(projectId)
    .accounts({
      user: user.publicKey,
      projectAccountPda,
      upvotePda
    })
    .signers([user])
    .rpc();
    } catch(err) {
      const anchorError = err as anchor.AnchorError;
      console.log(anchorError)
      assert.equal(anchorError.error.errorCode.code, "AlreadyVoted")
      assert.equal(anchorError.error.errorMessage, "User has already voted the project")
    }
    
  });
});
