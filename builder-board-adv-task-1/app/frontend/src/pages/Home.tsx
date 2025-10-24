import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";

export function Home() {
    return (
        <div className="h-screen pl-0 ml-0">
            <Navbar />
            <Hero />
        </div>
    )
}