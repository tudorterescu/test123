import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"

import { ScrollArea } from "@/components/ui/scroll-area"

import {
	Card,
	CardContent,
	CardTitle,
	CardDescription,
	CardHeader,
} from "@/components/ui/card"

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

import { Bitcoin } from "lucide-react"
import { Receipt } from "lucide-react"

const income = [
	{
		incomeId: 1,
		incomeMonth: "Jan",
		incomeYear: "2023",
		incomeAmount: Math.floor(Math.random() * 1000),
	},
	{
		incomeId: 2,
		incomeMonth: "Feb",
		incomeYear: "2023",
		incomeAmount: Math.floor(Math.random() * 1000),
	},
	{
		incomeId: 3,
		incomeMonth: "Mar",
		incomeYear: "2023",
		incomeAmount: Math.floor(Math.random() * 1000),
	},
	{
		incomeId: 4,
		incomeMonth: "Apr",
		incomeYear: "2023",
		incomeAmount: Math.floor(Math.random() * 1000),
	},
	{
		incomeId: 5,
		incomeMonth: "May",
		incomeYear: "2023",
		incomeAmount: Math.floor(Math.random() * 1000),
	},
	{
		incomeId: 6,
		incomeMonth: "Jun",
		incomeYear: "2023",
		incomeAmount: Math.floor(Math.random() * 1000),
	},
	{
		incomeId: 7,
		incomeMonth: "Jul",
		incomeYear: "2023",
		incomeAmount: Math.floor(Math.random() * 1000),
	},
	{
		incomeId: 8,
		incomeMonth: "Aug",
		incomeYear: "2023",
		incomeAmount: Math.floor(Math.random() * 1000),
	},
	{
		incomeId: 9,
		incomeMonth: "Sep",
		incomeYear: "2023",
		incomeAmount: Math.floor(Math.random() * 1000),
	},
	{
		incomeId: 10,
		incomeMonth: "Oct",
		incomeYear: "2023",
		incomeAmount: Math.floor(Math.random() * 1000),
	},
	{
		incomeId: 11,
		incomeMonth: "Nov",
		incomeYear: "2023",
		incomeAmount: Math.floor(Math.random() * 1000),
	},
	{
		incomeId: 12,
		incomeMonth: "Dec",
		incomeYear: "2023",
		incomeAmount: Math.floor(Math.random() * 1000),
	},
]

// Define form requirements here
const FormSchema = z.object({
	incomeAmount: z
		.number()
		.min(1, { message: "Income must be at least 1." })
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
	incomeYear: z.string().min(1, {
		message: "Please select an income year.",
	}),
	incomeMonth: z.string().min(1, {
		message: "Please select an income month.",
	}),
})

const IncomeTab = () => {
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
		<div className="flex flex-row space-x-5 items-stretch">
			<Card className="basis-3/4">
				<CardHeader>
					<CardTitle className="flex flex-row items-center justify-between">
						<span>Income</span>
						<Bitcoin className="text-muted-foreground" />
					</CardTitle>
					<CardDescription>A breakdown of your income.</CardDescription>
				</CardHeader>
				<CardContent>
					<ScrollArea className="h-[400px]">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="w-[100px]">Income ID</TableHead>
									<TableHead>Year</TableHead>
									<TableHead>Month</TableHead>
									<TableHead className="text-right">Amount</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{income.map((income) => (
									<TableRow key={income.incomeId}>
										<TableCell className="font-medium">
											{income.incomeId}
										</TableCell>
										<TableCell>{income.incomeYear}</TableCell>
										<TableCell>{income.incomeMonth}</TableCell>
										<TableCell className="text-right">
											${income.incomeAmount}
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
						<span>Add income</span>
						<Receipt className="text-muted-foreground" />
					</CardTitle>
					<CardDescription>
						Use this section to add your income.
					</CardDescription>
					<CardContent>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="w-full space-y-6"
							>
								<FormField
									control={form.control}
									name="incomeAmount"
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
												How much income did you make?
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="incomeYear"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Year</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select a year" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value="2021">2021</SelectItem>
													<SelectItem value="2022">2022</SelectItem>
													<SelectItem value="2023">2023</SelectItem>
												</SelectContent>
											</Select>
											<FormDescription>
												What year did you receive this income?
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="incomeMonth"
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
											<FormDescription>
												What month did you get paid?
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button type="submit" className="w-full">
									Add income
								</Button>
							</form>
						</Form>
					</CardContent>
				</CardHeader>
			</Card>
		</div>
	)
}

export default IncomeTab
