
import React from 'react';
import { motion } from 'framer-motion';
import { Package, AlertTriangle, History, RefreshCcw, MapPin, Bell, X } from 'lucide-react';
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

// Mock data for alert messages
const alertMessages = [
  { 
    id: 1, 
    location: "Girls Hostel A",
    message: "Machine not dispensing properly",
    timestamp: "2 hours ago",
    status: "Urgent",
    user: "Room 202"
  },
  { 
    id: 2, 
    location: "Library - Ground Floor",
    message: "Product quality issue reported",
    timestamp: "3 hours ago",
    status: "Medium",
    user: "Student ID 123"
  },
  { 
    id: 3, 
    location: "Sports Complex",
    message: "Machine display not working",
    timestamp: "5 hours ago",
    status: "Low",
    user: "Staff Member"
  },
];

const AdminDashboard: React.FC = () => {
  const handleRefillStock = (machineId: number) => {
    toast.success(`Stock refill request submitted for machine ${machineId}!`);
  };

  const handleDismissAlert = (alertId: number) => {
    toast.success("Alert dismissed successfully");
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

  const getAlertStatusColor = (status: string) => {
    switch (status) {
      case "Urgent":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto space-y-8"
      >
        <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <Button 
            variant="outline" 
            className="gap-2 hover:bg-primary hover:text-white transition-all duration-300"
          >
            <History className="w-4 h-4" />
            Transaction History
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Total Stock</h2>
                <Package className="w-6 h-6 text-primary" />
              </div>
              <p className="text-4xl font-bold text-primary">{getTotalStock()} units</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Low Stock Alert</h2>
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
              <p className="text-4xl font-bold text-yellow-600">{getLowStockCount()} machines</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Out of Stock</h2>
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <p className="text-4xl font-bold text-red-600">{getOutOfStockCount()} machines</p>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6 bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Bell className="w-5 h-5 text-primary" />
                  Alert Messages
                </h2>
                <span className="px-3 py-1 rounded-full text-sm bg-primary/10 text-primary font-medium animate-pulse">
                  {alertMessages.length} New
                </span>
              </div>
              <div className="space-y-4 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700">
                {alertMessages.map((alert) => (
                  <motion.div 
                    key={alert.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getAlertStatusColor(alert.status)}`}>
                          {alert.status}
                        </span>
                        <span className="text-sm text-gray-500">{alert.timestamp}</span>
                      </div>
                      <p className="font-medium">{alert.location}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{alert.message}</p>
                      <p className="text-sm text-gray-500">Reported by: {alert.user}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDismissAlert(alert.id)}
                      className="text-gray-500 hover:text-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6 bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-xl font-semibold mb-6">Machine Status Overview</h2>
              <div className="grid grid-cols-1 gap-4 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700">
                {machines.map((machine) => (
                  <motion.div
                    key={machine.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Card 
                      className={`p-4 border-l-4 hover:shadow-md transition-shadow duration-300 ${
                        machine.stock === 0 ? 'border-l-red-600 bg-red-50 dark:bg-red-900/20' : 
                        machine.stock <= 5 ? 'border-l-yellow-600 bg-yellow-50 dark:bg-yellow-900/20' : 'border-l-green-600 bg-green-50 dark:bg-green-900/20'
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
                          <p className="text-sm text-gray-600 dark:text-gray-300">Stock: {machine.stock} units</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRefillStock(machine.id)}
                          className="gap-1 hover:bg-primary hover:text-white transition-colors duration-300"
                        >
                          <RefreshCcw className="w-3 h-3" />
                          Refill
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-6 bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-semibold mb-6">Stock Level Trend</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#6B7280"
                    tickLine={false}
                  />
                  <YAxis 
                    stroke="#6B7280"
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="stock"
                    stroke="#9F7AEA"
                    strokeWidth={3}
                    dot={{ fill: '#9F7AEA', strokeWidth: 2 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
