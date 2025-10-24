
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Link } from "react-router-dom";
export function Navbar() {
    return (
        <nav className="fixed left-0 top-0 right-0 z-50 border-b shadow-accent">
            <div className="w-full p-4 mx-auto">
                <div className="flex justify-between items-center">
                    <Link className="text-2xl md:text-4xl text-primary font-black" to={"/"}>
                        BuilderBoard
                    </Link>

                    <WalletMultiButton className="z-50" />

                </div>
            </div>
        </nav>
    )
}