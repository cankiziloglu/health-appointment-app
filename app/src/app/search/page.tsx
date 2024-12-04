import { Button } from "@/components/ui/button"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function SearchPage() {
  return (
    <main className="min-h-screen p-4 md:p-6">
      {/* Search Form */}
      <div className="container mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <Select>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Select City" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="istanbul">Istanbul</SelectItem>
              <SelectItem value="ankara">Ankara</SelectItem>
              <SelectItem value="izmir">Izmir</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Select Specialty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cardiology">Cardiology</SelectItem>
              <SelectItem value="dermatology">Dermatology</SelectItem>
              <SelectItem value="neurology">Neurology</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Filters */}
      <div className="container mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <Select>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Provider Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Providers</SelectItem>
              <SelectItem value="hospital">Hospitals</SelectItem>
              <SelectItem value="private">Private Practitioners</SelectItem>
            </SelectContent>
          </Select>

          <input
            type="date"
            className="px-3 py-2 rounded-md border"
            placeholder="Select Date"
          />
        </div>
      </div>

      {/* Results Grid */}
      <div className="container">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Doctor Card - We'll map through results later */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6 space-y-4">
              <div className="aspect-square rounded-full bg-gray-100 mb-4" />
              <div>
                <h3 className="text-lg font-semibold">Dr. John Doe</h3>
                <p className="text-sm text-gray-500">Istanbul Medical Center</p>
                <p className="text-sm text-gray-500">Cardiology</p>
                <p className="text-sm text-gray-500">Kadıköy, Istanbul</p>
              </div>
              <div>
                <p className="text-sm font-medium">Next Available</p>
                <p className="text-sm text-gray-500">Tomorrow, 10:00 AM</p>
              </div>
              <Button className="w-full">View Profile</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 