'use client';

import * as React from 'react';
import { EyeIcon, EyeOffIcon, MinusIcon, PlusIcon } from 'lucide-react';

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

function InputNumber({
  className,
  preventWheel = true,
  showSpinButtons = true,
  value,
  onChange,
  step = 1,
  min,
  max,
  ...props
}: Omit<React.ComponentProps<'input'>, 'type'> & {
  preventWheel?: boolean;
  showSpinButtons?: boolean;
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleWheel = React.useCallback(
    (e: React.WheelEvent<HTMLInputElement>) => {
      if (preventWheel) {
        e.currentTarget.blur();
      }
    },
    [preventWheel]
  );

  const handleIncrement = React.useCallback(() => {
    if (!inputRef.current) return;
    inputRef.current.stepUp();
    inputRef.current.dispatchEvent(new Event('input', { bubbles: true }));
  }, []);

  const handleDecrement = React.useCallback(() => {
    if (!inputRef.current) return;
    inputRef.current.stepDown();
    inputRef.current.dispatchEvent(new Event('input', { bubbles: true }));
  }, []);

  if (!showSpinButtons) {
    return (
      <InputBase
        ref={inputRef}
        type="number"
        className={cn(
          '[appearance:textfield]',
          '[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
          className
        )}
        onWheel={handleWheel}
        value={value}
        onChange={onChange}
        step={step}
        min={min}
        max={max}
        {...props}
      />
    );
  }

  return (
    <div className="relative">
      <InputBase
        ref={inputRef}
        type="number"
        className={cn(
          'pr-10',
          '[appearance:textfield]',
          '[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
          className
        )}
        onWheel={handleWheel}
        value={value}
        onChange={onChange}
        step={step}
        min={min}
        max={max}
        {...props}
      />
      <div className="absolute top-1/2 right-2 flex -translate-y-1/2 flex-col gap-0.5">
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="size-5 rounded-sm p-0"
          onClick={handleIncrement}
          tabIndex={-1}
          aria-label="増やす"
        >
          <PlusIcon />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="size-5 rounded-sm p-0"
          onClick={handleDecrement}
          tabIndex={-1}
          aria-label="減らす"
        >
          <MinusIcon />
        </Button>
      </div>
    </div>
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

function InputColor({
  className,
  ...props
}: Omit<React.ComponentProps<'input'>, 'type'>) {
  return (
    <InputBase
      type="color"
      className={cn(
        'h-12 w-20 cursor-pointer',
        // Remove default padding for color input
        'p-1',
        // Style the color picker itself
        '[&::-webkit-color-swatch-wrapper]:p-0',
        '[&::-webkit-color-swatch]:rounded-xs [&::-webkit-color-swatch]:border-0',
        '[&::-moz-color-swatch]:rounded-xs [&::-moz-color-swatch]:border-0',
        className
      )}
      {...props}
    />
  );
}

function Input({
  type,
  showPasswordToggle,
  preventWheel,
  showSpinButtons,
  ...props
}: React.ComponentProps<'input'> & {
  showPasswordToggle?: boolean;
  preventWheel?: boolean;
  showSpinButtons?: boolean;
}) {
  switch (type) {
    case 'password':
      return (
        <InputPassword showPasswordToggle={showPasswordToggle} {...props} />
      );
    case 'number':
      return (
        <InputNumber
          preventWheel={preventWheel}
          showSpinButtons={showSpinButtons}
          {...props}
        />
      );
    case 'color':
      return <InputColor {...props} />;
    default:
      return <InputBase type={type} {...props} />;
  }
}

export { Input };
