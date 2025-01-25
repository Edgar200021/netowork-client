import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'
import { PortfolioJob as TPortfolioJob } from '@/types/portfolio'
import { PortfolioJobDelete } from './PortfolioJobDelete'

interface Props extends TPortfolioJob {
  className?: string
}

export const PortfolioJob = ({ className, id, title, images }: Props) => {
  return (
    <div
      className={cn(
        'max-w-[276px] min-w-[250px] w-full rounded-2xl bg-white flex flex-col overflow-hidden relative',
        className
      )}
    >
      <PortfolioJobDelete id={id} className="absolute top-4 right-4 z-10" />
      <Carousel className="w-full bg-blue-500">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem className=" h-[250px] md:h-[276px]" key={index}>
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 border-[2px] border-primary" />
        <CarouselNext className="right-4 border-[2px] border-primary" />
        <CarouselDots
          className="absolute bottom-3 left-[50%] -translate-x-[50%]"
          activeClassName="bg-primary w-2 h-2"
          inactiveClassName="w-2 h-2 bg-white"
        />
      </Carousel>
      <p className="py-6 px-4 font-semibold leading-[130%] md:text-xl">
        Дизайн сервиса туроператора I LIKE TRAVEL
      </p>
    </div>
  )
}
