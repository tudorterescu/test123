import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Link } from "react-router-dom"

const Navbar = () => {
	return (
		<div className="pt-4 flex items-center justify-between">
			<p className="font-bold text-xl">endurowallet</p>
			<div className="flex items-center justify-between gap-10">
				<Button variant="ghost">Home</Button>
				<Button variant="ghost">Pricing</Button>
				<Button variant="ghost">Dashboard</Button>
				<Button variant="ghost">Contact</Button>
			</div>
			<div className="flex items-center gap-2">
				<Button variant="ghost">Log In</Button>
				<Link to="/signup">
					<Button>Sign Up</Button>
				</Link>
				<ModeToggle />
			</div>
		</div>
	)
}

export default Navbar
