import { Description, Field, Input, Label } from '@headlessui/react'
import clsx from 'clsx'

interface Props {
  fieldName: string;
  description: string;
  value: string;
  setValue: (v: string) => void;
}

export default function InputBox({ fieldName, description, value, setValue }: Props) {
  return (
    <div className="w-full max-w-md px-4 bg-gray-900 p-5 rounded-lg shadow-lg border-gray-100">
      <Field>
        <Label className="text-md font-medium text-white">{fieldName}</Label>
        <Description className="text-sm/6 text-white/50">
          {description}
        </Description>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={clsx(
            'mt-3 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white',
            'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25'
          )}
        />
      </Field>
    </div>
  )
}