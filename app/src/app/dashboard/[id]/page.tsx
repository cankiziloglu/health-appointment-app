import { Button } from "@/components/ui/button"

export default function DashboardPage({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen p-4 md:p-6">
      {/* Dashboard Header */}
      <div className="container mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button>Edit Profile</Button>
        </div>
      </div>

      {/* Dashboard Tabs */}
      <div className="container mb-8">
        <div className="flex gap-4 border-b">
          <button className="px-4 py-2 text-sm font-medium border-b-2 border-primary">
            Profile
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-500">
            Appointments
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-500">
            Calendar
          </button>
        </div>
      </div>

      {/* Profile Tab Content */}
      <div className="container">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Personal Information */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Personal Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded-md border"
                  placeholder="Dr. John Doe"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 rounded-md border"
                  placeholder="john.doe@example.com"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 rounded-md border"
                  placeholder="+90 555 123 4567"
                  disabled
                />
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Professional Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Specialty</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded-md border"
                  placeholder="Cardiology"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Provider</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded-md border"
                  placeholder="Istanbul Medical Center"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded-md border"
                  placeholder="Kadıköy, Istanbul"
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Appointments Tab Content - Hidden by default */}
      <div className="container hidden">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Upcoming Appointments</h2>
            <Button variant="outline">Export</Button>
          </div>
          <div className="border rounded-lg divide-y">
            {/* Appointment Item */}
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">John Smith</p>
                  <p className="text-sm text-gray-500">Tomorrow, 10:00 AM</p>
                </div>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Tab Content - Hidden by default */}
      <div className="container hidden">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Availability Calendar</h2>
            <Button variant="outline">Block Time Slot</Button>
          </div>
          {/* Calendar will be implemented later */}
          <div className="h-96 border rounded-lg"></div>
        </div>
      </div>
    </main>
  )
} 