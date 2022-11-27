import clsx from 'clsx'
import Link from 'next/link'

export type ButtonProps = {
  href?: string
  label: string
  onClick?: () => void
  variant?: 'active' | 'default' | 'ghost'
}

export const Button = ({
  href,
  label,
  onClick,
  variant = 'default',
}: ButtonProps) => {
  const className = clsx(
    'block',
    'h-8',
    'pt-[1px]',
    'px-2',
    'rounded',
    getVariantClasses(variant),
  )

  if (href) {
    return (
      <Link href={href} legacyBehavior>
        <a className={className}>
          <Caption label={label} />
        </a>
      </Link>
    )
  }

  return (
    <button className={className} onClick={onClick}>
      <Caption label={label} />
    </button>
  )
}

const Caption = ({ label }: Pick<ButtonProps, 'label'>) => (
  <div className="font-normal font-mono leading-8 text-xs uppercase">
    {label}
  </div>
)

const getVariantClasses = (variant: ButtonProps['variant'] = 'default') =>
  ({
    active: [
      'text-white',
      'bg-black',
      'hover:bg-black',
      'active:bg-black',
      'dark:text-black',
      'dark:bg-white',
      'dark:hover:bg-white',
      'dark:active:bg-white',
    ],
    default: [
      'text-black',
      'bg-stone-200/80',
      'hover:bg-stone-200',
      'active:bg-red-500',
      'active:text-black',
      'dark:text-white',
      'dark:bg-stone-800/80',
      'dark:hover:bg-stone-800',
      'dark:active:bg-red-500',
      'dark:active:text-black',
    ],
    ghost: [
      'text-black',
      'bg-none',
      'hover:bg-stone-200',
      'active:bg-red-500',
      'active:text-black',
      'dark:text-white',
      'dark:hover:bg-stone-800',
      'dark:active:bg-red-500',
      'dark:active:text-black',
    ],
  }[variant])
