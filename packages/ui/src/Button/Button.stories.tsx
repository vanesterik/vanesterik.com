import { useLadleContext } from '@ladle/react'
import { Button, ButtonProps } from './Button'

export const Set = () => {
  const { globalState } = useLadleContext()

  return (
    <div className={globalState.theme}>
      <div className="flex flex-row gap-x-0.5">
        {['active', 'default', 'ghost'].map((variant) => (
          <Button
            key={variant}
            label={variant}
            variant={variant as ButtonProps['variant']}
          />
        ))}
      </div>
    </div>
  )
}
