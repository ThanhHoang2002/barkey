import { useState } from "react"

type AuthMode = "login" | "register"

export const useAuth = () => {
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false)
  const [authMode, setAuthMode] = useState<AuthMode>("login")

  const openAuthDialog = (mode: AuthMode = "login") => {
    setAuthMode(mode)
    setIsAuthDialogOpen(true)
  }
  
  const closeAuthDialog = () => setIsAuthDialogOpen(false)

  return {
    isAuthDialogOpen,
    authMode,
    openAuthDialog,
    closeAuthDialog,
    setAuthMode,
  }
} 