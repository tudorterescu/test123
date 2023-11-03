import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

// import Home from "./pages/Home"
import { Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import SignInPage from "./pages/SignInPage"

const App = () => {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<Routes>
				<Route path="/" element={<SignInPage />} />
				<Route path="/dashboard" element={<Dashboard />} />
			</Routes>
			<Toaster />
		</ThemeProvider>
	)
}

export default App
