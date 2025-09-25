'use client'
import { useSearchContext } from 'fumadocs-ui/provider'
import { ChevronDownIcon, Search } from 'lucide-react'
import { Suspense, useState } from 'react'
import { cn } from '@/lib/utils'
import { AsideLink } from '../aside-link'
import { contents } from './sidebar-routes'

export function Sidebar() {
  const [currentOpen, setCurrentOpen] = useState(0)
  const { setOpenSearch } = useSearchContext()

  return (
    <div className={cn('fixed start-0 top-0')}>
      <aside
        className={cn(
          'md:transition-all',
          'border-r top-[56px] md:flex hidden md:w-[268px] lg:w-[286px] overflow-y-auto absolute h-[calc(100dvh-55px)] pb-2 flex-col justify-between w-[var(--fd-sidebar-width)]'
        )}
      >
        <div>
          <button
            type="button"
            className="flex w-full items-center gap-2 px-5 py-2.5 border-b text-muted-foreground dark:bg-zinc-950 dark:border-t-zinc-900/30 dark:border-t"
            onClick={() => setOpenSearch(true)}
          >
            <Search className="size-4 mx-0.5" />
            <p className="text-sm">Search documentation...</p>
          </button>

          <div className="flex flex-col">
            {contents.map((item, index) => (
              <div key={item.title}>
                <button
                  type="button"
                  className="border-b w-full hover:underline border-lines text-sm px-5 py-2.5 text-left flex items-center gap-2"
                  onClick={() => {
                    if (currentOpen === index) {
                      setCurrentOpen(-1)
                    } else {
                      setCurrentOpen(index)
                    }
                  }}
                >
                  <item.Icon className="size-5" />
                  <span className="grow">{item.title}</span>
                  {/*{item.isNew && <NewBadge />}*/}
                  <div>
                    <ChevronDownIcon
                      className={cn(
                        'h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200'
                      )}
                    />
                  </div>
                </button>
                {currentOpen === index && (
                  <div className="relative overflow-hidden">
                    <div className="text-sm">
                      {item.list.map((listItem) => (
                        <div key={listItem.title}>
                          <Suspense fallback={<>Loading...</>}>
                            {listItem.group ? (
                              <div className="flex flex-row items-center gap-2 mx-5 my-1 ">
                                <p className="text-sm text-transparent bg-gradient-to-tr dark:from-gray-100 dark:to-stone-200 bg-clip-text from-gray-900 to-stone-900">
                                  {listItem.title}
                                </p>
                                <div className="flex-grow h-px bg-gradient-to-r from-stone-800/90 to-stone-800/60" />
                              </div>
                            ) : (
                              <AsideLink
                                href={listItem.href}
                                startWith="/docs"
                                title={listItem.title}
                                className="break-words text-nowrap w-[--fd-sidebar-width] [&>div>div]:hover:!bg-fd-muted"
                                activeClassName="[&>div>div]:!bg-fd-muted"
                              >
                                <div className="min-w-4">
                                  <listItem.icon className="text-stone-950 dark:text-white" />
                                </div>
                                {listItem.title}
                                {/*{listItem.isNew && <NewBadge />}*/}
                              </AsideLink>
                            )}
                          </Suspense>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  )
}
