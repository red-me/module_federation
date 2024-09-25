import React, { useState } from 'react'
import { useMutation } from "@tanstack/react-query"
import { login } from "../services/api"

export default () => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ formerror, setFormerror ] = useState('')
  const [ isloading, setIsloading ] = useState(false)

  const { mutateAsync: loginMutation } = useMutation({
    mutationFn: login,
  })

  const loginSubmit = async (e) => {
    e.preventDefault()
    setIsloading(true)
    const data = await loginMutation({ email, password })
    if (data.error) {
        setPassword('')
        setFormerror('Please check if you have typed your email and password correctly')
        setIsloading(false)
        return
    }
    window.location.href = '/'
  }

  return (
    <div className="bg-white w-full h-screen xl:flex flex-col items-center xl:px-[3.75rem] overflow-auto">
      <div
        className="m-auto flex flex-col xl:flex-row w-full min-h-[42.5rem] xl:border border-neutral-200 rounded-lg"
      >
        <div className="w-full flex items-center justify-center py-[4.375rem] xl:py-0">
          <div className="flex flex-col gap-7 xl:gap-[2.625rem] w-full px-4 mobile:px-8 xl:px-0 xl:w-[24rem]">
            <h4 className="text-neutral-900 text-xl mobile:text-2xl xl:text-[1.75rem] -tracking-[0.02em] font-extrabold">
              Log in
            </h4>
            {formerror && <p className="text-red-500">{formerror}</p>}
            <div className="flex flex-col gap-[1.875rem]">
              <input
                className="bg-neutral-100 xl:bg-transparent text-sm xl:text-base h-10 w-full border border-neutral-100 xl:border-neutral-200 shadow-xsmall rounded-md placeholder-neutral-600 px-3"
                type="text"
                value={email}
                name="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="relative">
                <input
                  className="h-10 w-full border text-sm xl:text-base border-neutral-200 shadow-xsmall rounded-md placeholder-neutral-600 pl-3 pr-10"
                  type="password"
                  name="password"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <button
              className="bg-blue-500 h-11 w-full rounded-md text-sm mobile:text-base text-white font-medium disabled:text-pneutral-300 disabled:bg-blue-400"
              disabled={isloading}
              onClick={loginSubmit}
            >
              {isloading ? 'LOADING...' : 'LOGIN'} 
            </button>
          </div>
        </div>
      </div>
      {/* <SessionChecker /> */}
    </div>
  )
}
