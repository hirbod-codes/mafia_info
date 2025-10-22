import { useContext, useRef, type RefObject } from "react";
import { motion, useScroll, useTransform } from 'framer-motion'
import { AppContext } from "@/context";
import type { Role } from "@/data/scenarios";

export default function RoleCard({ containerRef, playersCount, role }: { containerRef: RefObject<null>, playersCount: number, role: ((playersCount: number) => Role) | Role }) {
    const c = useContext(AppContext)

    const descriptionContainer = useRef(null)
    const { scrollYProgress } = useScroll({
        container: containerRef,
        target: descriptionContainer,
        offset: ["start end", "end start"], // when top enters bottom → bottom leaves top
    });
    const left = useTransform(scrollYProgress, [0, 0.5, 1], [c.direction === 'rtl' ? '-50%' : '150%', c.direction === 'rtl' ? '0%' : '50%', c.direction === 'rtl' ? '-50%' : '150%'])

    if (typeof role === "function")
        role = role(playersCount)

    return (
        <div className="min-h-96 mb-60 p-4 relative" ref={descriptionContainer}>
            <motion.div
                style={{
                    zIndex: -1,
                    left,
                    clipPath: useTransform(scrollYProgress, [0, 0.4, 1], [
                        "inset(0 100% 0 0%)", // completely hidden
                        "inset(0 0% 0 0%)",  // fully revealed
                        "inset(0 0% 0 100%)",  // completely hidden
                    ]),
                }}
                className={`absolute w-1/2 max-w-[7cm] h-full`}
            >
                <img
                    src={new URL(`/src/assets/pictures/${role.picture}_${c.theme}.png`, import.meta.url).href}
                    alt="god father's dark picture"
                    className={`absolute w-full h-96 left-0 object-cover object-left`}
                />
            </motion.div>

            <div className="text-4xl">
                {typeof role.title === "function" ? role.title(playersCount) : role.title}
            </div>

            {(typeof role.descriptions === "function" ? role.descriptions(playersCount) : role.descriptions).map((d, i) =>
                <div key={i} className="p-2 w-[70%] rounded-2xl bg-background/50 my-2">
                    {d}
                </div>
            )}
        </div>
    )
}

