import { Button } from "@/components/ui/button"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Find Your Doctor, Book Instantly
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
              Quick and easy medical appointments in Turkey. No registration required.
            </p>
            
            {/* Search Box */}
            <div className="w-full max-w-sm space-y-4 mt-8">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select City" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="istanbul">Istanbul</SelectItem>
                  <SelectItem value="ankara">Ankara</SelectItem>
                  <SelectItem value="izmir">Izmir</SelectItem>
                </SelectContent>
              </Select>
              
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Specialty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cardiology">Cardiology</SelectItem>
                  <SelectItem value="dermatology">Dermatology</SelectItem>
                  <SelectItem value="neurology">Neurology</SelectItem>
                </SelectContent>
              </Select>
              
              <Button className="w-full" size="lg">
                Search Appointments
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-3">
            {/* No Registration Required */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">
                {/* Icon placeholder */}
                <div className="w-12 h-12 rounded-full bg-primary/10" />
              </div>
              <h3 className="text-xl font-bold">No Registration Required</h3>
              <p className="text-gray-500">Book appointments instantly without creating an account</p>
            </div>

            {/* Instant Booking */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">
                {/* Icon placeholder */}
                <div className="w-12 h-12 rounded-full bg-primary/10" />
              </div>
              <h3 className="text-xl font-bold">Instant Booking</h3>
              <p className="text-gray-500">Confirm your appointment in seconds</p>
            </div>

            {/* Wide Provider Network */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">
                {/* Icon placeholder */}
                <div className="w-12 h-12 rounded-full bg-primary/10" />
              </div>
              <h3 className="text-xl font-bold">Wide Provider Network</h3>
              <p className="text-gray-500">Access to top healthcare providers across Turkey</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
