"use client"

import type { Dispatch, SetStateAction } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const CheckboxGrid = ({
  selectedClasses,
  setSelectedClasses,
}: {
  selectedClasses: number[]
  setSelectedClasses: Dispatch<SetStateAction<number[]>>
}) => {
  // Nice classification: classes 1 to 45
  const numbers = Array.from({ length: 45 }, (_, i) => i + 1)

  const handleCheckboxChange = (
    checked: boolean | "indeterminate",
    value: number
  ) => {
    setSelectedClasses((prev) =>
      checked === true
        ? prev.includes(value)
          ? prev
          : [...prev, value].sort((a, b) => a - b)
        : prev.filter((n) => n !== value)
    )
  }

  return (
    <div className="w-full border rounded-lg p-4">
      <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-9 gap-2">
        {numbers.map((number) => (
          <Label
            key={number}
            className="flex items-center space-x-2 cursor-pointer hover:bg-surface-sunken p-1 rounded-sm"
          >
            <Checkbox
              id={`class-${number}`}
              checked={selectedClasses.includes(number)}
              onCheckedChange={(checked) =>
                handleCheckboxChange(checked, number)
              }
            />
            <span className="text-sm text-fg-secondary">{number}</span>
          </Label>
        ))}
      </div>
    </div>
  )
}

export default CheckboxGrid
