import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardDescription,
} from "@/components/ui/card"

import OverviewChart from "../OverviewChart"
import RecentTransactions from "../RecentTransactions"

import { DollarSign } from "lucide-react"
import { Users2 } from "lucide-react"
import { CreditCard } from "lucide-react"
import { Activity } from "lucide-react"

const OverviewTab = () => {
	return (
		<>
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Savings</CardTitle>
						<DollarSign className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">$45,231.89</div>
						<p className="text-xs text-muted-foreground">
							+20.1% from last month
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Spending</CardTitle>
						<Users2 className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">$2350</div>
						<p className="text-xs text-muted-foreground">
							+180.1% from last month
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Income</CardTitle>
						<CreditCard className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">$1000</div>
						<p className="text-xs text-muted-foreground">
							+19% from last month
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Total Transactions
						</CardTitle>
						<Activity className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">34</div>
						<p className="text-xs text-muted-foreground">+10 from last month</p>
					</CardContent>
				</Card>
			</div>
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
				<Card className="col-span-4">
					<CardHeader>
						<CardTitle>Savings Overview</CardTitle>
					</CardHeader>
					<CardContent className="pl-2">
						<OverviewChart />
					</CardContent>
				</Card>
				<Card className="col-span-3">
					<CardHeader>
						<CardTitle>Recent Transactions</CardTitle>
						<CardDescription>
							You and your friends made 265 transactions this month.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<RecentTransactions />
					</CardContent>
				</Card>
			</div>
		</>
	)
}

export default OverviewTab
