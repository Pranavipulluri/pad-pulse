
import { motion } from 'framer-motion';
import { ShoppingCart, Package, History, AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from 'sonner';

const UserDashboard = () => {
  const handlePurchase = () => {
    // Implement Google Pay integration here
    toast.success("Purchase initiated!");
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
          <h1 className="text-3xl font-bold text-gray-900">Vending Machine</h1>
          <Button variant="outline" className="gap-2">
            <History className="w-4 h-4" />
            History
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Stock Status</h2>
              <Package className="w-6 h-6 text-primary" />
            </div>
            <p className="text-3xl font-bold text-primary">15 units</p>
            <p className="text-gray-600">Available for purchase</p>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Quick Purchase</h2>
              <ShoppingCart className="w-6 h-6 text-secondary" />
            </div>
            <div className="space-y-2">
              <p className="text-gray-600">Price per unit: ₹10</p>
              <Button onClick={handlePurchase} className="w-full gap-2">
                Pay with Google Pay
              </Button>
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Need Help?</h2>
              <AlertCircle className="w-6 h-6 text-primary" />
            </div>
            <p className="text-gray-600">Contact support for assistance</p>
            <Button variant="outline" className="w-full">Contact Support</Button>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default UserDashboard;
