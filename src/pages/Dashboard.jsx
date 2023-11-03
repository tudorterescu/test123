// UI Components
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

// Theme toggle
import { ModeToggle } from "@/components/mode-toggle"

// Firebase components
import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebaseConfig"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebaseConfig"

// Icons
import { Wallet } from "lucide-react"

// Components from different files
import Switcher from "../elements/Dashboard/Switcher"
import DashNav from "../elements/Dashboard/DashNav"
import UserNav from "../elements/Dashboard/UserNav"
import CalendarDateRangePicker from "../elements/Dashboard/CalendarDatePicker"
import OverviewTab from "../elements/Dashboard/Tabs/OverviewTab"
import SpendingTab from "../elements/Dashboard/Tabs/TransactionsTab"
import IncomeTab from "../elements/Dashboard/Tabs/IncomeTab"
import SaversTab from "../elements/Dashboard/Tabs/SaversTab"
import InsightsTab from "../elements/Dashboard/Tabs/InsightsTab"

const Dashboard = () => {
	const [userData, setUserData] = useState(null)

	useEffect(() => {
		// Subscribe to auth state changes
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if (user) {
				// User is signed in, see docs for a list of available properties
				// https://firebase.google.com/docs/reference/js/firebase.User
				const uid = user.uid
				// Fetch the user data from Firestore
				const userDocRef = doc(db, "users", uid)
				const userDocSnap = await getDoc(userDocRef)

				if (userDocSnap.exists()) {
					setUserData(userDocSnap.data())
				} else {
					console.log("No such document!")
				}
			} else {
				// User is signed out
				setUserData(null)
			}
		})

		// Clean up the subscription
		return unsubscribe
	}, [])

	return (
		<div>
			<Card className="m-10">
				<CardContent>
					<div className="flex items-center justify-between border-b pb-5">
						<div className="pt-5 flex flex-row items-center gap-5">
							<Switcher />
							<DashNav />
						</div>

						<div className="flex flex-row items-center space-x-4">
							<UserNav />
							<ModeToggle />
						</div>
					</div>

					<div className="flex flex-row items-center justify-between pt-5">
						<div className="flex items-center space-x-2">
							<Wallet className="text-foreground" />
							<h2 className="text-3xl font-bold tracking-tight">
								Endurowallet
							</h2>
						</div>
						<div className="flex flex-row items-center space-x-2">
							<CalendarDateRangePicker />
							<AlertDialog>
								<AlertDialogTrigger asChild>
									<Button>Filter</Button>
								</AlertDialogTrigger>
								<AlertDialogContent>
									<AlertDialogHeader>
										<AlertDialogTitle>Date Filter</AlertDialogTitle>
										<AlertDialogDescription>
											This component is a stretch goal. As we were focused on
											the main aspects of the MVP, this was not a priority. We
											would love to add this in the future and have left it here
											as it is meant to be part of the full experience.
										</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter>
										<AlertDialogCancel>Close</AlertDialogCancel>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
						</div>
					</div>

					<Tabs defaultValue="overview" className="space-y-4 pt-5">
						<TabsList>
							<TabsTrigger value="overview">Overview</TabsTrigger>
							<TabsTrigger value="transactions">Transactions</TabsTrigger>
							<TabsTrigger value="income">Income</TabsTrigger>
							<TabsTrigger value="savers">Savers</TabsTrigger>
							<TabsTrigger value="insights">Insights</TabsTrigger>
						</TabsList>
						<TabsContent value="overview" className="space-y-4">
							<OverviewTab userData={userData} />
						</TabsContent>
						<TabsContent value="transactions">
							<SpendingTab />
						</TabsContent>
						<TabsContent value="income">
							<IncomeTab />
						</TabsContent>
						<TabsContent value="savers">
							<SaversTab />
						</TabsContent>
						<TabsContent value="insights">
							<InsightsTab />
						</TabsContent>
					</Tabs>
				</CardContent>
			</Card>
		</div>
	)
}

export default Dashboard
