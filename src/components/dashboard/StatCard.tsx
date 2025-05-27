'use client';

import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface TrendData {
  value: number;
  isPositive: boolean;
}

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: TrendData;
  color?: 'blue' | 'green' | 'yellow' | 'purple' | 'orange' | 'red' | 'cyan' | 'indigo';
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  color = 'blue',
  className = ''
}) => {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          bg: 'bg-blue-50',
          iconBg: 'bg-blue-100',
          iconColor: 'text-blue-600',
          trendColor: 'text-blue-600'
        };
      case 'green':
        return {
          bg: 'bg-green-50',
          iconBg: 'bg-green-100',
          iconColor: 'text-green-600',
          trendColor: 'text-green-600'
        };
      case 'yellow':
        return {
          bg: 'bg-yellow-50',
          iconBg: 'bg-yellow-100',
          iconColor: 'text-yellow-600',
          trendColor: 'text-yellow-600'
        };
      case 'purple':
        return {
          bg: 'bg-purple-50',
          iconBg: 'bg-purple-100',
          iconColor: 'text-purple-600',
          trendColor: 'text-purple-600'
        };
      case 'orange':
        return {
          bg: 'bg-orange-50',
          iconBg: 'bg-orange-100',
          iconColor: 'text-orange-600',
          trendColor: 'text-orange-600'
        };
      case 'red':
        return {
          bg: 'bg-red-50',
          iconBg: 'bg-red-100',
          iconColor: 'text-red-600',
          trendColor: 'text-red-600'
        };
      case 'cyan':
        return {
          bg: 'bg-cyan-50',
          iconBg: 'bg-cyan-100',
          iconColor: 'text-cyan-600',
          trendColor: 'text-cyan-600'
        };
      case 'indigo':
        return {
          bg: 'bg-indigo-50',
          iconBg: 'bg-indigo-100',
          iconColor: 'text-indigo-600',
          trendColor: 'text-indigo-600'
        };
      default:
        return {
          bg: 'bg-gray-50',
          iconBg: 'bg-gray-100',
          iconColor: 'text-gray-600',
          trendColor: 'text-gray-600'
        };
    }
  };

  const colorClasses = getColorClasses(color);

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center">
            <div className={`p-2 rounded-lg ${colorClasses.iconBg}`}>
              <Icon className={`w-5 h-5 ${colorClasses.iconColor}`} />
            </div>
          </div>
          
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          </div>

          {trend && (
            <div className="mt-3 flex items-center">
              <div className={`flex items-center ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {trend.isPositive ? (
                  <TrendingUp className="w-4 h-4 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 mr-1" />
                )}
                <span className="text-sm font-medium">
                  {trend.value}%
                </span>
              </div>
              <span className="text-gray-500 text-sm ml-2">
                vs. período anterior
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard; 