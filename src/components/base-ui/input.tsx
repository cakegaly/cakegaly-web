'use client';

import * as React from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

import { Button } from '@/components/base-ui/button';
import { cn } from '@/lib/utils';

function InputBase({ className, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      data-slot="input"
      className={cn(
        'bg-background h-12 w-full min-w-0 rounded-sm text-base',
        'px-3 py-1 shadow-xs transition-[color,box-shadow,background-color]',
        'outline-border outline-1 -outline-offset-1',
        'placeholder:text-on-muted',
        'hover:bg-background-hovered active:bg-background-active',
        'focus-visible:outline-selected focus-visible:bg-background focus-visible:outline-2',
        'aria-invalid:outline-destructive aria-invalid:bg-background',
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40',
        'file:text-on-background file:inline-flex file:h-12 file:border-0 file:bg-transparent file:text-sm file:font-medium',
        className
      )}
      {...props}
    />
  );
}

function InputNumber({
  className,
  preventWheel = true,
  ...props
}: Omit<React.ComponentProps<'input'>, 'type'> & {
  preventWheel?: boolean;
}) {
  const handleWheel = React.useCallback(
    (e: React.WheelEvent<HTMLInputElement>) => {
      if (preventWheel) {
        e.currentTarget.blur();
      }
    },
    [preventWheel]
  );

  return (
    <InputBase
      type="number"
      className={cn(
        // Hide default spin buttons on Firefox
        '[appearance:textfield]',
        // Hide default spin buttons on Chrome/Safari/Edge
        '[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
        className
      )}
      onWheel={handleWheel}
      {...props}
    />
  );
}

function InputPassword({
  className,
  showPasswordToggle = true,
  ...props
}: Omit<React.ComponentProps<'input'>, 'type'> & {
  showPasswordToggle?: boolean;
}) {
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePasswordVisibility = React.useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  if (!showPasswordToggle) {
    return <InputBase type="password" className={className} {...props} />;
  }

  return (
    <div className="relative">
      <InputBase
        type={showPassword ? 'text' : 'password'}
        className={cn('pr-12', className)}
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon-md"
        className="absolute top-1/2 right-2 -translate-y-1/2"
        onClick={togglePasswordVisibility}
        aria-label={showPassword ? 'パスワードを非表示' : 'パスワードを表示'}
      >
        {showPassword ? <EyeIcon /> : <EyeOffIcon />}
      </Button>
    </div>
  );
}

function Input({
  type,
  showPasswordToggle,
  preventWheel,
  ...props
}: React.ComponentProps<'input'> & {
  showPasswordToggle?: boolean;
  preventWheel?: boolean;
}) {
  switch (type) {
    case 'password':
      return (
        <InputPassword showPasswordToggle={showPasswordToggle} {...props} />
      );
    case 'number':
      return <InputNumber preventWheel={preventWheel} {...props} />;
    default:
      return <InputBase type={type} {...props} />;
  }
}

export { Input };
