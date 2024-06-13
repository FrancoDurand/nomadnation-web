import Autoplay from "embla-carousel-autoplay";
import { EmblaCarousel } from "../Carousel/Carousel";
import "./Hero.css";
import hero1 from "../assets/hero1.jpg";
import hero2 from "../assets/hero2.jpg";
import hero3 from "../assets/hero3.jpg";
import hero4 from "../assets/hero4.jpg";


const images = [
    hero3,
    hero1,
    hero2,
    hero4,
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