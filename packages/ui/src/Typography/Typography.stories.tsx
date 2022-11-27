import { ReactNode } from 'react'

export const Typefaces = () => (
  <div className="flex flex-col gap-5">
    <Card>
      <Label label="heading" />
      <div className="font-bold font-sans text-3xl">Lausanne 700</div>
    </Card>
    <Card>
      <Label label="body" />
      <div className="font-normal font-sans text-3xl">Lausanne 400</div>
    </Card>
    <Card>
      <Label label="caption" />
      <div className="font-normal font-mono text-3xl">
        NB International Pro Mono
      </div>
    </Card>
  </div>
)

const Card = ({ children }: { children?: ReactNode }) => (
  <div className="bg-stone-100 p-3 rounded">{children}</div>
)

const Label = ({ label }: { label: string }) => (
  <div className="font-mono mb-3 mix-blend-difference text-xs uppercase text-white">
    {label}
  </div>
)
