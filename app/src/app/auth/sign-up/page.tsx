import { SignUp } from "@clerk/nextjs"

export default function SignUpPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 md:p-6">
      <SignUp
        appearance={{
          elements: {
            rootBox: "mx-auto w-full max-w-md",
            card: "rounded-lg shadow-none border",
            headerTitle: "text-2xl font-bold",
            headerSubtitle: "text-gray-600",
            socialButtonsBlockButton: "rounded-md",
            formButtonPrimary: "rounded-md bg-primary hover:bg-primary/90",
            footerAction: "text-sm",
            formFieldLabel: "text-sm font-medium",
            formFieldInput: "rounded-md border",
          },
        }}
        routing="path"
        path="/auth/sign-up"
        signInUrl="/auth"
        redirectUrl="/dashboard"
      />
    </main>
  )
} 