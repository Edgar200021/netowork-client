import { cn } from '@/lib/utils'
import { memo } from 'react'
import { AboutMeAction } from './AboutMeAction'
interface Props {
  className?: string
  aboutText: string
}

export const AboutMeInfo = memo(({ className, aboutText }: Props) => {
  return (
    <div
      className={cn(
        'rounded-2xl rounded-t-none shadow-form py-8 px-4 sm:p-4 bg-white',
        className
      )}
    >
      <div className="flex items-center justify-between gap-x-5 mb-3 sm:mb-4">
        <span className="font-bold text-[22px] leading-[130%]">Обо мне</span>
        <AboutMeAction aboutText={aboutText} />
      </div>
      <hr className="block bg-border mb-3 sm:mb-6" />
      <p className="leading-[140%]">
        {aboutText.trim() ? aboutText : 'Добавьте информацию о себе'}
      </p>
    </div>
  )
})
