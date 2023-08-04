import { VariantProps } from 'class-variance-authority'

import { card } from '../lib/card'
import { icon } from '../lib/icon'
import { text } from '../lib/text'

export const Set = () => (
  <div className="grid grid-cols-5 gap-0.5">
    {['moon', 'snowflake', 'sun'].map((name) => (
      <div className={card()} key={name}>
        <div className="flex flex-row items-center">
          <div
            className={icon({
              name: name as VariantProps<typeof icon>['name'],
            })}
          />
          <div className={text({ intent: 'label' })}>{name}</div>
        </div>
      </div>
    ))}
  </div>
)
