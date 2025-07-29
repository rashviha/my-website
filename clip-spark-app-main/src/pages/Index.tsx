import { useState } from "react";
import AuthPage from "@/components/AuthPage";
import ClientDashboard from "@/components/ClientDashboard";
import FactoryDashboard from "@/components/FactoryDashboard";

const Index = () => {
  const [user, setUser] = useState<{ type: 'client' | 'factory' } | null>(null);

  const handleLogin = (userType: 'client' | 'factory') => {
    setUser({ type: userType });
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <AuthPage onLogin={handleLogin} />;
  }

  if (user.type === 'client') {
    return <ClientDashboard onLogout={handleLogout} />;
  }

  return <FactoryDashboard onLogout={handleLogout} />;
};

export default Index;
