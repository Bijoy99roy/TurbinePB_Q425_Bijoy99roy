import { useAnchorWallet } from "@solana/wallet-adapter-react";
import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

export function ProjectForm() {

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        url: ""
    });

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    const wallet = useAnchorWallet();
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
                        <form className="space-y-6" >
                            <div>
                                <Label className="text-lg font-bold">Project Title</Label>
                                <Input
                                    name="name"
                                    placeholder="Project Neutron"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="p-4 text-lg font-semibold"
                                    required
                                />
                            </div>
                            <div>
                                <Label className="text-lg font-bold">Project Url</Label>
                                <Input
                                    name="url"
                                    placeholder="https://github.com/example/project"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="p-4 text-lg font-semibold"
                                    required
                                />
                            </div>
                            <div>
                                <Label className="text-lg font-bold">Project Description</Label>
                                <Textarea
                                    name="description"
                                    placeholder="Tell everyone about your amazing project"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="p-4 text-lg font-semibold"
                                    required
                                />
                            </div>

                            <div className="flex gap-6">
                                <Button className="flex-1 py-6 text-lg cursor-pointer"
                                    type="submit">
                                    Publish
                                </Button>
                            </div>

                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}