import React, { useState } from "react"
import {
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithPopup,
} from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { db, auth } from "../firebaseConfig"

const SignUp = () => {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")

	const signUp = async () => {
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				username,
				password
			)
			const user = userCredential.user

			await setDoc(doc(db, "users", user.uid), {
				username: username,
				email: user.email,
				userId: user.uid,
			})

			console.log("User signed up successfully!")
		} catch (error) {
			console.error("Error signing up:", error)
		}
	}

	const handleGoogleSignIn = async () => {
		const googleprov = new GoogleAuthProvider()
		try {
			const signresult = await signInWithPopup(auth, googleprov)
			const user = signresult.user
			console.log("Google sign in successful", user)
		} catch (error) {
			console.log("Google sign in failed", error)
		}
	}

	return (
		<div>
			<input
				type="text"
				placeholder="Username/Email"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
			/>
			<input
				type="password"
				placeholder="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button onClick={signUp}>Sign Up</button>
			<button onClick={handleGoogleSignIn}>Sign in with Google</button>
		</div>
	)
}

export default SignUp
