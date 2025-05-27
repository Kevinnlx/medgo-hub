'use client';

import { useAuth } from "@/contexts/AuthContext";
import AuthenticatedHeader from "@/components/AuthenticatedHeader";
import PlatformSidebar from "@/components/PlatformSidebar";

interface PlatformLayoutProps {
  children: React.ReactNode;
  currentPage?: string;
}

const PlatformLayout = ({ children, currentPage }: PlatformLayoutProps) => {
  const { user, isPlatformUser } = useAuth();

  if (!user) return null;

  const shouldShowSidebar = isPlatformUser();

  return (
    <div className="min-h-screen bg-gray-50">
      {shouldShowSidebar ? (
        <>
          {/* Platform Layout con Sidebar */}
          <PlatformSidebar currentPage={currentPage} />
          
          {/* Header simplificado para PLATFORM */}
          <div className="lg:ml-72 transition-all duration-300">
            <AuthenticatedHeader currentPage={currentPage} />
            
            {/* Main content */}
            <main className="p-4 lg:p-6">
              <div className="max-w-7xl mx-auto">
                {children}
              </div>
            </main>
          </div>
        </>
      ) : (
        <>
          {/* Layout normal para PROVIDER y STAFF */}
          <AuthenticatedHeader currentPage={currentPage} />
          
          {/* Main content */}
          <main className="p-4 lg:p-6">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </>
      )}
    </div>
  );
};

export default PlatformLayout; 