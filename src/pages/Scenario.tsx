import { type Scenario } from '@/data/scenarios'
import { AppContext } from '@/context'
import { useContext, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { colord } from "colord";
import RoleCard from '@/components/RoleCard';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/shadcn/ui/select';

export default function Scenario({ scenario }: { scenario: Scenario }) {
    const c = useContext(AppContext)

    const [playersCount, setPlayersCount] = useState<number>(scenario.playersCount[0])

    // main
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({ container: containerRef })
    const mainOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])
    const mainHeight = useTransform(scrollYProgress, [0, 0.2], ['40%', '100%'])

    const color: any = colord(document.documentElement.style.getPropertyValue('--background'))

    const descriptions = typeof scenario.descriptions === "function" ? scenario.descriptions(playersCount) : scenario.descriptions
    const independentRoles = typeof scenario.independentRoles === "function" ? scenario.independentRoles(playersCount) : scenario.independentRoles
    const mafiaRoles = typeof scenario.mafiaRoles === "function" ? scenario.mafiaRoles(playersCount) : scenario.mafiaRoles
    const citizenRoles = typeof scenario.citizenRoles === "function" ? scenario.citizenRoles(playersCount) : scenario.citizenRoles
    const notes = typeof scenario?.notes === "function" ? scenario.notes(playersCount) : (scenario?.notes ?? [])
    const actsOrder = typeof scenario?.actsOrder === "function" ? scenario.actsOrder(playersCount) : (scenario?.actsOrder ?? [])

    console.log({
        playersCount,
        descriptions,
        independentRoles,
        mafiaRoles,
        citizenRoles,
        notes,
        actsOrder,
    })

    return (
        <div id='scenario' className='w-full h-full overflow-hidden'>
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
                        src={new URL(`/src/assets/pictures/${scenario.picture}_${c.theme}.png`, import.meta.url).href}
                        alt="main_picture"
                        className='absolute object-cover object-top w-full h-full'
                    />

                    <div className='absolute w-full h-full' style={{ background: `linear-gradient(180deg, rgba(${color.rgba.r}, ${color.rgba.g}, ${color.rgba.b}, 0) 0%, rgba(${color.rgba.r}, ${color.rgba.g}, ${color.rgba.b}, 1) 90%, rgba(${color.rgba.r}, ${color.rgba.g}, ${color.rgba.b}, 1) 100%)` }} />
                </motion.div>

                <div className="h-[30%]" />

                {scenario.playersCount.length > 1 &&
                    <div className="flex flex-row items-center gap-2 px-4">
                        <div>انتخاب تعداد بازیکنان:</div>

                        <Select defaultValue={playersCount.toString()} onValueChange={(v) => setPlayersCount(Number(v))}>
                            <SelectTrigger className="">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {scenario.playersCount.map((v, i) =>
                                        <SelectItem key={i} value={v.toString()}>{v.toString()}</SelectItem>
                                    )}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                }

                <div className="mb-60 p-4">
                    {descriptions.map((d, i) =>
                        <div key={i} className="py-4">{d}</div>
                    )}
                </div>

                {Object.keys(independentRoles ?? {}).length > 0 &&
                    <div className="px-2 mb-6 text-6xl border-b-2">
                        {Object.keys(independentRoles ?? {}).length > 1 ? "اعضا" : "عضو"} مستقل
                    </div>
                }

                {Object.values(independentRoles ?? {}).map((r, i) =>
                    <RoleCard key={i} playersCount={playersCount} role={r} containerRef={containerRef} />
                )}

                {Object.keys(mafiaRoles ?? {}).length > 0 &&
                    <div className="px-2 mb-6 text-6xl text-destructive border-b-2 border-destructive">
                        {Object.keys(mafiaRoles ?? {}).length > 1 ? "اعضای" : "عضو"} مافیا
                    </div>
                }

                {Object.values(mafiaRoles ?? {}).map((r, i) =>
                    <RoleCard key={i} playersCount={playersCount} role={r} containerRef={containerRef} />
                )}

                {Object.keys(citizenRoles ?? {}).length > 0 &&
                    <div className="px-2 mb-6 text-6xl text-green-800 border-b-2 border-green-800">
                        {Object.keys(citizenRoles ?? {}).length > 1 ? "اعضای" : "عضو"} شهروند
                    </div>
                }

                {Object.values(citizenRoles ?? {}).map((r, i) =>
                    <RoleCard key={i} playersCount={playersCount} role={r} containerRef={containerRef} />
                )}

                {notes.length > 0 &&
                    <div className="px-2 mb-6 mt-60 text-4xl border-b-2">
                        نکات
                    </div>
                }

                {notes.map((n, i) =>
                    <div key={i} className="p-2">
                        {n}
                    </div>
                )}

                {actsOrder.length > 0 &&
                    <div className="px-2 mb-6 mt-60 text-4xl border-b-2">
                        ترتیب بیدار شدن نقش ها در بازی
                    </div>
                }

                {actsOrder.map((a, i) =>
                    <div key={i} className="p-2">
                        {a}
                    </div>
                )}

            </div>
        </div>
    )
}
