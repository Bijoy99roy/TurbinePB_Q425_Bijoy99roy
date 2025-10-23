import * as anchor from "@coral-xyz/anchor";
import type { BuilderBoardAdvTask1 } from "../api/types/builder_board_adv_task_1";
export async function getPda(seed: any, program: anchor.Program<BuilderBoardAdvTask1>) {
  const [pda, bump] = anchor.web3.PublicKey.findProgramAddressSync(
    seed,
    program.programId
  );

  return { pda, bump };
}