import { useClickOutside } from "@/hooks/useClickOutside"

export default function Menu({ page, setPage, close }: { page: number, setPage: React.Dispatch<React.SetStateAction<number>>, close?: () => void }) {
    let ref
    ref = useClickOutside<HTMLDivElement>(() => { if (close) close() })

    return (
        <div className="flex flex-col gap-2 h-screen max-w-1/2 *:px-6 *:py-2 border-2 bg-background" ref={ref}>
            <div className={`text-md cursor-pointer ${page === 0 ? 'text-primary' : ''}`} onClick={() => setPage(0)}>
                در باره ما
            </div>

            <div className={`text-md cursor-pointer ${page === 1 ? 'text-primary' : ''}`} onClick={() => setPage(1)}>
                سناریوها
            </div>
        </div>
    )
}