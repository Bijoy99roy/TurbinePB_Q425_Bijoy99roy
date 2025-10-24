import { useAnchorWallet } from "@solana/wallet-adapter-react";
import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Program } from "@coral-xyz/anchor";
import { builderBoardProgramInterface, commitmentLevel, connection } from "../api/constants";
import * as anchor from "@coral-xyz/anchor";
import { incrementNonce } from "../services/handlePdaNonce";
import { getPda } from "../anchorUtils/handlePda";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { BuilderBoardAdvTask1 } from "../api/types/builder_board_adv_task_1";
export function ProjectForm() {

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        url: ""
    });
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    const wallet = useAnchorWallet();
    // if (!wallet) return null;

    const provider = wallet
        ? new anchor.AnchorProvider(connection, wallet, { preflightCommitment: commitmentLevel })
        : null;

    const program = wallet && provider
        ? new Program(builderBoardProgramInterface, provider) as Program<BuilderBoardAdvTask1>
        : null;
    // const provider = new anchor.AnchorProvider(connection, wallet, {
    //     preflightCommitment: commitmentLevel,
    // });

    // /* create the program interface combining the idl, and provider */
    // const program = new Program(
    //     builderBoardProgramInterface,
    //     provider
    // ) as Program<BuilderBoardAdvTask1>;

    async function submitProject(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!wallet || !program) {
            toast.error("Please connect your wallet first.");
            return;
        }
        setLoading(true)
        // Use backend api to get unique nonce for each project
        const responseNonce = await incrementNonce()
        console.log(responseNonce)

        const projectName = formData.name;
        const description = formData.description;
        const projectUrl = formData.url;

        const nonce = new anchor.BN(responseNonce.latestId)
        const projectAccountPdaSeed = [
            Buffer.from("projects"),
            wallet?.publicKey.toBuffer(),
            nonce.toArrayLike(Buffer, "le", 8)
        ]

        const { pda: projectAccountPda } = await getPda(projectAccountPdaSeed, program);
        try {
            await program.methods.initializeProject(nonce, projectName, projectUrl, description)
                .accounts({
                    owner: wallet?.publicKey,
                    projectAccountPda

                })
                .rpc()

            toast.success("Project published successfully!");

            navigate("/leaderboard")
        } catch (err: any) {
            console.error(err);

            toast.error((err.message ?? "Transaction failed"));
        } finally {
            setLoading(false);
        }


    }
    return (
        <div className="mx-auto">
            <div className="max-w-2xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-3xl font-black">
                            Share your project witht the community
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-6" onSubmit={submitProject}>
                            <div>
                                <Label className="text-lg font-bold">Project Title</Label>
                                <Input
                                    name="name"
                                    placeholder="Project Neutron"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="p-4 text-lg font-semibold"
                                    maxLength={50}
                                    required
                                />
                                <p className="flex justify-end font-bold">{formData.name.length} / 50</p>
                            </div>
                            <div>
                                <Label className="text-lg font-bold">Project Url</Label>
                                <Input
                                    name="url"
                                    placeholder="https://github.com/example/project"
                                    value={formData.url}
                                    onChange={handleInputChange}
                                    className="p-4 text-lg font-semibold"
                                    maxLength={128}
                                    required
                                />
                                <p className="flex justify-end font-bold">{formData.url.length} / 128</p>
                            </div>
                            <div>
                                <Label className="text-lg font-bold">Project Description</Label>
                                <Textarea
                                    name="description"
                                    placeholder="Tell everyone about your amazing project"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="p-4 text-lg font-semibold"
                                    maxLength={128}
                                    required
                                />
                                <p className="flex justify-end font-bold">{formData.description.length} / 128</p>
                            </div>

                            <div className="flex gap-6">
                                <Button className="flex-1 py-6 text-lg cursor-pointer"
                                    disabled={loading}
                                    type="submit">
                                    {loading ? "PUBLISHING..." : "PUBLISH"}
                                </Button>
                            </div>

                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}