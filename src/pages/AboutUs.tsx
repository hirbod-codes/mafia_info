import { Button } from "@/components/shadcn/ui/button";
import { AppContext } from "@/context";
import { colord } from "colord";
import { useContext } from "react";

export default function AboutUs({ setPage }: { setPage: React.Dispatch<React.SetStateAction<number>> }) {
    const c = useContext(AppContext)

    const image = new URL(`/src/assets/pictures/Mafia_logo_${c.theme}.png`, import.meta.url).href;

    const color: any = colord(document.documentElement.style.getPropertyValue('--background'))

    return (
        <>
            <div className="relative w-full">
                <img
                    src={image}
                    alt="main_picture"
                    className='object-cover object-top w-full h-full'
                />

                <div className='absolute top-0 w-full h-full' style={{ background: `linear-gradient(180deg, rgba(${color.rgba.r}, ${color.rgba.g}, ${color.rgba.b}, 0) 0%, rgba(${color.rgba.r}, ${color.rgba.g}, ${color.rgba.b}, 1) 90%, rgba(${color.rgba.r}, ${color.rgba.g}, ${color.rgba.b}, 1) 100%)` }} />
            </div>

            <Button className="text-xl" onClick={() => setPage(1)}>
                سناریوها
            </Button>
        </>
    )
}
