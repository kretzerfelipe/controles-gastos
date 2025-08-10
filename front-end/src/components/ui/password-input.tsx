import React from 'react'
import { Input } from './input'
import { cn } from '@/lib/utils'
import { Button } from './button'
import { LucideEye, LucideEyeClosed } from 'lucide-react'

const PasswordInput = React.forwardRef<HTMLInputElement,  React.ComponentProps<"input">>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const disabled = props.disabled

    return (
      <div className='flex-container relative'>
        <Input
          type={showPassword ? 'text' : 'password'}
          className={cn(
            'hide-password-toggle pr-10',
            className
          )}
          ref={ref}
          {...props}
        />
        <Button
          type='button'
          variant='ghost'
          size='sm'
          className='absolute top-0 right-0 z-50 h-full px-3 py-2 cursor-pointer'
          onClick={() => setShowPassword(prev => !prev)}
          disabled={disabled}
        >
          {showPassword && !disabled ? (
            <LucideEye
              className='svg-icons-size'
              aria-hidden='true'
              color={'var(--foreground)'}
            />
          ) : (
            <LucideEyeClosed
              className='svg-icons-size'
              aria-hidden='true'
              color={'var(--foreground)'}
            />
          )}
          <span className='sr-only'>
            {showPassword ? 'Hide password' : 'Show password'}
          </span>
        </Button>
      </div>
    )
  }
)
PasswordInput.displayName = 'PasswordInput'

export { PasswordInput }