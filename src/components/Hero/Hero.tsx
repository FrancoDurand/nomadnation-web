import Autoplay from "embla-carousel-autoplay";
import { EmblaCarousel } from "../Carousel/Carousel";
import "./Hero.css";

const images = [
    "/src/assets/hero3.jpg",
    "/src/assets/hero1.jpg",
    "/src/assets/hero2.jpg",
    "/src/assets/hero4.jpg",
]

const options = {
    loop: true,
};

const plugins = [
    Autoplay({ delay: 4500 })
]

export function Hero() {
    return (
        <div className="hero">
            <div className="hero__image-container">
                <EmblaCarousel
                    images={images}
                    options={options}
                    plugins={plugins}
                />
            </div>
        </div>
    )
} //1370 x 455