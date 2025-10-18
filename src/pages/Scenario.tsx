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
                    {scenario.descriptions.map((d, i) =>
                        <div key={i} className="py-4">{d}</div>
                    )}
                </div>

                {Object.keys(scenario?.independentRoles ?? {}).length > 0 &&
                    <div className="px-2 mb-6 text-6xl border-b-2">
                        {Object.keys(scenario?.independentRoles ?? {}).length > 1 ? "اعضا" : "عضو"} مستقل
                    </div>
                }

                {Object.values(scenario?.independentRoles ?? {}).map((r, i) =>
                    <RoleCard key={i} role={r} containerRef={containerRef} />
                )}

                {Object.keys(scenario?.mafiaRoles ?? {}).length > 0 &&
                    <div className="px-2 mb-6 text-6xl text-destructive border-b-2 border-destructive">
                        {Object.keys(scenario?.mafiaRoles ?? {}).length > 1 ? "اعضای" : "عضو"} مافیا
                    </div>
                }

                {Object.values(scenario?.mafiaRoles ?? {}).map((r, i) =>
                    <RoleCard key={i} role={r} containerRef={containerRef} />
                )}

                {Object.keys(scenario?.citizenRoles ?? {}).length > 0 &&
                    <div className="px-2 mb-6 text-6xl text-green-800 border-b-2 border-green-800">
                        {Object.keys(scenario?.citizenRoles ?? {}).length > 1 ? "اعضای" : "عضو"} شهروند
                    </div>
                }

                {Object.values(scenario?.citizenRoles ?? {}).map((r, i) =>
                    <RoleCard key={i} role={r} containerRef={containerRef} />
                )}

                {(scenario?.notes ?? []).length > 0 &&
                    <div className="px-2 mb-6 mt-60 text-4xl border-b-2">
                        نکات
                    </div>
                }

                {(scenario?.notes ?? []).map((n, i) =>
                    <div key={i} className="p-2">
                        {n}
                    </div>
                )}

                {(scenario?.actsOrder ?? []).length > 0 &&
                    <div className="px-2 mb-6 mt-60 text-4xl border-b-2">
                        ترتیب بیدار شدن نقش ها در بازی
                    </div>
                }

                {(scenario?.actsOrder ?? []).map((a, i) =>
                    <div key={i} className="p-2">
                        {a}
                    </div>
                )}

            </div>
        </div>
    )
}
