// src/components/Grid.jsx (or Grid.js)
import React from 'react';

// Container Component
export const Container = ({ fluid = false, children, className = '' }) => {
  const baseClasses = 'mx-auto px-4';
  const widthClass = fluid ? 'w-full' : 'max-w-7xl';
  
  return (
    <div className={`${baseClasses} ${widthClass} ${className}`}>
      {children}
    </div>
  );
};

// Row Component
export const Row = ({ children, className = '' }) => {
  return (
    <div className={`flex flex-wrap -mx-4 ${className}`}>
      {children}
    </div>
  );
};

// Col Component
export const Col = ({ 
  children, 
  xs = 12, 
  sm, 
  md, 
  lg, 
  xl, 
  className = '' 
}) => {
  const getColClass = (size, breakpoint = '') => {
    if (!size) return '';
    const prefix = breakpoint ? `${breakpoint}:` : '';
    
    const widthMap = {
      12: 'w-full',
      6: 'w-1/2',
      4: 'w-1/3',
      3: 'w-1/4',
      8: 'w-2/3',
      9: 'w-3/4',
      2: 'w-1/6',
      1: 'w-1/12'
    };
    
    return `${prefix}${widthMap[size] || `w-[${(size / 12) * 100}%]`}`;
  };
  
  const classes = [
    'px-4',
    getColClass(xs),
    sm && getColClass(sm, 'sm'),
    md && getColClass(md, 'md'),
    lg && getColClass(lg, 'lg'),
    xl && getColClass(xl, 'xl'),
    className
  ].filter(Boolean).join(' ');
  
  return (
    <div className={classes}>
      {children}
    </div>
  );
};