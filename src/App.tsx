import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, type Transition } from 'framer-motion'
import Sun from '@/assets/sun_sunny_heat_summer.svg?react'
import Moon from '@/assets/cloudy_night.svg?react'
import MenuIcon from '@/assets/menu.svg?react'
import lightTheme from '@/themes/blue/light'
import darkTheme from '@/themes/blue/dark'
import Menu from './components/Menu'
import AboutUs from './pages/AboutUs'
import Scenarios from './pages/Scenarios'

const transition: Transition = {
    duration: 0.5,
    ease: [0, 0.75, 0.25, 1],
}

function App() {
    const [page, setPage] = useState<number>(0)
    const [menuOpen, setMenuOpen] = useState<boolean>(false)

    console.log('App', `page: ${page}`)

    const [theme, setTheme] = useState<'dark' | 'light'>('dark')

    const fetchFromLocalStorage = useRef(false)
    useEffect(() => {
        if (localStorage.getItem('theme') !== null)
            changeTheme(localStorage.getItem('theme') as any)

        if (window.matchMedia("(prefers-color-scheme:dark").matches)
            changeTheme('dark')
        else
            changeTheme('light')

        fetchFromLocalStorage.current = true
    }, [])

    const changeTheme = (t: 'dark' | 'light') => {
        const themeColors = t === 'light' ? lightTheme : darkTheme

        for (const key in themeColors)
            if (Object.prototype.hasOwnProperty.call(themeColors, key)) {
                const color = (themeColors as any)[key];
                console.log(color)

                document.documentElement.style.setProperty(`--${key}`, `${color}`)
            }

        localStorage.setItem('theme', t)
        setTheme(t)
    }

    return (
        <div className="flex flex-col h-screen w-screen">
            <div className="w-full flex flex-row justify-start bg-primary items-center p-2">
                <MenuIcon className='cursor-pointer stroke-primary-foreground fill-primary-foreground' fontSize={30} onClick={() => setMenuOpen(!menuOpen)} />
                <div className="flex-1"></div>
                {theme === 'dark' && <Sun className='cursor-pointer stroke-primary-foreground fill-primary-foreground' fontSize={30} onClick={() => changeTheme('light')} />}
                {theme === 'light' && <Moon className='cursor-pointer stroke-primary-foreground fill-primary-foreground' fontSize={30} onClick={() => changeTheme('dark')} />}
            </div>

            <div className="w-full relative">
                <AnimatePresence mode='sync'>
                    {page === 0 &&
                        <motion.div
                            className='top-0 left-0 absolute h-full w-full'
                            custom={document.documentElement.style.direction}
                            variants={{
                                initial: (custom) => (custom === 'ltr' ? { left: '-100%' } : { right: '-100%' }),
                                animate: (custom) => (custom === 'ltr' ? { left: page === 0 ? '0%' : '-100%' } : { right: page === 0 ? '0%' : '-100%' }),
                                exit: (custom) => (custom === 'ltr' ? { left: '-100%' } : { right: '-100%' })
                            }}
                            initial={'initial'}
                            animate={'animate'}
                            exit={'exit'}
                            transition={transition}
                            key={'page1'}
                        >
                            <AboutUs />
                        </motion.div>
                    }

                    {page === 1 &&
                        <motion.div
                            className="top-0 left-0 absolute h-full w-full"
                            custom={document.documentElement.style.direction}
                            variants={{
                                initial: (custom) => (custom === 'ltr' ? { left: '-100%' } : { right: '-100%' }),
                                animate: (custom) => (custom === 'ltr' ? { left: page === 1 ? '0%' : '-100%' } : { right: page === 1 ? '0%' : '-100%' }),
                                exit: (custom) => (custom === 'ltr' ? { left: '-100%' } : { right: '-100%' })
                            }}
                            initial={'initial'}
                            animate={'animate'}
                            exit={'exit'}
                            transition={transition}
                            key={'page2'}
                        >
                            <Scenarios />
                        </motion.div>
                    }
                    {menuOpen &&
                        <motion.div
                            className="top-0 left-0 absolute h-full w-full"
                            custom={document.documentElement.style.direction}
                            variants={{
                                initial: (custom) => (custom === 'ltr' ? { left: '-100%' } : { right: '-100%' }),
                                animate: (custom) => (custom === 'ltr' ? { left: menuOpen ? '0%' : '-100%' } : { right: menuOpen ? '0%' : '-100%' }),
                                exit: (custom) => (custom === 'ltr' ? { left: '-100%' } : { right: '-100%' })
                            }}
                            initial={'initial'}
                            animate={'animate'}
                            exit={'exit'}
                            transition={transition}
                            key={'menu'}
                        >
                            <Menu page={page} setPage={setPage} close={() => setMenuOpen(false)} />
                        </motion.div>
                    }
                </AnimatePresence>
            </div>
        </div>
    )
}

export default App
