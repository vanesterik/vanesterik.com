import clsx from 'clsx'

export const Palette = () => (
  <div className="grid grid-cols-5 gap-0.5">
    {[
      'bg-primary-50',
      'bg-primary-100',
      'bg-primary-200',
      'bg-primary-300',
      'bg-primary-400',
      'bg-primary-500',
      'bg-primary-600',
      'bg-primary-700',
      'bg-primary-800',
      'bg-primary-900',
      'bg-secondary-50',
      'bg-secondary-100',
      'bg-secondary-200',
      'bg-secondary-300',
      'bg-secondary-400',
      'bg-secondary-500',
      'bg-secondary-600',
      'bg-secondary-700',
      'bg-secondary-800',
      'bg-secondary-900',
    ].map((color) => (
      <div className={clsx('pt-36 pb-3 px-3 rounded', color)} key={color}>
        <span className="bg-primary-900 font-mono p-0.5 text-white text-xs uppercase">
          {color.substring(3)}
        </span>
      </div>
    ))}
  </div>
)
