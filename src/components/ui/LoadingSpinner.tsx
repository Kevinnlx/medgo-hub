'use client';

import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'dots' | 'pulse' | 'bars';
  className?: string;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
}

const LoadingSpinner = ({ 
  size = 'md', 
  variant = 'default', 
  className,
  color = 'primary'
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  const colorClasses = {
    primary: 'text-cyan-600',
    secondary: 'text-gray-600',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    error: 'text-red-600'
  };

  if (variant === 'default') {
    return (
      <div className={cn('animate-spin', sizeClasses[size], colorClasses[color], className)}>
        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
    );
  }

  if (variant === 'dots') {
    const dotSize = {
      sm: 'w-1 h-1',
      md: 'w-2 h-2',
      lg: 'w-3 h-3',
      xl: 'w-4 h-4'
    };

    return (
      <div className={cn('flex space-x-1', className)}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn(
              'rounded-full animate-pulse',
              dotSize[size],
              colorClasses[color].replace('text-', 'bg-')
            )}
            style={{
              animationDelay: `${i * 0.2}s`,
              animationDuration: '1s'
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div className={cn('animate-pulse', className)}>
        <div className={cn(
          'rounded-full',
          sizeClasses[size],
          colorClasses[color].replace('text-', 'bg-'),
          'opacity-75'
        )} />
      </div>
    );
  }

  if (variant === 'bars') {
    const barHeight = {
      sm: 'h-3',
      md: 'h-4',
      lg: 'h-6',
      xl: 'h-8'
    };

    const barWidth = {
      sm: 'w-0.5',
      md: 'w-1',
      lg: 'w-1.5',
      xl: 'w-2'
    };

    return (
      <div className={cn('flex items-end space-x-1', className)}>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={cn(
              'animate-pulse rounded-sm',
              barWidth[size],
              barHeight[size],
              colorClasses[color].replace('text-', 'bg-')
            )}
            style={{
              animationDelay: `${i * 0.15}s`,
              animationDuration: '1.2s'
            }}
          />
        ))}
      </div>
    );
  }

  return null;
};

// Full page loading component
export const PageLoader = ({ message = 'Cargando...' }: { message?: string }) => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
      <div className="text-center">
        <LoadingSpinner size="xl" className="mx-auto mb-4" />
        <p className="text-gray-600 text-lg">{message}</p>
      </div>
    </div>
  );
};

// Inline loading component
export const InlineLoader = ({ 
  message = 'Cargando...', 
  size = 'md' 
}: { 
  message?: string; 
  size?: 'sm' | 'md' | 'lg' 
}) => {
  return (
    <div className="flex items-center justify-center space-x-3 py-8">
      <LoadingSpinner size={size} />
      <span className="text-gray-600">{message}</span>
    </div>
  );
};

// Button loading state
export const ButtonLoader = ({ size = 'sm' }: { size?: 'sm' | 'md' }) => {
  return <LoadingSpinner size={size} className="mr-2" />;
};

export default LoadingSpinner; 