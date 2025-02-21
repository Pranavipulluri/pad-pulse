
import { motion } from 'framer-motion';
import { ShoppingCart, Package, History, AlertCircle, MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from 'sonner';

// Mock data for vending machines - in a real app, this would come from your backend
const vendingMachines = [
  { id: 1, location: "Library - Ground Floor", stock: 15, status: "Available" },
  { id: 2, location: "Girls Hostel A", stock: 8, status: "Low Stock" },
  { id: 3, location: "Academic Block - 1st Floor", stock: 20, status: "Available" },
  { id: 4, location: "Sports Complex", stock: 0, status: "Out of Stock" },
  { id: 5, location: "Cafeteria", stock: 12, status: "Available" },
  { id: 6, location: "Girls Hostel B", stock: 5, status: "Low Stock" },
];

const UserDashboard = () => {
  const handlePurchase = (machineId: number) => {
    // Implement Google Pay integration here
    toast.success("Purchase initiated!");
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

  return (
    <div className="min-h-screen bg-background">
      {/* Banner Section */}
      <div className="bg-primary text-white p-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-4"
          >
            <h1 className="text-4xl font-bold">Sanitary Pad Vending Machines</h1>
            <p className="text-xl">Find and purchase from machines across campus</p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-900">Available Machines</h2>
          <Button variant="outline" className="gap-2">
            <History className="w-4 h-4" />
            Purchase History
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendingMachines.map((machine) => (
            <motion.div
              key={machine.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-6 space-y-4 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      <h3 className="text-lg font-semibold">{machine.location}</h3>
                    </div>
                    <p className={`mt-2 ${getStatusColor(machine.status)}`}>
                      {machine.status}
                    </p>
                  </div>
                  <Package className="w-6 h-6 text-primary" />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <p className="text-gray-600">Available Stock:</p>
                    <p className="text-xl font-bold text-primary">{machine.stock} units</p>
                  </div>
                  <p className="text-gray-600">Price per unit: ₹10</p>
                  <Button 
                    onClick={() => handlePurchase(machine.id)} 
                    className="w-full gap-2"
                    disabled={machine.stock === 0}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Pay with Google Pay
                  </Button>
                </div>

                {machine.stock <= 5 && machine.stock > 0 && (
                  <div className="flex items-center gap-2 text-yellow-600">
                    <AlertCircle className="w-4 h-4" />
                    <p className="text-sm">Low stock alert!</p>
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
