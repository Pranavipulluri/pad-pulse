
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Index = () => {
  const navigate = useNavigate();

  // Automatically navigate to admin after animation
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/admin');
    }, 2000); // 2 seconds delay after animation

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8"
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome to SmartVend</h1>
          <p className="text-gray-600">Initializing admin dashboard...</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Index;
