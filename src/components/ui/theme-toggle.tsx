import { Sun, Moon, MonitorIcon } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '.'
import { useTheme, type UserTheme } from '../theme'

export const ThemeToggle = () => {
  const { setTheme, userTheme } = useTheme()

  return (
    <Select
      onValueChange={(value: UserTheme) => setTheme(value)}
      defaultValue={userTheme}>
      <SelectTrigger className='w-fit'>
        <SelectValue placeholder='Select theme' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Theme</SelectLabel>
          <SelectItem value='light'>
            <Sun /> Light
          </SelectItem>
          <SelectItem value='dark'>
            <Moon />
            Dark
          </SelectItem>
          <SelectItem value='system'>
            <MonitorIcon />
            System
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
