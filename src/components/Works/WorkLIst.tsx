import {useHandleError} from '@/hooks/useHandleError';
import {cn} from '@/lib/utils';
import {useGetMyWorksQuery} from '@/store/portfolio/worksApi';
import {Carousel, CarouselContent, CarouselItem} from '../ui/carousel';
import {Loader} from '../ui/loader';
import {AddWork} from './AddWork/AddWork';
import {Work} from './Work';

interface Props {
  className?: string;
}

export const PortfolioList = ({className}: Props) => {
  const {data, error, isLoading} = useGetMyWorksQuery(null);
  useHandleError(error);

  if (isLoading) return <Loader/>;
  if (error || !data) return <div>error</div>;

  return (
    <div className="max-sm:box">
      <h2 className="font-bold text-[32px] leading-[120%] sm:text-[40px] mb-8">Портфолио</h2>
      <ul className={cn(className)}>
        <Carousel opts={{}}>
          <CarouselContent className="gap-x-4 md:gap-x-8">
            {data.data.map((work) => (
              <CarouselItem key={work.id} className="basis-auto lg:basis/1-4 ">
                <Work className="min-w-fit" {...work} />
              </CarouselItem>
            ))}
            <CarouselItem className="basis-auto lg:basis/1-4 ">
              <AddWork/>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </ul>
    </div>
  );
};
