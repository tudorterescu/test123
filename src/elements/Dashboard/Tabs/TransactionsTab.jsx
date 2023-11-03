import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"

import {
	Card,
	CardContent,
	CardTitle,
	CardDescription,
	CardHeader,
} from "@/components/ui/card"

import { ScrollArea } from "@/components/ui/scroll-area"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

// Form
import { useForm } from "react-hook-form"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/components/ui/use-toast"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"

import { ScanBarcode, ShoppingCart } from "lucide-react"

const transactions = [
	{
		transactionId: 1,
		transactionAmount: 250.0, // Removed the "$" to store as a number
		transactionMonth: "jan",
		transactionYear: "2021",
		category: "Groceries",
	},
	{
		transactionId: 2,
		transactionAmount: 150.0,
		transactionMonth: "feb",
		transactionYear: "2021",
		category: "Shopping",
	},
	{
		transactionId: 3,
		transactionAmount: 350.0,
		transactionMonth: "mar",
		transactionYear: "2021",
		category: "Miscellaneous",
	},
	{
		transactionId: 4,
		transactionAmount: 450.0,
		transactionMonth: "apr",
		transactionYear: "2021",
		category: "Shopping",
	},
	{
		transactionId: 5,
		transactionAmount: 550.0,
		transactionMonth: "may",
		transactionYear: "2021",
		category: "Hobbies",
	},
	{
		transactionId: 6,
		transactionAmount: 200.0,
		transactionMonth: "jun",
		transactionYear: "2021",
		category: "Bills",
	},
	{
		transactionId: 7,
		transactionAmount: 300.0,
		transactionMonth: "jul",
		transactionYear: "2021",
		category: "Rent",
	},
]

// Define form requirements here
const FormSchema = z.object({
	transactionValue: z
		.number()
		.min(1, { message: "Transaction value must be at least 1." })
		.refine(
			(value) => {
				// Convert to string and split by the decimal point
				const [whole, decimal] = value.toString().split(".")

				// Check if the whole part is not more than 4 digits and the decimal part is not more than 2 digits
				return whole.length <= 4 && (!decimal || decimal.length <= 2)
			},
			{
				message: "Value cannot exceed 4 digits and 2 decimal places.",
			}
		),
	transactionCategory: z.string().min(1, {
		message: "Please select a transaction category.",
	}),
	transactionMonth: z.string().min(1, {
		message: "Please select a transaction month.",
	}),
	transactionYear: z.string().min(1, {
		message: "Please select a transaction year.",
	}),
})

const SpendingTab = () => {
	const { toast } = useToast()
	// Make sure the form uses the validation
	const form = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			transactionValue: 1,
		},
	})

	// A toast to display values sent to server -> FOR DEV PURPOSES ONLY
	function onSubmit(data) {
		toast({
			title: "You submitted the following values:",
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
		})
	}

	return (
		<div className="flex flex-row items-stretch space-x-5">
			<Card className="basis-3/4">
				<CardHeader>
					<CardTitle className="flex flex-row items-center justify-between">
						<span>Transactions</span>
						<ScanBarcode className="text-muted-foreground" />
					</CardTitle>
					<CardDescription>A list of your recent transactions.</CardDescription>
				</CardHeader>
				<CardContent>
					<ScrollArea className="h-[400px]">
						<Table>
							<TableCaption>
								Use the date picker in the top right to filter by date.
							</TableCaption>
							<TableHeader>
								<TableRow>
									<TableHead className="w-[100px]">Transaction ID</TableHead>
									<TableHead>Year</TableHead>
									<TableHead>Month</TableHead>
									<TableHead>Category</TableHead>
									<TableHead className="text-right">Amount</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{transactions.map((transaction) => (
									<TableRow key={transaction.transactionId}>
										<TableCell className="font-medium">
											{transaction.transactionId}
										</TableCell>
										<TableCell>{transaction.transactionYear}</TableCell>
										<TableCell>{transaction.transactionMonth}</TableCell>
										<TableCell>{transaction.category}</TableCell>
										<TableCell className="text-right">
											${transaction.transactionAmount}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</ScrollArea>
				</CardContent>
			</Card>
			<Card className="basis-1/4">
				<CardHeader>
					<CardTitle className="flex flex-row items-center justify-between">
						<span>Add transactions</span>
						<ShoppingCart className="text-muted-foreground" />
					</CardTitle>
					<CardDescription>
						Use this section to add transactions to the list.
					</CardDescription>
					<CardContent>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="w-full space-y-6"
							>
								<FormField
									control={form.control}
									name="transactionValue"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Amount</FormLabel>
											<FormControl>
												<Input
													type="number"
													placeholder="Enter value"
													value={field.value}
													onChange={(e) => {
														const value = e.target.value
														if (value === "") {
															field.onChange(1)
														} else {
															const numericValue = parseFloat(value)
															field.onChange(
																isNaN(numericValue) ? "" : numericValue
															)
														}
													}}
												/>
											</FormControl>
											<FormDescription>
												Amount of transaction in dollars.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="transactionCategory"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Category</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select a category type" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value="groceries">Groceries</SelectItem>
													<SelectItem value="shopping">Shopping</SelectItem>
													<SelectItem value="misc">Miscellaneous</SelectItem>
													<SelectItem value="hobbies">Hobbies</SelectItem>
													<SelectItem value="bills">Bills</SelectItem>
													<SelectItem value="rent">Rent</SelectItem>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="transactionMonth"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Month</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select a month" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value="jan">January</SelectItem>
													<SelectItem value="feb">February</SelectItem>
													<SelectItem value="mar">March</SelectItem>
													<SelectItem value="apr">April</SelectItem>
													<SelectItem value="may">May</SelectItem>
													<SelectItem value="jun">June</SelectItem>
													<SelectItem value="jul">July</SelectItem>
													<SelectItem value="aug">August</SelectItem>
													<SelectItem value="sep">September</SelectItem>
													<SelectItem value="oct">October</SelectItem>
													<SelectItem value="nov">November</SelectItem>
													<SelectItem value="dec">December</SelectItem>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="transactionYear"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Year</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select a yar" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value="2021">2021</SelectItem>
													<SelectItem value="2022">2022</SelectItem>
													<SelectItem value="2023">2023</SelectItem>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button type="submit" className="w-full">
									Add transaction
								</Button>
							</form>
						</Form>
					</CardContent>
				</CardHeader>
			</Card>
		</div>
	)
}

export default SpendingTab
