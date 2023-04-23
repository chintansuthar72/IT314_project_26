import React, { useState, useEffect } from 'react'
import clsx from 'clsx'

import '../assets/styles/components/listTable.scss'

// function compareString(a, b) {}

// We are not using the html "table" element because each row is a link.
// implementing that functionality with table is very complex, and also bad for accessibility reasons.
// Therefore an unordered list is used
const ListTable = ({ headItems, bodyItems, tableRowComponent }) => {
  const [sortingInfo, setSortingInfo] = useState({
    sortingIndex: '',
    reverse: false
  })
  const [sortedBodyItems, setSortedBodyItems] = useState(bodyItems)

  useEffect(() => {
    let sortedItems = [...bodyItems]
    if (sortingInfo.sortingIndex || sortingInfo.sortingIndex === 0) {
      sortedItems = sortedItems.sort(({ data: a }, { data: b }) => {
        const sortingValueA = a[sortingInfo.sortingIndex].sortingValue
        const sortingValueB = b[sortingInfo.sortingIndex].sortingValue
        const sortingType = b[sortingInfo.sortingIndex].sortingType
        if (sortingType === 'string') {
          return sortingValueA
            .toLowerCase()
            .localeCompare(sortingValueB.toLowerCase())
        } else {
          return sortingValueA - sortingValueB
        }
      })
      if (sortingInfo.reverse) {
        sortedItems = sortedItems.reverse()
      }
    }
    setSortedBodyItems(sortedItems)
  }, [sortingInfo, bodyItems])

  return (
    <div>
      <LTHead>
        {headItems.map((item, index) => (
          <LTHeadItem
            isSortable={item.isSortable}
            key={index}
            onClick={
              item.isSortable
                ? () => {
                    const isReverse =
                      sortingInfo.sortingIndex === index
                        ? !sortingInfo.reverse
                        : false
                    setSortingInfo({
                      sortingIndex: index,
                      reverse: isReverse
                    })
                  }
                : null
            }
          >
            {item.content}
          </LTHeadItem>
        ))}
      </LTHead>
      <ul>
        {sortedBodyItems.map((row, index) => {
          return (
            <LTRow component={row.renderComponent} key={index}>
              {row.data.map((item, index) => {
                return <LTData key={index}>{item.content}</LTData>
              })}
            </LTRow>
          )
        })}
      </ul>
    </div>
  )
}

export const LTHead = ({ children }) => {
  return <div className="ztd-student-table--header">{children}</div>
}
export const LTHeadItem = ({
  children,
  isSortable = false,
  onClick = null
}) => (
  <div
    className={clsx('ztd-student-table--cell', {
      'ztd-student-table--is-sortable': isSortable
    })}
    onClick={onClick}
  >
    {children}
  </div>
)
export const LTBody = ({ children }) => {
  return <ul>{children}</ul>
}

export const LTRow = ({
  children,
  component: Component = props => <a {...props} />
}) => {
  return (
    <li className="ztd-student-table--item">
      <Component className="ztd-student-table--link" href="#">
        {children}
      </Component>
    </li>
  )
}
export const LTData = ({ children }) => {
  return <div className="ztd-student-table--cell">{children}</div>
}

export default ListTable
