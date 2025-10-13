import { createContext } from "react";

export const AppContext = createContext<{ theme: 'dark' | 'light', direction: string }>({ theme: 'dark', direction: 'ltr' })
