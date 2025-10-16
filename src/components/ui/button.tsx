import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition focus:outline-none';
    const styles = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700',
      secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
      danger: 'bg-red-600 text-white hover:bg-red-700',
    }[variant];

    return (
      <button ref={ref} className={cn(base, styles, className)} {...props} />
    );
  }
);

Button.displayName = 'Button';
