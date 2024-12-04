import { Button } from "@/components/ui/button"

export default function DoctorPage({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen p-4 md:p-6">
      {/* Doctor Header */}
      <div className="container mb-12">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Photo */}
          <div className="w-32 h-32 rounded-full bg-gray-100" />
          
          {/* Info */}
          <div className="space-y-4">
            <div>
              <h1 className="text-3xl font-bold">Dr. John Doe</h1>
              <p className="text-xl text-gray-500">Cardiology</p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-500">Istanbul Medical Center</p>
              <p className="text-gray-500">Kadıköy, Istanbul</p>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Details */}
      <div className="container mb-12">
        <h2 className="text-2xl font-semibold mb-4">Professional Details</h2>
        <div className="prose max-w-none">
          <p className="text-gray-600">
            Dr. John Doe is a board-certified cardiologist with over 15 years of experience
            in treating cardiovascular diseases. Specializing in preventive cardiology and
            cardiac imaging.
          </p>
        </div>
      </div>

      {/* Available Time Slots */}
      <div className="container">
        <h2 className="text-2xl font-semibold mb-6">Available Appointments</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Date Picker - We'll implement this later */}
          <div className="col-span-full mb-6">
            <input
              type="date"
              className="px-3 py-2 rounded-md border"
              placeholder="Select Date"
            />
          </div>

          {/* Time Slots */}
          <Button variant="outline" className="p-6">
            09:00 AM
          </Button>
          <Button variant="outline" className="p-6">
            10:00 AM
          </Button>
          <Button variant="outline" className="p-6">
            11:00 AM
          </Button>
        </div>
      </div>

      {/* Booking Form - This will be a modal */}
      <div className="fixed inset-0 bg-black/50 hidden">
        <div className="container flex items-center justify-center min-h-screen">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Book Appointment</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded-md border"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 rounded-md border"
                  placeholder="Your phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 rounded-md border"
                  placeholder="Your email"
                />
              </div>
              <Button className="w-full">Confirm Booking</Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
} 