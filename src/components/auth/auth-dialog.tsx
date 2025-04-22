import { zodResolver } from "@hookform/resolvers/zod"
import { useCallback, useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Image } from '@/components/ui/image'
import { Input } from "@/components/ui/input"

type AuthMode = "login" | "register"

// Login schema
const loginSchema = z.object({
  email: z.string()
    .min(1, { message: "Email là bắt buộc" })
    .email({ message: "Email không hợp lệ" }),
  password: z.string()
    .min(1, { message: "Mật khẩu là bắt buộc" }),
  rememberMe: z.boolean().optional()
})

// Register schema
const registerSchema = z.object({
  name: z.string()
    .min(1, { message: "Họ và tên là bắt buộc" }),
  email: z.string()
    .min(1, { message: "Email là bắt buộc" })
    .email({ message: "Email không hợp lệ" }),
  phoneNumber: z.string()
    .min(1, { message: "Số điện thoại là bắt buộc" })
    .regex(/^[0-9]{10,11}$/, { message: "Số điện thoại không hợp lệ" }),
  password: z.string()
    .min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" }),
  confirmPassword: z.string()
    .min(1, { message: "Xác nhận mật khẩu là bắt buộc" }),
  terms: z.boolean()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Mật khẩu không khớp",
  path: ["confirmPassword"]
}).refine((data) => data.terms === true, {
  message: "Bạn phải đồng ý với điều khoản và chính sách bảo mật",
  path: ["terms"]
})

// Types
type LoginFormValues = z.infer<typeof loginSchema>
type RegisterFormValues = z.infer<typeof registerSchema>

interface AuthDialogProps {
  isOpen: boolean
  onClose: () => void
  initialMode?: AuthMode
  onModeChange?: (mode: AuthMode) => void
}

export const AuthDialog = ({ 
  isOpen, 
  onClose, 
  initialMode = "login",
  onModeChange
}: AuthDialogProps) => {
  const [mode, setMode] = useState<AuthMode>(initialMode)
  const [isAnimating, setIsAnimating] = useState(false)

  // Login form with Zod validation
  const { 
    register: registerLogin, 
    handleSubmit: handleLoginSubmit, 
    formState: { errors: loginErrors, isSubmitting: isLoginSubmitting },
    reset: resetLoginForm
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false
    }
  })

  // Register form with Zod validation
  const { 
    register: registerSignup, 
    handleSubmit: handleRegisterSubmit, 
    formState: { errors: registerErrors, isSubmitting: isRegisterSubmitting },
    reset: resetRegisterForm
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      terms: false
    }
  })

  // Update local mode state when initialMode changes
  useEffect(() => {
    if (initialMode) {
      setMode(initialMode)
    }
  }, [initialMode])

  // Memoize form reset functions
  const resetForms = useCallback(() => {
    resetLoginForm()
    resetRegisterForm()
  }, [resetLoginForm, resetRegisterForm])

  // Reset forms when dialog is closed
  useEffect(() => {
    if (!isOpen) {
      resetForms()
    }
  }, [isOpen, resetForms])

  // Form submission handlers
  const onLoginSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log("Login submitted", data)
      // TODO: Implement login functionality
      onClose()
    } catch (error) {
      console.error("Login error:", error)
    }
  }

  const onRegisterSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log("Register submitted", data)
      // TODO: Implement register functionality
      onClose()
    } catch (error) {
      console.error("Registration error:", error)
    }
  }

  const toggleMode = () => {
    setIsAnimating(true)
    setTimeout(() => {
      const newMode = mode === "login" ? "register" : "login"
      setMode(newMode)
      onModeChange?.(newMode)
      setTimeout(() => {
        setIsAnimating(false)
      }, 300)
    }, 300)
  }

  // Images for the different modes
  const loginBackgroundImage = "https://images.unsplash.com/photo-1595475207225-428b62bda831?q=80&w=2080&auto=format&fit=crop"
  const registerBackgroundImage = "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2080&auto=format&fit=crop"

  return (
    <Dialog open={isOpen} onOpenChange={(open: boolean) => !open && onClose()}>
      <DialogContent className="flex h-auto max-h-[90vh] min-h-[580px] max-w-6xl flex-row overflow-hidden p-0 sm:rounded-2xl">
        {/* Content Container - handles dynamic positioning */}
        <div className={`z-40 flex w-full`}>
          {/* Image Section */}
          <div className={`hidden w-[50%] ${mode==='login'?'':'translate-x-full '}  z-20 transition-transform duration-500 md:block` }>          
            <div 
              className="relative h-full w-full overflow-hidden bg-cover bg-center" 
              style={{ 
                backgroundImage: `url('${mode === "login" ? loginBackgroundImage : registerBackgroundImage}')`
              }}
            >
              <div className="absolute inset-0 bg-primary/40"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <h2 className="mb-4 text-3xl font-bold text-white">Cosmo Bakery</h2>
                <p className="text-md mb-6 max-w-md leading-relaxed text-white">
                  {mode === "login"
                    ? "Đăng nhập để trải nghiệm những sản phẩm bánh tươi ngon và nhận các ưu đãi đặc biệt dành riêng cho thành viên."
                    : "Đăng ký tài khoản để khám phá thế giới bánh ngọt tuyệt vời và nhận nhiều ưu đãi hấp dẫn."
                  }
                </p>
                <Image 
                  src="https://freesvg.org/img/1547510251.png" 
                  alt="Bakery Logo" 
                  className="mt-4 h-40 w-40 object-contain opacity-80"
                  containerClassName="mt-4 h-40 w-40"
                />
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className={`w-full ${mode==='login'?'':'-translate-x-full ' } z-10 p-8  transition-transform duration-500 md:w-[50%]`}>
            <DialogHeader className="mb-6">
              <DialogTitle className="text-center text-2xl font-bold">
                {mode === "login" ? "Đăng nhập" : "Đăng ký tài khoản"}
              </DialogTitle>
              <DialogDescription className="text-center">
                {mode === "login"
                  ? "Đăng nhập vào tài khoản của bạn để tiếp tục."
                  : "Tạo tài khoản mới để trải nghiệm dịch vụ của chúng tôi."}
              </DialogDescription>
            </DialogHeader>

            <div className="h-[380px] overflow-y-auto">
              {mode === "login" ? (
                <form onSubmit={handleLoginSubmit(onLoginSubmit)} className="flex h-full flex-col justify-between space-y-5 py-4">
                  <div className="space-y-5">
                    <div className="space-y-3 px-1">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input
                        id="email"
                        placeholder="email@example.com"
                        className={`h-12 ${loginErrors.email ? "border-red-500" : ""}`}
                        {...registerLogin("email")}
                        disabled={isLoginSubmitting}
                      />
                      {loginErrors.email && (
                        <p className="text-xs text-red-500">{loginErrors.email.message}</p>
                      )}
                    </div>
                    <div className="space-y-3 px-1">
                      <label htmlFor="password" className="text-sm font-medium">
                        Mật khẩu
                      </label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className={`h-12 ${loginErrors.password ? "border-red-500" : ""}`}
                        {...registerLogin("password")}
                        disabled={isLoginSubmitting}
                      />
                      {loginErrors.password && (
                        <p className="text-xs text-red-500">{loginErrors.password.message}</p>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="rememberMe"
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          {...registerLogin("rememberMe")}
                          disabled={isLoginSubmitting}
                        />
                        <label htmlFor="rememberMe" className="text-sm text-gray-600">
                          Ghi nhớ tôi
                        </label>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-sm text-primary hover:text-primary/80"
                        disabled={isLoginSubmitting}
                      >
                        Quên mật khẩu?
                      </Button>
                    </div>
                  </div>
                  <div className="mt-auto">
                    <Button 
                      type="submit" 
                      className="h-12 w-full text-base font-medium"
                      disabled={isLoginSubmitting}
                    >
                      {isLoginSubmitting ? "Đang xử lý..." : "Đăng nhập"}
                    </Button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleRegisterSubmit(onRegisterSubmit)} className="grid h-full grid-cols-1 gap-x-4 gap-y-5 py-4 md:grid-cols-2">
                  <div className="space-y-2 px-1 md:col-span-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Họ và tên
                    </label>
                    <Input
                      id="name"
                      placeholder="Nguyễn Văn A"
                      className={`h-12 ${registerErrors.name ? "border-red-500" : ""}`}
                      {...registerSignup("name")}
                      disabled={isRegisterSubmitting}
                    />
                    {registerErrors.name && (
                      <p className="text-xs text-red-500">{registerErrors.name.message}</p>
                    )}
                  </div>
                  <div className="space-y-2 px-1">
                    <label htmlFor="registerEmail" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="registerEmail"
                      placeholder="email@example.com"
                      className={`h-12 ${registerErrors.email ? "border-red-500" : ""}`}
                      {...registerSignup("email")}
                      disabled={isRegisterSubmitting}
                    />
                    {registerErrors.email && (
                      <p className="text-xs text-red-500">{registerErrors.email.message}</p>
                    )}
                  </div>
                  <div className="space-y-2 px-1">
                    <label htmlFor="phoneNumber" className="text-sm font-medium">
                      Số điện thoại
                    </label>
                    <Input
                      id="phoneNumber"
                      placeholder="0912345678"
                      className={`h-12 ${registerErrors.phoneNumber ? "border-red-500" : ""}`}
                      {...registerSignup("phoneNumber")}
                      disabled={isRegisterSubmitting}
                    />
                    {registerErrors.phoneNumber && (
                      <p className="text-xs text-red-500">{registerErrors.phoneNumber.message}</p>
                    )}
                  </div>
                  <div className="space-y-2 px-1">
                    <label htmlFor="registerPassword" className="text-sm font-medium">
                      Mật khẩu
                    </label>
                    <Input
                      id="registerPassword"
                      type="password"
                      placeholder="••••••••"
                      className={`h-12 ${registerErrors.password ? "border-red-500" : ""}`}
                      {...registerSignup("password")}
                      disabled={isRegisterSubmitting}
                    />
                    {registerErrors.password && (
                      <p className="text-xs text-red-500">{registerErrors.password.message}</p>
                    )}
                  </div>
                  <div className="space-y-2 px-1">
                    <label htmlFor="confirmPassword" className="text-sm font-medium">
                      Xác nhận mật khẩu
                    </label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      className={`h-12 ${registerErrors.confirmPassword ? "border-red-500" : ""}`}
                      {...registerSignup("confirmPassword")}
                      disabled={isRegisterSubmitting}
                    />
                    {registerErrors.confirmPassword && (
                      <p className="text-xs text-red-500">{registerErrors.confirmPassword.message}</p>
                    )}
                  </div>
                  {registerErrors.terms && (
                    <p className="text-xs text-red-500 md:col-span-2">{registerErrors.terms.message}</p>
                  )}
                  <div className="mt-auto pt-2 md:col-span-2">
                    <Button 
                      type="submit" 
                      className="h-12 w-full text-base font-medium"
                      disabled={isRegisterSubmitting}
                    >
                      {isRegisterSubmitting ? "Đang xử lý..." : "Đăng ký"}
                    </Button>
                  </div>
                </form>
              )}
            </div>

            <div className="flex items-center justify-center space-x-2 border-t pt-6">
              <p className="text-sm text-gray-500">
                {mode === "login" ? "Chưa có tài khoản?" : "Đã có tài khoản?"}
              </p>
              <Button
                type="button"
                variant="link"
                onClick={toggleMode}
                className="h-10 w-full p-0 text-sm md:w-auto"
                disabled={isLoginSubmitting || isRegisterSubmitting || isAnimating}
              >
                {mode === "login" ? "Đăng ký ngay" : "Đăng nhập"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 