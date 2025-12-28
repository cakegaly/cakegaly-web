'use client';

import * as React from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
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
        'focus-visible:outline-focused focus-visible:bg-background focus-visible:outline-2',
        'aria-invalid:outline-destructive aria-invalid:bg-background',
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40',
        'file:text-on-background file:inline-flex file:h-12 file:border-0 file:bg-transparent file:text-sm file:font-medium',
        className
      )}
      {...props}
    />
  );
}

interface InputPasswordProps
  extends Omit<React.ComponentProps<'input'>, 'type'> {
  /**
   * Whether to show the password visibility toggle button.
   * @default true
   */
  showPasswordToggle?: boolean;
}

function InputPassword({
  className,
  showPasswordToggle = true,
  ...props
}: InputPasswordProps) {
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

export interface InputProps extends React.ComponentProps<'input'> {
  /**
   * Whether to show the password visibility toggle button for password inputs.
   * Only applies when type="password".
   * @default true
   */
  showPasswordToggle?: boolean;
}

function Input({ type, showPasswordToggle, ...props }: InputProps) {
  switch (type) {
    case 'password':
      return (
        <InputPassword showPasswordToggle={showPasswordToggle} {...props} />
      );
    default:
      return <InputBase type={type} {...props} />;
  }
}

export { Input };
