"use client"
import Image from "next/image"
import Reference from "./components/Reference"
import { z } from "zod"
import { useState } from "react"

const emailSchema = z.object({
  email: z
    .string()
    .min(1, "Whoops! It looks like you forgot to add your email")
    .email("Please provide a valid email"),
})

export default function Home() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSuccess(false)
    setEmail(e.target.value)
    if (error) setError("")
  }

  function handlSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const result = emailSchema.safeParse({ email })
    if (!result.success) {
      setError(result.error.errors[0].message)
      setSuccess(false)
      return
    } else {
      setSuccess(true)
      setEmail("")
    }
  }

  return (
    <main className="flex h-full min-h-screen w-full max-w-5xl flex-col items-center sm:grid sm:grid-cols-2 md:min-h-0">
      <form onSubmit={handlSubmit} className="w-full">
        <div className="relative">
          <input
            type="text"
            placeholder="Email Address"
            className={`placeholder:text-neutral-dark-slate-grey w-full border ${
              error ? "border-primary-tomato" : "border-neutral-dark-slate-grey"
            }`}
            value={email}
            onChange={handleEmailChange}
          />
          <button type="submit" className="">
            Subscribe to monthly newsletter
          </button>
        </div>
        {error && (
          <p className="text-primary-soft-red ml-6 mt-2 text-[0.8125rem] leading-normal md:text-base">
            {error}
          </p>
        )}
      </form>
      <Reference />
    </main>
  )
}
