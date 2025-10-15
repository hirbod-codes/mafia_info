import scenarios from '@/data/scenarios.json'
import { AppContext } from '@/context'
import { useContext, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { colord } from "colord";

export default function Ahangar() {
    const c = useContext(AppContext)

    const data = scenarios.find((f) => f.name === 'آهنگر')!

    const main = new URL(`/src/assets/pictures/${data.picture}_${c.theme}.png`, import.meta.url).href;

    // main
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({ container: containerRef })
    const mainOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])
    const mainHeight = useTransform(scrollYProgress, [0, 0.2], ['40%', '100%'])

    // GodFather
    const godFatherDescriptionContainer = useRef(null)
    const { scrollYProgress: godFatherScrollYProgress } = useScroll({
        container: containerRef,
        target: godFatherDescriptionContainer,
        offset: ["start end", "end start"], // when top enters bottom → bottom leaves top
    });
    const godFatherLeft = useTransform(godFatherScrollYProgress, [0, 0.5, 1], [c.direction === 'rtl' ? '-50%' : '150%', c.direction === 'rtl' ? '0%' : '50%', c.direction === 'rtl' ? '-50%' : '150%'])
    const godFatherImage = new URL(`/src/assets/pictures/${data.roles['گادفادر'].picture}_${c.theme}.png`, import.meta.url).href

    // Lady
    const ladyDescriptionContainer = useRef(null)
    const { scrollYProgress: ladyScrollYProgress } = useScroll({
        container: containerRef,
        target: ladyDescriptionContainer,
        offset: ["start end", "end start"], // when top enters bottom → bottom leaves top
    });
    const ladyLeft = useTransform(ladyScrollYProgress, [0, 0.5, 1], [c.direction === 'rtl' ? '-50%' : '150%', c.direction === 'rtl' ? '0%' : '50%', c.direction === 'rtl' ? '-50%' : '150%'])
    const ladyImage = new URL(`/src/assets/pictures/${data.roles['لیدی'].picture}_${c.theme}.png`, import.meta.url).href

    // Doctor
    const doctorDescriptionContainer = useRef(null)
    const { scrollYProgress: doctorScrollYProgress } = useScroll({
        container: containerRef,
        target: doctorDescriptionContainer,
        offset: ["start end", "end start"], // when top enters bottom → bottom leaves top
    });
    const doctorLeft = useTransform(doctorScrollYProgress, [0, 0.5, 1], [c.direction === 'rtl' ? '-50%' : '150%', c.direction === 'rtl' ? '0%' : '50%', c.direction === 'rtl' ? '-50%' : '150%'])
    const doctorImage = new URL(`/src/assets/pictures/${data.roles['دکتر'].picture}_${c.theme}.png`, import.meta.url).href

    // Ahangar
    const ahangarDescriptionContainer = useRef(null)
    const { scrollYProgress: ahangarScrollYProgress } = useScroll({
        container: containerRef,
        target: ahangarDescriptionContainer,
        offset: ["start end", "end start"], // when top enters bottom → bottom leaves top
    });
    const ahangarLeft = useTransform(ahangarScrollYProgress, [0, 0.5, 1], [c.direction === 'rtl' ? '-50%' : '150%', c.direction === 'rtl' ? '0%' : '50%', c.direction === 'rtl' ? '-50%' : '150%'])
    const ahangarImage = new URL(`/src/assets/pictures/${data.roles['آهنگر'].picture}_${c.theme}.png`, import.meta.url).href

    // Citizen
    const citizenDescriptionContainer = useRef(null)
    const { scrollYProgress: citizenScrollYProgress } = useScroll({
        container: containerRef,
        target: citizenDescriptionContainer,
        offset: ["start end", "end start"], // when top enters bottom → bottom leaves top
    });
    const citizenLeft = useTransform(citizenScrollYProgress, [0, 0.5, 1], [c.direction === 'rtl' ? '-50%' : '150%', c.direction === 'rtl' ? '0%' : '50%', c.direction === 'rtl' ? '-50%' : '150%'])
    const citizenImage = new URL(`/src/assets/pictures/${data.roles['شهر ساده'].picture}_${c.theme}.png`, import.meta.url).href

    const color: any = colord(document.documentElement.style.getPropertyValue('--background'))

    return (
        <div id='ahangar' className='w-full h-full overflow-hidden'>
            <div className="relative overflow-y-auto overflow-x-hidden h-full" ref={containerRef}>
                <motion.div
                    className="relative w-full"
                    style={{
                        zIndex: -1,
                        position: 'fixed',
                        opacity: mainOpacity,
                        height: mainHeight
                    }}
                >
                    <img
                        src={main}
                        alt="main_picture"
                        className='absolute object-cover object-top w-full h-full'
                    />

                    <div className='absolute w-full h-full' style={{ background: `linear-gradient(180deg, rgba(${color.rgba.r}, ${color.rgba.g}, ${color.rgba.b}, 0) 0%, rgba(${color.rgba.r}, ${color.rgba.g}, ${color.rgba.b}, 1) 90%, rgba(${color.rgba.r}, ${color.rgba.g}, ${color.rgba.b}, 1) 100%)` }} />
                </motion.div>

                <div className="h-[30%]" />

                <div className="my-4 p-4">
                    {data.description.map((d, i) =>
                        <div key={i} className="py-4">{d}</div>
                    )}
                </div>

                {/* God Father */}
                <div className="min-h-96 my-60 px-4 relative" ref={godFatherDescriptionContainer}>
                    <motion.div
                        style={{
                            zIndex: -1,
                            left: godFatherLeft,
                            clipPath: useTransform(godFatherScrollYProgress, [0, 0.4, 1], [
                                "inset(0 100% 0 0%)", // completely hidden
                                "inset(0 0% 0 0%)",  // fully revealed
                                "inset(0 0% 0 100%)",  // completely hidden
                            ]),
                        }}
                        className={`absolute w-1/2 max-w-[7cm] h-full`}
                    >
                        <img
                            src={godFatherImage}
                            alt="god father's dark picture"
                            className={`absolute w-full h-full left-0 object-cover object-left`}
                        />
                    </motion.div>

                    <div className="text-4xl">
                        {data.roles.گادفادر.title}
                    </div>

                    {data.roles.گادفادر.description.map((d, i) =>
                        <div key={i} className="py-4 w-[70%]">
                            {d}
                        </div>
                    )}
                </div>

                {/* Lady */}
                <div className="min-h-96 my-60 p-4 relative" ref={ladyDescriptionContainer}>
                    <motion.div
                        style={{
                            zIndex: -1,
                            left: ladyLeft,
                            clipPath: useTransform(ladyScrollYProgress, [0, 0.4, 1], [
                                "inset(0 100% 0 0%)", // completely hidden
                                "inset(0 0% 0 0%)",  // fully revealed
                                "inset(0 0% 0 100%)",  // completely hidden
                            ]),
                        }}
                        className={`absolute w-1/2 max-w-[7cm] h-full`}
                    >
                        <img
                            src={ladyImage}
                            alt="god father's dark picture"
                            className={`absolute w-full h-full left-0 object-cover object-left`}
                        />
                    </motion.div>

                    <div className="text-4xl">
                        {data.roles.لیدی.title}
                    </div>

                    {data.roles.لیدی.description.map((d, i) =>
                        <div key={i} className="py-4 w-[70%]">
                            {d}
                        </div>
                    )}
                </div>

                {/* Doctor */}
                <div className="min-h-96 my-60 p-4 relative" ref={doctorDescriptionContainer}>
                    <motion.div
                        style={{
                            zIndex: -1,
                            left: doctorLeft,
                            clipPath: useTransform(doctorScrollYProgress, [0, 0.4, 1], [
                                "inset(0 100% 0 0%)", // completely hidden
                                "inset(0 0% 0 0%)",  // fully revealed
                                "inset(0 0% 0 100%)",  // completely hidden
                            ]),
                        }}
                        className={`absolute w-1/2 max-w-[7cm] h-full`}
                    >
                        <img
                            src={doctorImage}
                            alt="god father's dark picture"
                            className={`absolute w-full h-full left-0 object-cover object-left`}
                        />
                    </motion.div>

                    <div className="text-4xl">
                        {data.roles.دکتر.title}
                    </div>

                    {data.roles.دکتر.description.map((d, i) =>
                        <div key={i} className="py-4 w-[70%]">
                            {d}
                        </div>
                    )}
                </div>

                {/* Ahangar */}
                <div className="min-h-96 my-60 p-4 relative" ref={ahangarDescriptionContainer}>
                    <motion.div
                        style={{
                            zIndex: -1,
                            left: ahangarLeft,
                            clipPath: useTransform(ahangarScrollYProgress, [0, 0.4, 1], [
                                "inset(0 100% 0 0%)", // completely hidden
                                "inset(0 0% 0 0%)",  // fully revealed
                                "inset(0 0% 0 100%)",  // completely hidden
                            ]),
                        }}
                        className={`absolute w-1/2 max-w-[7cm] h-full`}
                    >
                        <img
                            src={ahangarImage}
                            alt="god father's dark picture"
                            className={`absolute w-full h-full left-0 object-cover object-left`}
                        />
                    </motion.div>

                    <div className="text-4xl">
                        {data.roles.آهنگر.title}
                    </div>

                    {data.roles.آهنگر.description.map((d, i) =>
                        <div key={i} className="py-4 w-[70%]">
                            {d}
                        </div>
                    )}
                </div>

                {/* Citizen */}
                <div className="min-h-96 my-60 p-4 relative" ref={citizenDescriptionContainer}>
                    <motion.div
                        style={{
                            zIndex: -1,
                            left: citizenLeft,
                            clipPath: useTransform(citizenScrollYProgress, [0, 0.4, 1], [
                                "inset(0 100% 0 0%)", // completely hidden
                                "inset(0 0% 0 0%)",  // fully revealed
                                "inset(0 0% 0 100%)",  // completely hidden
                            ]),
                        }}
                        className={`absolute w-1/2 max-w-[7cm] h-full`}
                    >
                        <img
                            src={citizenImage}
                            alt="god father's dark picture"
                            className={`absolute w-full h-full left-0 object-cover object-left`}
                        />
                    </motion.div>

                    <div className="text-4xl">
                        {data.roles['شهر ساده'].title}
                    </div>

                    {data.roles['شهر ساده'].description.map((d, i) =>
                        <div key={i} className="py-4 w-[70%]">
                            {d}
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}
