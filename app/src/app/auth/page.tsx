import { Button } from "@/components/ui/button"


export default function AuthPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 md:p-6">
      <div className="w-full max-w-md space-y-8">
        {/* Auth Tabs */}
        <div className="flex rounded-lg border p-1">
          <button className="flex-1 rounded-md py-2 text-sm font-medium bg-primary text-primary-foreground">
            Login
          </button>
          <button className="flex-1 rounded-md py-2 text-sm font-medium">
            Register
          </button>
        </div>

        {/* Login Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 rounded-md border"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 rounded-md border"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-gray-300" />
              <span className="text-sm">Remember me</span>
            </label>
            <a href="#" className="text-sm text-primary hover:underline">
              Forgot Password?
            </a>
          </div>
          <Button className="w-full">Login</Button>
        </div>

        {/* Registration Form - Hidden by default */}
        <div className="space-y-4 hidden">
          <div>
            <label className="block text-sm font-medium mb-1">Provider Type</label>
            <select className="w-full px-3 py-2 rounded-md border">
              <option value="">Select Provider Type</option>
              <option value="hospital">Hospital/Clinic</option>
              <option value="private">Private Practitioner</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 rounded-md border"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Confirm Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 rounded-md border"
              placeholder="Confirm your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 rounded-md border"
              placeholder="Create a password"
            />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" className="rounded border-gray-300" />
            <span className="text-sm">
              I agree to the{" "}
              <a href="#" className="text-primary hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-primary hover:underline">
                Privacy Policy
              </a>
            </span>
          </div>
          <Button className="w-full">Register</Button>
        </div>
      </div>
    </main>
  )
} 