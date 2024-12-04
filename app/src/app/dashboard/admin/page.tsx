import { Button } from "@/components/ui/button"

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen p-4 md:p-6">
      {/* Dashboard Header */}
      <div className="container mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex gap-4">
            <Button variant="outline">Export Data</Button>
            <Button>Add New Provider</Button>
          </div>
        </div>
      </div>

      {/* Verification Queue */}
      <div className="container mb-12">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Verification Queue</h2>
          <div className="border rounded-lg divide-y">
            {/* Provider Item */}
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">Istanbul Medical Center</h3>
                  <p className="text-sm text-gray-500">Hospital</p>
                  <p className="text-sm text-gray-500">Registered: Dec 4, 2023</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button variant="destructive" size="sm">
                    Reject
                  </Button>
                  <Button size="sm">
                    Approve
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Provider List */}
      <div className="container">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Verified Providers</h2>
            <div className="flex gap-4">
              <input
                type="search"
                placeholder="Search providers..."
                className="px-3 py-2 rounded-md border"
              />
              <select className="px-3 py-2 rounded-md border">
                <option value="">All Types</option>
                <option value="hospital">Hospitals</option>
                <option value="private">Private Practitioners</option>
              </select>
            </div>
          </div>

          <div className="border rounded-lg divide-y">
            {/* Provider Item */}
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">Ankara Medical Center</h3>
                  <p className="text-sm text-gray-500">Hospital</p>
                  <p className="text-sm text-gray-500">15 Doctors</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button variant="destructive" size="sm">
                    Suspend
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 