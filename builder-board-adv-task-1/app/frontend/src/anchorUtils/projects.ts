import type { BuilderBoardAdvTask1 } from "../api/types/builder_board_adv_task_1";
import * as anchor from "@coral-xyz/anchor";

export async function fetchAllProjects(program: anchor.Program<BuilderBoardAdvTask1>) {
  const projects = await program.account.project.all();

  return projects;
}

export async function fetchUserVotedAccounts(
  program: anchor.Program<BuilderBoardAdvTask1>,
  userPubkey?: anchor.web3.PublicKey
) {
  const upvotes = await program.account.upvote.all([
    {
      memcmp: {
        offset: 48, // skip discriminator +  projectKey + projectId
        bytes: userPubkey!.toBase58(), // filter on user field
      },
    },
  ]);

  return upvotes;
}