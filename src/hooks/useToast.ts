import { toast } from 'react-toastify'

export const useToast = () => {
  return (
    content: string | number | boolean | bigint,
    type: 'default' | 'error' | 'success' | 'warning' | 'info'
  ) =>
    toast(content, {
      type,
    })
}
