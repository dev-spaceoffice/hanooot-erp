"use client"

import { useState, type ReactNode } from "react"
import { Provider } from "react-redux"
import { makeStore } from "@/store/store"

type ReduxProviderProps = {
  children: ReactNode
}

export const ReduxProvider = ({ children }: ReduxProviderProps) => {
  const [store] = useState(makeStore)

  return <Provider store={store}>{children}</Provider>
}
