import type { AnyFieldApi } from '@tanstack/react-form'

export function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid
        ? field.state.meta.errors.map((error) => (
            <span
              key={error.message}
              className='text-sm text-red-500 dark:text-red-400'>
              {error.message ?? error}
            </span>
          ))
        : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </>
  )
}
