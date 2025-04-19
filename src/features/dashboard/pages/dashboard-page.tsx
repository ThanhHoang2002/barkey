import { 
  ArrowUp, 
  ArrowDown, 
  DollarSign, 
  CakeSlice,
  ShoppingBasket,
  Users,
  Filter
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import DashboardLayout from '@/components/layout/dashboard-layout';
import { Card } from '@/components/ui/card';

const DashboardPage = () => {
  const [dateRange, setDateRange] = useState('Last 30 days');
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <DashboardLayout>
      <div className="mb-8 sm:flex sm:items-center sm:justify-between">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl font-bold md:text-3xl">Bakery Dashboard</h1>
        </div>
        <div className="grid grid-flow-col gap-2">
          <div className="relative">
            <button
              className="flex items-center rounded-md border border-border px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <Filter className="mr-2 h-4 w-4" />
              <span>{dateRange}</span>
            </button>
            {filterOpen && (
              <div className="absolute right-0 mt-2 rounded-md border border-border bg-card p-2 shadow-lg">
                <div className="px-3 py-2 text-xs font-semibold uppercase text-muted-foreground">
                  Select Range
                </div>
                <ul className="mt-2">
                  <li className="cursor-pointer rounded px-3 py-1 text-sm hover:bg-muted" onClick={() => {
                    setDateRange('Today');
                    setFilterOpen(false);
                  }}>
                    Today
                  </li>
                  <li className="cursor-pointer rounded px-3 py-1 text-sm hover:bg-muted" onClick={() => {
                    setDateRange('Last 7 days');
                    setFilterOpen(false);
                  }}>
                    Last 7 days
                  </li>
                  <li className="cursor-pointer rounded px-3 py-1 text-sm hover:bg-muted" onClick={() => {
                    setDateRange('Last 30 days');
                    setFilterOpen(false);
                  }}>
                    Last 30 days
                  </li>
                  <li className="cursor-pointer rounded px-3 py-1 text-sm hover:bg-muted" onClick={() => {
                    setDateRange('Last 12 months');
                    setFilterOpen(false);
                  }}>
                    Last 12 months
                  </li>
                  <li className="cursor-pointer rounded px-3 py-1 text-sm hover:bg-muted" onClick={() => {
                    setDateRange('All time');
                    setFilterOpen(false);
                  }}>
                    All time
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Card 1 - Total Revenue */}
        <Card className="flex flex-col p-6">
          <div className="flex items-center justify-between">
            <div className="rounded-full bg-primary/10 p-2">
              <DollarSign className="h-5 w-5 text-primary" />
            </div>
            <div className="flex items-center">
              <span className="flex items-center text-sm font-medium text-green-500">
                <ArrowUp className="mr-0.5 h-4 w-4" />
                <span>49%</span>
              </span>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-muted-foreground">Total Revenue</h3>
            <p className="mt-2 text-3xl font-bold">$24,780</p>
          </div>
          <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full bg-primary" style={{ width: '75%' }} />
          </div>
        </Card>

        {/* Card 2 - Total Orders */}
        <Card className="flex flex-col p-6">
          <div className="flex items-center justify-between">
            <div className="rounded-full bg-primary/10 p-2">
              <ShoppingBasket className="h-5 w-5 text-primary" />
            </div>
            <div className="flex items-center">
              <span className="flex items-center text-sm font-medium text-green-500">
                <ArrowUp className="mr-0.5 h-4 w-4" />
                <span>24%</span>
              </span>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-muted-foreground">Total Orders</h3>
            <p className="mt-2 text-3xl font-bold">492</p>
          </div>
          <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full bg-primary" style={{ width: '65%' }} />
          </div>
        </Card>

        {/* Card 3 - Products Sold */}
        <Card className="flex flex-col p-6">
          <div className="flex items-center justify-between">
            <div className="rounded-full bg-primary/10 p-2">
              <CakeSlice className="h-5 w-5 text-primary" />
            </div>
            <div className="flex items-center">
              <span className="flex items-center text-sm font-medium text-red-500">
                <ArrowDown className="mr-0.5 h-4 w-4" />
                <span>12%</span>
              </span>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-muted-foreground">Products Sold</h3>
            <p className="mt-2 text-3xl font-bold">1,482</p>
          </div>
          <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full bg-primary" style={{ width: '40%' }} />
          </div>
        </Card>

        {/* Card 4 - New Customers */}
        <Card className="flex flex-col p-6">
          <div className="flex items-center justify-between">
            <div className="rounded-full bg-primary/10 p-2">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div className="flex items-center">
              <span className="flex items-center text-sm font-medium text-green-500">
                <ArrowUp className="mr-0.5 h-4 w-4" />
                <span>32%</span>
              </span>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-muted-foreground">New Customers</h3>
            <p className="mt-2 text-3xl font-bold">89</p>
          </div>
          <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full bg-primary" style={{ width: '55%' }} />
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-bold">Sales Overview</h2>
            <div className="text-sm text-muted-foreground">{dateRange}</div>
          </div>
          <div className="h-64 w-full">
            <div className="flex h-full items-end justify-between">
              <div className="relative h-3/5 w-[8%] rounded-t bg-chart-1">
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium">Mon</span>
              </div>
              <div className="relative h-2/3 w-[8%] rounded-t bg-chart-1">
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium">Tue</span>
              </div>
              <div className="relative h-2/5 w-[8%] rounded-t bg-chart-1">
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium">Wed</span>
              </div>
              <div className="relative h-4/5 w-[8%] rounded-t bg-chart-1">
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium">Thu</span>
              </div>
              <div className="relative h-3/5 w-[8%] rounded-t bg-chart-1">
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium">Fri</span>
              </div>
              <div className="relative h-5/6 w-[8%] rounded-t bg-chart-1">
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium">Sat</span>
              </div>
              <div className="relative h-full w-[8%] rounded-t bg-chart-1">
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium">Sun</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-bold">Top Selling Products</h2>
            <Link to="/admin/products" className="text-sm text-primary hover:underline">View all</Link>
          </div>
          <div className="h-64 overflow-hidden">
            <ul className="space-y-4">
              <li className="flex items-center">
                <div className="mr-4 h-12 w-12 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                  <div className="flex h-full w-full items-center justify-center bg-primary/20">
                    <CakeSlice className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Chocolate Cake</h3>
                  <p className="text-sm text-muted-foreground">$18.99</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">124 sold</p>
                  <p className="text-sm text-muted-foreground">$2,355.76</p>
                </div>
              </li>
              <li className="flex items-center">
                <div className="mr-4 h-12 w-12 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                  <div className="flex h-full w-full items-center justify-center bg-primary/20">
                    <CakeSlice className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Croissant</h3>
                  <p className="text-sm text-muted-foreground">$3.99</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">315 sold</p>
                  <p className="text-sm text-muted-foreground">$1,256.85</p>
                </div>
              </li>
              <li className="flex items-center">
                <div className="mr-4 h-12 w-12 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                  <div className="flex h-full w-full items-center justify-center bg-primary/20">
                    <CakeSlice className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Blueberry Muffin</h3>
                  <p className="text-sm text-muted-foreground">$4.50</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">210 sold</p>
                  <p className="text-sm text-muted-foreground">$945.00</p>
                </div>
              </li>
            </ul>
          </div>
        </Card>
      </div>

      {/* Recent transactions */}
      <div className="mt-8">
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-bold">Recent Orders</h2>
            <Link to="/admin/orders" className="text-sm text-primary hover:underline">View all</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-left text-sm font-medium text-muted-foreground">
                  <th className="pb-3 pr-4">Order ID</th>
                  <th className="pb-3 pr-4">Customer</th>
                  <th className="pb-3 pr-4">Products</th>
                  <th className="pb-3 pr-4">Date</th>
                  <th className="pb-3 pr-4">Amount</th>
                  <th className="pb-3 pr-4">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border text-sm">
                  <td className="py-4 pr-4">#ORD-001</td>
                  <td className="py-4 pr-4">John Smith</td>
                  <td className="py-4 pr-4">Chocolate Cake, Croissant (2)</td>
                  <td className="py-4 pr-4">Today, 10:45 AM</td>
                  <td className="py-4 pr-4 font-medium">$26.97</td>
                  <td className="py-4 pr-4">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                      Completed
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-border text-sm">
                  <td className="py-4 pr-4">#ORD-002</td>
                  <td className="py-4 pr-4">Sarah Johnson</td>
                  <td className="py-4 pr-4">Blueberry Muffin (4)</td>
                  <td className="py-4 pr-4">Today, 09:12 AM</td>
                  <td className="py-4 pr-4 font-medium">$18.00</td>
                  <td className="py-4 pr-4">
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                      Processing
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-border text-sm">
                  <td className="py-4 pr-4">#ORD-003</td>
                  <td className="py-4 pr-4">Maria Garcia</td>
                  <td className="py-4 pr-4">Chocolate Cake, Blueberry Muffin (2)</td>
                  <td className="py-4 pr-4">Yesterday, 4:45 PM</td>
                  <td className="py-4 pr-4 font-medium">$27.99</td>
                  <td className="py-4 pr-4">
                    <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                      Pending
                    </span>
                  </td>
                </tr>
                <tr className="text-sm">
                  <td className="py-4 pr-4">#ORD-004</td>
                  <td className="py-4 pr-4">Robert Wilson</td>
                  <td className="py-4 pr-4">Croissant (5)</td>
                  <td className="py-4 pr-4">Yesterday, 2:30 PM</td>
                  <td className="py-4 pr-4 font-medium">$19.95</td>
                  <td className="py-4 pr-4">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                      Completed
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage; 