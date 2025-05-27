'use client';

import { useMemo } from 'react';

interface DataPoint {
  label: string;
  value: number;
  color?: string;
}

interface SimpleChartProps {
  data: DataPoint[];
  type: 'bar' | 'line' | 'pie';
  height?: number;
  className?: string;
  color?: string;
  showLabels?: boolean;
  showTooltips?: boolean;
}

export const SimpleChart = ({ 
  data, 
  type, 
  height = 200, 
  className = "",
  color,
  showLabels = true,
  showTooltips = true
}: SimpleChartProps) => {
  const maxValue = useMemo(() => Math.max(...data.map(d => d.value)), [data]);
  const minValue = useMemo(() => Math.min(...data.map(d => d.value)), [data]);
  
  const colors = [
    '#06b6d4', '#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', 
    '#ef4444', '#f97316', '#84cc16', '#06b6d4', '#6366f1'
  ];

  // Color mapping for different chart colors
  const getColorValue = (colorName?: string) => {
    const colorMap: { [key: string]: string } = {
      'blue': '#3b82f6',
      'green': '#10b981',
      'purple': '#8b5cf6',
      'cyan': '#06b6d4',
      'orange': '#f97316',
      'red': '#ef4444',
      'yellow': '#f59e0b',
      'gray': '#6b7280'
    };
    return colorName ? colorMap[colorName] || colorName : '#06b6d4';
  };

  if (type === 'bar') {
    return (
      <div className={`bg-white p-4 rounded-lg ${className}`}>
        <div className="flex items-end justify-between space-x-2" style={{ height: `${height}px` }}>
          {data.map((item, index) => {
            const heightPercentage = (item.value / maxValue) * 100;
            const itemColor = item.color || color || colors[index % colors.length];
            
            return (
              <div key={index} className="flex flex-col items-center justify-end flex-1">
                <div 
                  className="w-full rounded-t-md transition-all duration-300 hover:opacity-80 relative group"
                  style={{ 
                    height: `${heightPercentage}%`,
                    backgroundColor: getColorValue(itemColor),
                    minHeight: '4px'
                  }}
                >
                  {showTooltips && (
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {item.value}
                    </div>
                  )}
                </div>
                {showLabels && (
                  <div className="text-xs text-gray-600 mt-2 text-center max-w-full truncate">
                    {item.label}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (type === 'line') {
    // For mini charts, we want to normalize based on the range
    const range = maxValue - minValue;
    const normalizedPoints = data.map((item, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = range === 0 ? 50 : 100 - ((item.value - minValue) / range) * 100;
      return { x, y, value: item.value };
    });

    const points = normalizedPoints.map(p => `${p.x},${p.y}`).join(' ');
    const lineColor = getColorValue(color);

    return (
      <div className={`${height <= 50 ? '' : 'bg-white p-4 rounded-lg'} ${className}`}>
        <div className="relative" style={{ height: `${height}px` }}>
          <svg width="100%" height="100%" className="absolute inset-0">
            {/* Gradient definition for mini charts */}
            <defs>
              <linearGradient id={`gradient-${color || 'default'}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={lineColor} stopOpacity="0.3" />
                <stop offset="100%" stopColor={lineColor} stopOpacity="0.1" />
              </linearGradient>
            </defs>
            
            {/* Fill area for mini charts */}
            {height <= 50 && (
              <polygon
                fill={`url(#gradient-${color || 'default'})`}
                points={`0,100 ${points} 100,100`}
              />
            )}
            
            <polyline
              fill="none"
              stroke={lineColor}
              strokeWidth={height <= 50 ? "1.5" : "2"}
              points={points}
              vectorEffect="non-scaling-stroke"
              className="drop-shadow-sm"
            />
            
            {/* Show points only for larger charts */}
            {height > 50 && normalizedPoints.map((point, index) => (
              <circle
                key={index}
                cx={`${point.x}%`}
                cy={`${point.y}%`}
                r="3"
                fill={lineColor}
                className="hover:r-5 transition-all cursor-pointer"
              >
                {showTooltips && (
                  <title>{`${data[index].label}: ${point.value}`}</title>
                )}
              </circle>
            ))}
          </svg>
          
          {/* Labels only for larger charts */}
          {showLabels && height > 50 && (
            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-600">
              {data.map((item, index) => (
                <span key={index} className="text-center">
                  {item.label}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (type === 'pie') {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let accumulatedPercentage = 0;

    return (
      <div className={`bg-white p-4 rounded-lg ${className}`}>
        <div className="flex items-center justify-center" style={{ height: `${height}px` }}>
          <div className="relative w-40 h-40">
            <svg width="160" height="160" className="transform -rotate-90">
              {data.map((item, index) => {
                const percentage = (item.value / total) * 100;
                const strokeDasharray = `${percentage * 2.51} 251.2`;
                const strokeDashoffset = -accumulatedPercentage * 2.51;
                const itemColor = item.color || colors[index % colors.length];
                
                accumulatedPercentage += percentage;
                
                return (
                  <circle
                    key={index}
                    cx="80"
                    cy="80"
                    r="40"
                    fill="transparent"
                    stroke={getColorValue(itemColor)}
                    strokeWidth="8"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-300 hover:stroke-[10] cursor-pointer"
                  >
                    {showTooltips && (
                      <title>{`${item.label}: ${item.value} (${percentage.toFixed(1)}%)`}</title>
                    )}
                  </circle>
                );
              })}
            </svg>
          </div>
          {showLabels && (
            <div className="ml-6 space-y-2">
              {data.map((item, index) => {
                const percentage = ((item.value / total) * 100).toFixed(1);
                const itemColor = item.color || colors[index % colors.length];
                
                return (
                  <div key={index} className="flex items-center space-x-2 text-sm">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getColorValue(itemColor) }}
                    />
                    <span className="text-gray-700">
                      {item.label}: {percentage}%
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}; 