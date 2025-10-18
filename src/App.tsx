import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, type Transition } from 'framer-motion'
import SunIcon from '@/assets/sun_sunny_heat_summer.svg?react'
import MoonIcon from '@/assets/cloudy_night.svg?react'
import LeftArrowIcon from '@/assets/left_arrow.svg?react'
import RightArrowIcon from '@/assets/right_arrow.svg?react'
import MenuIcon from '@/assets/menu.svg?react'
import lightTheme from '@/themes/purple/light'
import darkTheme from '@/themes/purple/dark'
import Menu from './components/Menu'
import AboutUs from './pages/AboutUs'
import Scenarios from './pages/Scenarios'
// import Ahangar from './pages/scenarios/Ahangar'
import Scenario from '@/pages/Scenario'
import { AppContext } from './context'
import { scenarios } from './data/scenarios'

const transition: Transition = {
    duration: 0.5,
    ease: [0, 0.75, 0.25, 1],
}

function App() {
    const [page, setPage] = useState<number>(0)
    const [menuOpen, setMenuOpen] = useState<boolean>(false)

    const dir = document.documentElement.attributes.getNamedItem('dir')?.value ?? 'ltr'

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

                document.documentElement.style.setProperty(`--${key}`, `${color}`)
            }

        localStorage.setItem('theme', t)
        setTheme(t)
    }

    return (
        <AppContext.Provider value={{ theme, direction: dir }}>
            <div className="flex flex-col h-screen w-screen">
                <div className="w-full flex flex-row justify-start bg-primary items-center p-2">
                    <MenuIcon className='cursor-pointer stroke-primary-foreground fill-primary-foreground' fontSize={30} onClick={() => { if (!menuOpen) setMenuOpen(true) }} />
                    <div className="flex-1"></div>
                    {page > 1 &&
                        (dir === 'rtl'
                            ? <RightArrowIcon className='cursor-pointer stroke-primary-foreground fill-primary-foreground' fontSize={30} onClick={() => setPage(1)} />
                            : <LeftArrowIcon className='cursor-pointer stroke-primary-foreground fill-primary-foreground' fontSize={30} onClick={() => setPage(1)} />
                        )
                    }
                    {theme === 'dark' && <SunIcon className='cursor-pointer stroke-primary-foreground fill-primary-foreground' fontSize={30} onClick={() => changeTheme('light')} />}
                    {theme === 'light' && <MoonIcon className='cursor-pointer stroke-primary-foreground fill-primary-foreground' fontSize={30} onClick={() => changeTheme('dark')} />}
                </div>

                <div id='motions-container' className="w-full h-full relative">
                    <AnimatePresence mode='sync'>

                        {page === 0 &&
                            <motion.div
                                className='top-0 left-0 absolute h-full w-full'
                                custom={dir}
                                variants={{
                                    initial: (custom) => (custom === 'ltr' ? { left: '-100%' } : { right: '-100%' }),
                                    animate: (custom) => (custom === 'ltr' ? { left: page === 0 ? '0%' : '-100%' } : { right: page === 0 ? '0%' : '-100%' }),
                                    exit: (custom) => (custom === 'ltr' ? { left: '-100%' } : { right: '-100%' })
                                }}
                                initial={'initial'}
                                animate={'animate'}
                                exit={'exit'}
                                transition={transition}
                                key={'page0'}
                                id='page0-motion'
                            >
                                <AboutUs setPage={setPage} />
                            </motion.div>
                        }

                        {page === 1 &&
                            <motion.div
                                className="top-0 left-0 absolute h-full w-full"
                                custom={dir}
                                variants={{
                                    initial: (custom) => (custom === 'ltr' ? { left: '-100%' } : { right: '-100%' }),
                                    animate: (custom) => (custom === 'ltr' ? { left: page === 1 ? '0%' : '-100%' } : { right: page === 1 ? '0%' : '-100%' }),
                                    exit: (custom) => (custom === 'ltr' ? { left: '-100%' } : { right: '-100%' })
                                }}
                                initial={'initial'}
                                animate={'animate'}
                                exit={'exit'}
                                transition={transition}
                                key={'page1'}
                                id='page1-motion'
                            >
                                <Scenarios setPage={setPage} />
                            </motion.div>
                        }

                        {page > 1 &&
                            <motion.div
                                className="top-0 left-0 absolute h-full w-full"
                                custom={dir}
                                variants={{
                                    initial: (custom) => (custom === 'ltr' ? { left: '-100%' } : { right: '-100%' }),
                                    animate: (custom) => (custom === 'ltr' ? { left: page > 1 ? '0%' : '-100%' } : { right: page > 1 ? '0%' : '-100%' }),
                                    exit: (custom) => (custom === 'ltr' ? { left: '-100%' } : { right: '-100%' })
                                }}
                                initial={'initial'}
                                animate={'animate'}
                                exit={'exit'}
                                transition={transition}
                                key={'page' + page}
                                id='page2-motion'
                            >
                                <Scenario scenario={scenarios[page - 2]} />
                            </motion.div>
                        }

                        {menuOpen &&
                            <motion.div
                                className="top-0 left-0 absolute h-full w-full"
                                custom={dir}
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
                                id='manu-motion'
                            >
                                <Menu page={page} setPage={setPage} close={() => setMenuOpen(false)} />
                            </motion.div>
                        }

                    </AnimatePresence>
                </div>
            </div>
        </AppContext.Provider>
    )
}

export default App
