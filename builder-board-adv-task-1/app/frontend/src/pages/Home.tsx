import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";

export function Home() {
    const wallet = useAnchorWallet();
    return (
        <div className="h-screen pl-0 ml-0">
            <Navbar wallet={wallet} />
            <Hero />
        </div>
    )
}