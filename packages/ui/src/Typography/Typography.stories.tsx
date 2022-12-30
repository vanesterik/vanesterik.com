import { useLadleContext } from '@ladle/react'
import clsx from 'clsx'
import { ReactNode } from 'react'

export const Typefaces = () => {
  const { globalState } = useLadleContext()

  return (
    <div className={globalState.theme}>
      <div className="flex flex-col gap-5">
        <Card>
          <Label label="heading" />
          <Typeface className="font-bold font-sans" typeface="Lausanne 700" />
        </Card>
        <Card>
          <Label label="body" />
          <Typeface className="font-normal font-sans" typeface="Lausanne 400" />
        </Card>
        <Card>
          <Label label="caption" />
          <Typeface
            className="font-normal font-mono"
            typeface="NB International Pro Mono"
          />
        </Card>
      </div>
    </div>
  )
}

const Card = ({ children }: { children?: ReactNode }) => (
  <div className="bg-stone-100 dark:bg-stone-900 p-3 rounded">{children}</div>
)

const Label = ({ label }: { label: string }) => (
  <div className="font-mono mb-3 text-xs uppercase text-black dark:text-white">
    {label}
  </div>
)

const Typeface = ({
  className,
  typeface,
}: {
  className?: string
  typeface: string
}) => (
  <div className={clsx(className, 'text-3xl text-black dark:text-white')}>
    {typeface}
  </div>
)
