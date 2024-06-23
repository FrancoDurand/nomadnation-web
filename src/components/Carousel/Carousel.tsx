import useEmblaCarousel from 'embla-carousel-react'
import { useEffect } from 'react'
import { EmblaPluginType, EmblaOptionsType } from 'embla-carousel'
import "./Carousel.css"

type EmblaCarouselProps = {
    images: string[];
    options?: EmblaOptionsType
    plugins?: EmblaPluginType[]
}

export function EmblaCarousel({ images, options = {}, plugins = [] }: EmblaCarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins);

    useEffect(() => {
        /*  if (emblaApi) {
             console.log(emblaApi.slideNodes()) // Access API
         } */
    }, [emblaApi])

    return (
        <div className="embla" ref={emblaRef}>
            <div className="embla__container">
                {
                    images.map((src, index) =>
                        <div className="embla__slide" key={index}>
                            <img src={src} alt={"Slide " + (index + 1).toString()} />
                        </div>
                    )
                }
            </div>
        </div>
    )
}


