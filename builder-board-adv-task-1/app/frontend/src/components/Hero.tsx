import { Sparkles, Trophy } from "lucide-react";
import { Button } from "./ui/button";
import { ProjectForm } from "./ProjectForm";
import { Link } from "react-router-dom";

export function Hero() {
    return (
        <section className="w-screen my-20 py-10">
            <div className="relative z-10 container mx-auto px-4">
                <div className="grid lg:grid-cols-2 items-center mx-auto gap-10">
                    <div className="text-center">
                        <div className="space-y-4">
                            <div className="inline-block">
                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm text-secondary bg-black">
                                    <Sparkles />
                                    Showcase Your Innovation
                                </span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                                Submit & Vote on Projects
                            </h1>
                            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
                                Join the community of builders and discover the most innovative projects in the world
                            </p>
                        </div>
                        <div className="my-5">
                            <Link to={"/leaderboard"}>
                                <Button
                                    className="text-lg cursor-pointer"
                                >
                                    <Trophy /> View Leaderboard
                                </Button>
                            </Link>
                        </div>

                    </div>
                    <div>
                        <ProjectForm />
                    </div>
                </div>
            </div>
        </section>
    )
}