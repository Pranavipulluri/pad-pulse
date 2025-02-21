
import React from 'react';
import { motion } from 'framer-motion';
import { Package, AlertTriangle, History, RefreshCcw, MapPin } from 'lucide-react';
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

// Mock data for vending machines
const machines = [
  { id: 1, location: "Library - Ground Floor", stock: 15, status: "Available" },
  { id: 2, location: "Girls Hostel A", stock: 8, status: "Low Stock" },
  { id: 3, location: "Academic Block - 1st Floor", stock: 20, status: "Available" },
  { id: 4, location: "Sports Complex", stock: 0, status: "Out of Stock" },
  { id: 5, location: "Cafeteria", stock: 12, status: "Available" },
  { id: 6, location: "Girls Hostel B", stock: 0, status: "Out of Stock" },
];

const AdminDashboard: React.FC = () => {
  const handleRefillStock = (machineId: number) => {
    toast.success(`Stock refill request submitted for machine ${machineId}!`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "text-green-600";
      case "Low Stock":
        return "text-yellow-600";
      case "Out of Stock":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getTotalStock = () => {
    return machines.reduce((acc, machine) => acc + machine.stock, 0);
  };

  const getLowStockCount = () => {
    return machines.filter(machine => machine.stock <= 5 && machine.stock > 0).length;
  };

  const getOutOfStockCount = () => {
    return machines.filter(machine => machine.stock === 0).length;
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
              <h2 className="text-xl font-semibold">Total Stock</h2>
              <Package className="w-6 h-6 text-primary" />
            </div>
            <p className="text-3xl font-bold text-primary">{getTotalStock()} units</p>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Low Stock Alert</h2>
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
            <p className="text-3xl font-bold text-yellow-600">{getLowStockCount()} machines</p>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Out of Stock</h2>
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <p className="text-3xl font-bold text-red-600">{getOutOfStockCount()} machines</p>
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Machine Status Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {machines.map((machine) => (
              <Card 
                key={machine.id} 
                className={`p-4 border-l-4 ${
                  machine.stock === 0 ? 'border-l-red-600 bg-red-50' : 
                  machine.stock <= 5 ? 'border-l-yellow-600' : 'border-l-green-600'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <h3 className="font-semibold">{machine.location}</h3>
                    </div>
                    <p className={`${getStatusColor(machine.status)}`}>
                      {machine.status}
                    </p>
                    <p className="text-sm text-gray-600">Stock: {machine.stock} units</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRefillStock(machine.id)}
                    className="gap-1"
                  >
                    <RefreshCcw className="w-3 h-3" />
                    Refill
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Card>

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
