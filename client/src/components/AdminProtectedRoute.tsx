import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AdminLogin from "@/pages/admin-login";

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

interface AuthStatusResponse {
  authenticated: boolean;
  timestamp: string;
  environment: string;
}

export default function AdminProtectedRoute({ children }: AdminProtectedRouteProps) {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const { data: authStatus, isLoading, error } = useQuery<AuthStatusResponse>({
    queryKey: ['/api/admin/status'],
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  useEffect(() => {
    if (!isLoading) {
      setIsCheckingAuth(false);
    }
  }, [isLoading]);

  // Show loading while checking authentication
  if (isCheckingAuth || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  // Show login if not authenticated
  if (error || !authStatus?.authenticated) {
    return <AdminLogin />;
  }

  // Show protected content
  return <>{children}</>;
}