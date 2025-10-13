import scenarios from '@/data/scenarios.json'
import { AppContext } from '@/context'
import { useContext } from 'react'

export default function Ahangar() {
    const c = useContext(AppContext)

    const data = scenarios.find((f) => f.name === 'آهنگر')!

    const imageUrl = new URL(`/src/assets/pictures/${data.roles['گادفادر'].picture}_${c.theme}.png`, import.meta.url).href;

    return (
        <div>
            <img src={imageUrl} alt="god father's dark picture" className="w-full max-w-sm h-auto object-contain" />
        </div>
    )
}
