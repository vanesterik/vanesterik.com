import { useState } from 'react'

import { button } from '../lib/button'
import { dropdown, dropdownList, dropdownListItem } from '../lib/dropdown'

export const Component = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={dropdown()}>
      <button
        className={button({ intent: 'primary' })}
        onClick={() => setIsOpen((value) => !value)}
      >
        Dropdown
      </button>
      {isOpen && (
        <ul className={dropdownList()}>
          {Array.from(Array(3).keys()).map((index) => (
            <li
              className={dropdownListItem()}
              key={index}
            >{`Item ${index}`}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
