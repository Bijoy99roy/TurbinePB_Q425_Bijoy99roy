import { ArrowBigUp, ExternalLink, Trophy } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Navbar } from "../components/Navbar";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useEffect, useMemo, useState } from "react";
import * as anchor from "@coral-xyz/anchor";
import type { BuilderBoardAdvTask1 } from "../api/types/builder_board_adv_task_1";
import { builderBoardProgramInterface, commitmentLevel, connection } from "../api/constants";
import { Program } from "@coral-xyz/anchor";
import { fetchAllProjects, fetchUserVotedAccounts } from "../anchorUtils/projects";
import { getPda } from "../anchorUtils/handlePda";
import { toast } from "sonner";
import ConnectWalletNotice from "../components/ConnectWalletNotice";
import { Tooltip, TooltipContent, TooltipTrigger } from "../components/ui/tooltip";
import Loader from "../components/Loader";

type BuilderBoardProjects = {
    owner: anchor.web3.PublicKey;
    upvotes: anchor.BN;
    bump: number;
    projectId: anchor.BN;
    projectName: string;
    description: string;
    url: string;
}

export function Leaderboard() {
    const [allProjects, setAllProjects] = useState<anchor.ProgramAccount<BuilderBoardProjects>[]>([]);
    const [loading, setLoading] = useState(true);

    const [userUpvotesSet, setUserUpvotesSet] = useState<Set<number>>(new Set());
    const wallet = useAnchorWallet();


    const provider = useMemo(() => {
        if (!wallet) return null;
        return new anchor.AnchorProvider(connection, wallet, {
            preflightCommitment: commitmentLevel,
        });
    }, [wallet])

    /* create the program interface combining the idl, and provider */
    const program = useMemo(() => {
        if (!provider) return null;
        return new Program(
            builderBoardProgramInterface,
            provider
        ) as Program<BuilderBoardAdvTask1>;
    }, [provider])


    useEffect(() => {
        if (!program) return;
        (async () => {
            setLoading(true)
            const allProjects = await fetchAllProjects(program);
            const allUpvotes = await fetchUserVotedAccounts(program, wallet?.publicKey);
            console.log(allUpvotes);
            console.log(allProjects);
            // Sort projects by upvotes descending
            const sortedProjects = allProjects.sort((a, b) =>
                b.account.upvotes.toNumber() - a.account.upvotes.toNumber()
            );
            setAllProjects(sortedProjects);
            // setAllUpvotesByUser(allUpvotes);
            const upvotesSet = new Set(allUpvotes.map(u => u.account.projectId.toNumber()));
            setUserUpvotesSet(upvotesSet);
            console.log(userUpvotesSet.has(3))
            setLoading(false)
        })();
    }, [program])

    async function upVoteProject(projectOwnerPubkey: anchor.web3.PublicKey, projectId: anchor.BN) {
        if (!program) return;
        const projectAccountPdaSeed = [
            Buffer.from("projects"),
            projectOwnerPubkey.toBuffer(),
            projectId.toArrayLike(Buffer, "le", 8)
        ]

        const { pda: projectAccountPda } = await getPda(projectAccountPdaSeed, program);
        const upvotePdaSeed = [
            Buffer.from("upvote"),
            projectAccountPda.toBuffer(),
            wallet?.publicKey.toBuffer()
        ]
        const { pda: upvotePda } = await getPda(upvotePdaSeed, program);

        try {
            await program.methods.upvoteProject(projectId)
                .accounts({
                    user: wallet?.publicKey,
                    projectAccountPda,
                    upvotePda

                } as any)
                .rpc()

            toast.success("Successfully upvoted");
            return true
        } catch (err: any) {
            console.error(err);

            toast.error((err.message ?? "Transaction failed"));
            return false
        }


    }

    if (!wallet) {
        return (
            <section className="w-screen px-4 my-20 py-10">
                <Navbar />
                <ConnectWalletNotice />
            </section>
        )
    }
    return (
        <div className="min-h-screen flex flex-col ">
            <Navbar />
            <section className="flex-1 container mx-auto px-4 my-20 py-10">
                {loading ? <Loader /> : <Card>
                    <CardHeader className="text-center space-y-2">
                        <CardTitle className="text-4xl">
                            All Projects
                        </CardTitle>
                        <CardDescription className="text-muted-foreground text-lg">
                            Community voted rankings of the projects
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {
                            allProjects.length === 0 ? (
                                <div className="text-center py-12 text-muted-foreground">
                                    <Trophy className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                    <p className="text-xl">No projects yet. Be the first to publish!</p>
                                    <Link to={"/"}>
                                        <Button className="mt-6">
                                            Submit a Project
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="border-border hover:bg-transparent">
                                                <TableHead className="w-20 text-center">Rank</TableHead>
                                                <TableHead>Project</TableHead>
                                                <TableHead className="md:table-cell">Description</TableHead>
                                                <TableHead className="text-center">Votes</TableHead>
                                                <TableHead className="text-center">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {
                                                allProjects.map((project, idx) => (
                                                    <TableRow key={idx}>
                                                        <TableCell className="text-center font-bold">
                                                            #{idx + 1}
                                                        </TableCell>
                                                        <TableCell>
                                                            {project.account.projectName}
                                                        </TableCell>
                                                        <TableCell className="md:table-cell max-w-md">
                                                            {project.account.description.length > 50 ? (
                                                                <Tooltip>
                                                                    <TooltipTrigger className="cursor-pointer">{project.account.description.slice(0, 50)}....</TooltipTrigger>
                                                                    <TooltipContent className="text-wrap">
                                                                        <p>{project.account.description}</p>
                                                                    </TooltipContent>
                                                                </Tooltip>

                                                            ) : project.account.description}


                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <Button
                                                                size="sm"
                                                                className="gap-2 cursor-pointer"
                                                                onClick={async () => {
                                                                    const upvoted = await upVoteProject(project.account.owner, project.account.projectId)
                                                                    if (upvoted) {
                                                                        setAllProjects(prev =>
                                                                            prev.map(p =>
                                                                                p.account.projectId === project.account.projectId
                                                                                    ? { ...p, account: { ...p.account, upvotes: p.account.upvotes.add(new anchor.BN(1)) } }
                                                                                    : p
                                                                            )
                                                                        );
                                                                        setUserUpvotesSet(prev => new Set(prev).add(project.account.projectId.toNumber()));
                                                                    }
                                                                }}
                                                            >
                                                                <ArrowBigUp fill={userUpvotesSet.has(project.account.projectId.toNumber()) ? "white" : "none"} className="w-4 h-4" />
                                                                <span className="font-bold text-lg">{project.account.upvotes.toNumber()}</span>
                                                            </Button>
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                asChild
                                                            >
                                                                <a
                                                                    href={project.account.url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="gap-2"
                                                                >
                                                                    Visit <ExternalLink className="w-3 h-3" />
                                                                </a>
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            }
                                        </TableBody>
                                    </Table>
                                </div>
                            )
                        }
                    </CardContent>
                </Card>
                }
            </section>
        </div >
    )
}