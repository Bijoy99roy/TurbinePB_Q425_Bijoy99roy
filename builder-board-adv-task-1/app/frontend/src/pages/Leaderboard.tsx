import { ArrowBigUp, ExternalLink, Trophy } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Navbar } from "../components/Navbar";
import { useAnchorWallet } from "@solana/wallet-adapter-react";

export function Leaderboard() {
    const projects = [{
        name: "sda",
        description: "sdaa",
        url: "das"
    }]
    const wallet = useAnchorWallet();
    return (
        <div className="min-h-screen flex flex-col ">
            <Navbar wallet={wallet} />
            <section className="flex-1 container mx-auto px-4 my-20 py-10">
                <Card>
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
                            projects.length === 0 ? (
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
                                                <TableHead className="hidden md:table-cell">Description</TableHead>
                                                <TableHead className="text-center">Votes</TableHead>
                                                <TableHead className="text-center">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {
                                                projects.map((project, idx) => (
                                                    <TableRow key={idx}>
                                                        <TableCell className="text-center font-bold">
                                                            #{idx + 1}
                                                        </TableCell>
                                                        <TableCell>
                                                            {project.name}
                                                        </TableCell>
                                                        <TableCell className="hidden md:table-cell max-w-md">
                                                            {project.description}
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <Button
                                                                size="sm"
                                                                className="gap-2 cursor-pointer"
                                                            >
                                                                <ArrowBigUp fill="white" className="w-4 h-4" />
                                                                <span className="font-bold text-lg">{5}</span>
                                                            </Button>
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                asChild
                                                            >
                                                                <a
                                                                    href={project.url}
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
            </section>
        </div >
    )
}