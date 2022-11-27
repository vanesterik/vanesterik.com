import clsx from 'clsx'

export const Palette = () => (
  <div className="grid grid-cols-5 gap-5">
    {[
      'bg-stone-50',
      'bg-stone-100',
      'bg-stone-200',
      'bg-stone-300',
      'bg-stone-400',
      'bg-stone-500',
      'bg-stone-600',
      'bg-stone-700',
      'bg-stone-800',
      'bg-stone-900',
      'bg-red-50',
      'bg-red-100',
      'bg-red-200',
      'bg-red-300',
      'bg-red-400',
      'bg-red-500',
      'bg-red-600',
      'bg-red-700',
      'bg-red-800',
      'bg-red-900',
    ].map((color) => (
      <div
        className={clsx('pt-40', 'pb-3', 'px-3', 'rounded', color)}
        key={color}
      >
        <div
          className={clsx(
            'font-mono',
            'mix-blend-difference',
            'text-white',
            'text-xs',
            'uppercase',
          )}
        >
          {color.substring(3)}
        </div>
      </div>
    ))}
  </div>
)
