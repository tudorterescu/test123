import React, { useState } from "react"
import { auth } from "../firebaseConfig"
import { signInWithEmailAndPassword } from "firebase/auth"

const SignIn = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const handleLogin = async () => {
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			)
			console.log("Successfully logged in:", userCredential)
		} catch (error) {
			console.error("Error signing in:", error)
		}
	}

	return (
		<div>
			<h1>Sign In</h1>
			<input
				type="text"
				placeholder="Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type="password"
				placeholder="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button onClick={handleLogin}>Sign In</button>
		</div>
	)
}

export default SignIn
