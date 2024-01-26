"use client"
import Reference from "./components/Reference"
import { z } from "zod"
import { useState } from "react"
import Image from "next/image"
import iconSuccess from "../public/images/icon-success.svg"
import ListItem from "./components/ListItem"

const emailSchema = z.object({
  email: z.string().min(1, "Email required").email("Valid email required"),
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
    }
  }

  function handlDismiss() {
    setSuccess(false)
    setEmail("")
  }

  return (
    <main className="flex h-full min-h-screen w-full flex-col items-center md:min-h-0">
      <div
        className={`text-neutral-dark-slate-grey grid w-full grid-cols-1 place-items-center bg-white shadow-[0_15px_60px_0_rgba(0,0,0,0.25)] md:grid-cols-2 md:rounded-[2.25rem] md:p-6 ${success ? "md:max-w-[31.5rem]" : "md:md:max-w-[58rem]"}`}
      >
        {success ? (
          <div className="w-full px-6 pb-10 pt-[9.31rem] md:col-span-2 md:p-10 md:pt-6">
            <Image src={iconSuccess} alt="icon success" className="mb-10" />
            <h2 className="mb-6 text-[3.5rem] font-bold leading-[3.5rem]">
              Thanks for subscribing!
            </h2>
            <p className="pb-[16.44rem] leading-6 md:pb-10">
              A confirmation email has been sent to{" "}
              <span className="font-bold">{email}</span>. Please open it and
              click the button inside to confirm your subscription.
            </p>
            <button className="btn md:w-full" onClick={handlDismiss}>
              Dismiss message
            </button>
          </div>
        ) : (
          <>
            <div className="h-[18rem] w-full rounded-b-2xl bg-[url('/images/illustration-sign-up-mobile.svg')] bg-cover bg-center bg-no-repeat md:col-start-2 md:h-full md:rounded-t-2xl md:bg-[url('/images/illustration-sign-up-desktop.svg')]"></div>
            <div className="px-4 py-10 md:row-start-1 md:px-10">
              <h1 className="text-[2.5rem] font-bold leading-[2.5rem]">
                Stay updated!
              </h1>
              <p className="my-4 leading-6">
                Join 60,000+ product managers receiving monthly updates on:
              </p>
              <ListItem>Product discovery and building what matters</ListItem>
              <ListItem>Measuring to ensure updates are a success</ListItem>
              <ListItem>And much more!</ListItem>
              <form onSubmit={handlSubmit} className="mt-8 w-full">
                <div className="mb-2 flex gap-4 text-xs font-bold leading-6">
                  <label htmlFor="email">Email address</label>
                  {error && (
                    <p className="text-primary-tomato ml-auto">{error}</p>
                  )}
                </div>
                <input
                  name="email"
                  id="email"
                  type="text"
                  placeholder="email@company.com"
                  className={`placeholder:text-neutral-dark-slate-grey mb-6 w-full rounded-lg border px-6 py-4 leading-6 placeholder:opacity-50 ${
                    error
                      ? "border-primary-tomato bg-primary-tomato/15 text-primary-tomato"
                      : "border-neutral-gray-25"
                  }`}
                  value={email}
                  onChange={handleEmailChange}
                />
                <button type="submit" className="btn">
                  Subscribe to monthly newsletter
                </button>
              </form>
            </div>
          </>
        )}
      </div>
      <Reference />
    </main>
  )
}
