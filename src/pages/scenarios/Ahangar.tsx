import scenarios from '@/data/scenarios.json'
import { AppContext } from '@/context'
import { useContext, useEffect, useRef } from 'react'
import { motion, useInView, useScroll, useTransform, type Transition } from 'framer-motion'

const transition: Transition = {
    duration: 3,
    ease: [0.5, 0.15, 0.5, 0.85],
}

export default function Ahangar() {
    const c = useContext(AppContext)

    const data = scenarios.find((f) => f.name === 'آهنگر')!

    const main = new URL(`/src/assets/pictures/${data.picture}_${c.theme}.png`, import.meta.url).href;
    const GodFather = new URL(`/src/assets/pictures/${data.roles['گادفادر'].picture}_${c.theme}.png`, import.meta.url).href;

    const { scrollYProgress } = useScroll()

    const ref = useRef(null)
    const isInView = useInView(ref)

    const godFatherLeft = useTransform(scrollYProgress, [0.2, 0.4, 0.8], ['-30%', '5%', '-30%'])

    useEffect(() => {
        const func = () => console.log(scrollYProgress, godFatherLeft)
        document.addEventListener('scroll', func)

        return () => document.removeEventListener('scroll', func)
    }, [])

    return (
        <>
            <motion.div
                id="scroll-indicator"
                style={{
                    scaleX: scrollYProgress,
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 10,
                    originX: 0,
                    backgroundColor: "#ff0088",
                }}
            />

            <div className="relative overflow-hidden" ref={ref}>
                <div className="my-4 border-2 p-4">
                    {data.dedscription.map((d, i) =>
                        <div key={i} className="py-2">{d}</div>
                    )}
                </div>
                {/* <motion.img
                    src={main}
                    alt="main_picture"
                    initial={{ opacity: 1, objectFit: 'top' }}
                    animate={{ opacity: 1, objectFit: 'top' }}
                    className='fixed w-full h-full'
                /> */}
                <motion.img
                    custom={c.direction}
                    style={{
                        left: godFatherLeft,
                        transform: "translateY(-50%)"
                    }}
                    // variants={{
                    //     animate: (custom) => (custom === 'ltr' ? { left: isInView ? '0%' : '-100%' } : { right: isInView ? '0%' : '-100%' }),
                    // }}
                    // animate={'animate'}
                    transition={transition}
                    src={GodFather}
                    alt="god father's dark picture"
                    className={`absolute w-[30%] h-[40%] object-cover object-left`}
                />
                <div className="my-4 border-2 p-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod necessitatibus expedita quia quidem minus ipsam recusandae, iusto nihil ad id aliquid, incidunt repellendus illum quis iste rerum sit asperiores at omnis quam. Rem blanditiis dicta enim, id, ullam totam eveniet inventore repudiandae quas, accusamus explicabo soluta nulla maxime vero illo?
                </div>
            </div>
            <div className="my-4 border-2 p-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, repellendus incidunt? Sed at eaque aspernatur doloremque? Tenetur, voluptate saepe hic repellendus dolore illo corrupti vel tempora dolores aperiam reiciendis doloremque similique ullam veniam eveniet autem accusamus, et blanditiis possimus? Veritatis nostrum, unde pariatur ipsum quae explicabo tempora aperiam sit nulla magni! Nobis fuga quos nostrum aliquid optio, tempore earum sapiente! Quae nostrum rem atque ut itaque natus, sunt quasi provident necessitatibus enim quam laborum iusto corrupti earum magnam qui officia reprehenderit voluptatem ad. Obcaecati earum doloremque deserunt reiciendis, nisi aspernatur perspiciatis omnis vero. Soluta ducimus doloribus unde, saepe eaque debitis rem magni consequuntur, quae quod sunt explicabo voluptatum quam! Eum facere dolorem, perspiciatis debitis quidem at esse ex, vitae quisquam tempora quibusdam labore officia dolorum. Maxime enim id cupiditate recusandae, sapiente odit eligendi repudiandae dignissimos deleniti veniam, exercitationem dolor ullam tenetur, ratione ad. Ad repellat est ullam cum, amet incidunt autem, beatae, commodi perspiciatis eum laborum culpa obcaecati! Obcaecati rem labore dignissimos suscipit nemo non nostrum, pariatur vero perferendis eos! Iusto recusandae voluptatibus nostrum nemo molestiae, sunt libero dolorem dolore nulla alias, illo consequatur eum nam mollitia, praesentium exercitationem! Quisquam perferendis ipsa modi sequi excepturi consectetur quibusdam eligendi quod laudantium.
            </div>
        </>
    )
}
