import { useHandleError } from '@/hooks/useHandleError'
import { cn } from '@/lib/utils'
import { useGetMyPortfolioQuery } from '@/store/portfolio/portfolioApi'
import img from '../../assets/react.svg'
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'
import { PortfolioJob } from './PortfolioJob'

interface Props {
  className?: string
}

export const PortfolioList = ({ className }: Props) => {
  const { data, error, isLoading } = useGetMyPortfolioQuery(null)
  useHandleError(error)
  return (
    <ul className={cn(className)}>
      <Carousel
        opts={{
          breakpoints: {
            lg: {},
          },
        }}
      >
        <CarouselContent className=" gap-x-4 md:gap-x-8 ">
          <CarouselItem className="basis-auto lg:basis/1-4 ">
            <PortfolioJob className='min-w-fit' id="1" title="title" images={[img, img]} />
          </CarouselItem>
          <CarouselItem className="basis-auto lg:basis/1-4 ">
            <PortfolioJob className='min-w-fit' id="2" title="title" images={[img, img]} />
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </ul>
  )
}
