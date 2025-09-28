import { forwardRef } from 'react';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, Ref } from 'react';
import { clsx } from 'clsx';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type ButtonBaseProps = {
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

type ButtonProps = ButtonBaseProps &
  (
    | ({ href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>)
    | ({ href: string } & AnchorHTMLAttributes<HTMLAnchorElement>)
  );

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300',
  secondary: 'bg-slate-800 text-white hover:bg-slate-900 focus:ring-slate-400',
  ghost: 'bg-transparent text-blue-600 hover:bg-blue-50 focus:ring-blue-200',
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

const baseClass = 'inline-flex items-center justify-center rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed';

const ButtonInner = (props: ButtonProps, ref: Ref<HTMLButtonElement | HTMLAnchorElement>) => {
  const { variant = 'primary', size = 'md', className, href, type, ...rest } = props as ButtonProps & {
    href?: string;
    type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  };

  const classNames = clsx(baseClass, variantStyles[variant], sizeStyles[size], className);

  if (href) {
    return <a ref={ref as Ref<HTMLAnchorElement>} className={classNames} href={href} {...rest} />;
  }

  return (
    <button
      ref={ref as Ref<HTMLButtonElement>}
      className={classNames}
      type={type ?? 'button'}
      {...rest}
    />
  );
};

export const Button = forwardRef(ButtonInner);
Button.displayName = 'Button';
