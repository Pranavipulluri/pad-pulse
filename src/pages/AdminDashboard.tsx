
import { motion } from 'framer-motion';
import { Package, AlertTriangle, History, RefreshCcw } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from 'sonner';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Mon', stock: 20 },
  { name: 'Tue', stock: 18 },
  { name: 'Wed', stock: 15 },
  { name: 'Thu', stock: 12 },
  { name: 'Fri', stock: 10 },
  { name: 'Sat', stock: 8 },
  { name: 'Sun', stock: 15 },
];

const AdminDashboard = () => {
  const handleRefillStock = () => {
    toast.success("Stock refill request submitted!");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto space-y-8"
      >
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <Button variant="outline" className="gap-2">
            <History className="w-4 h-4" />
            Transaction History
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Current Stock</h2>
              <Package className="w-6 h-6 text-primary" />
            </div>
            <p className="text-3xl font-bold text-primary">15 units</p>
            <Button onClick={handleRefillStock} className="w-full gap-2">
              <RefreshCcw className="w-4 h-4" />
              Refill Stock
            </Button>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Low Stock Alert</h2>
              <AlertTriangle className="w-6 h-6 text-destructive" />
            </div>
            <p className="text-gray-600">Threshold: 10 units</p>
            <p className="text-destructive">Current stock is approaching low levels!</p>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Today's Sales</h2>
              <History className="w-6 h-6 text-secondary" />
            </div>
            <p className="text-3xl font-bold text-secondary">5 units</p>
            <p className="text-gray-600">Total Revenue: ₹50</p>
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Stock Level Trend</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="stock"
                  stroke="#9F7AEA"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
