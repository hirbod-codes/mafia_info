import scenarios from '@/data/scenarios.json'
import LeftArrowIcon from '@/assets/left_arrow.svg?react'
import RightArrowIcon from '@/assets/right_arrow.svg?react'
import { useContext } from 'react'
import { AppContext } from '@/context'

export default function Scenarios({ setPage }: { setPage: React.Dispatch<React.SetStateAction<number>> }) {
    const c = useContext(AppContext)

    return (
        <div className="flex flex-col gap-3 p-2">
            {scenarios.map((s, i) =>
                <div key={i} className="text-2xl rounded-2xl bg-primary shadow-2xl p-3 flex flex-row justify-between" onClick={() => setPage(i + 2)}>
                    {s.name}
                    {
                        c.direction === 'rtl'
                            ? <LeftArrowIcon className='cursor-pointer stroke-primary-foreground fill-primary-foreground' fontSize={30} onClick={() => setPage(1)} />
                            : <RightArrowIcon className='cursor-pointer stroke-primary-foreground fill-primary-foreground' fontSize={30} onClick={() => setPage(1)} />
                    }
                </div>
            )}
        </div>
    )
}
