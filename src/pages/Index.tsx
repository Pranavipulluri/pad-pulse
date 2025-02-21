
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8"
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome</h1>
          <p className="text-gray-600">Please select your role to continue</p>
        </div>

        <div className="space-y-4">
          <Card
            className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate('/user')}
          >
            <h2 className="text-xl font-semibold mb-2">User Portal</h2>
            <p className="text-gray-600">Purchase products and view availability</p>
          </Card>

          <Card
            className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate('/admin')}
          >
            <h2 className="text-xl font-semibold mb-2">Admin Portal</h2>
            <p className="text-gray-600">Manage inventory and view analytics</p>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default Index;
