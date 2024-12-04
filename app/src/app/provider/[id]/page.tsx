import { Button } from "@/components/ui/button"

export default function ProviderPage({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen p-4 md:p-6">
      {/* Provider Header */}
      <div className="container mb-12">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Logo */}
          <div className="w-32 h-32 rounded-lg bg-gray-100" />
          
          {/* Info */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">Istanbul Medical Center</h1>
            <div className="space-y-2">
              <p className="text-gray-500">Multi-specialty Healthcare Provider</p>
              <p className="text-gray-500">Kadıköy, Istanbul</p>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="container mb-12">
        <h2 className="text-2xl font-semibold mb-4">About</h2>
        <p className="text-gray-600">
          A leading healthcare provider in Istanbul, offering comprehensive medical services
          with state-of-the-art facilities and experienced healthcare professionals.
        </p>
      </div>

      {/* Doctors Section */}
      <div className="container">
        <h2 className="text-2xl font-semibold mb-6">Our Doctors</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Doctor Card - We'll map through doctors later */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6 space-y-4">
              <div className="aspect-square rounded-full bg-gray-100 mb-4" />
              <div>
                <h3 className="text-lg font-semibold">Dr. John Doe</h3>
                <p className="text-sm text-gray-500">Cardiology</p>
              </div>
              <Button className="w-full">View Profile</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 