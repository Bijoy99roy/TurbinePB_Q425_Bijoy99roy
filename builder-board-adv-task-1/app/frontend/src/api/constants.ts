import idl from "./idl/builder_board_adv_task_1.json";
import { Connection, clusterApiUrl } from "@solana/web3.js";

/* Constants for RPC Connection the Solana Blockchain */
export const commitmentLevel = "processed";
export const endpoint = clusterApiUrl("devnet");
// export const endpoint = "http://localhost:8899";
export const connection = new Connection(endpoint, commitmentLevel);

/* Constants for the Deployed "BuilderBoard" Program */
export const builderBoardProgramInterface = JSON.parse(JSON.stringify(idl));