'use client';

import PlatformLayout from "@/components/PlatformLayout";

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentPage?: string;
}

const DashboardLayout = ({ children, currentPage }: DashboardLayoutProps) => {
  return (
    <PlatformLayout currentPage={currentPage}>
      {children}
    </PlatformLayout>
  );
};

export default DashboardLayout; 