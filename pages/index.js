import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react'
import ThemeChanger from '../components/ThemeChanger';
import styles from '../styles/Home.module.css'

export default function Home() {
  const [genre, setGenre] = useState({
    items: [
      { text: 'Action', value: 'Action' },
      { text: 'Comedy', value: 'Comedy' },
      { text: 'Drama', value: 'Drama' },
      { text: 'Adventure', value: 'Adventure' },
      { text: 'Science-Fiction', value: 'Science-Fiction' },
      { text: 'Thriller', value: 'Thriller' },
      { text: 'Mystery', value: 'Mystery' },
      { text: 'Romance', value: 'Romance' },
    ],
    selected: { text: 'Crime', value: 'Crime' },
    open: false,
    highlighted: -1
  });

  const [minRating, setMinRating] = useState('7');

  const itemsUlRef = useRef(null);

  useEffect(() => {
    if (genre.highlighted > -1)
      itemsUlRef.current.children[genre.highlighted].scrollIntoViewIfNeeded();
  }, [genre.highlighted])

  const handleDropdownNavigation = (ev) => {
    // debugger;
    console.log(ev.key);
    const keyAction = [
      { key: "Home", val: { open: true, highlighted: 0 } },
      { key: "End", val: { open: true, highlighted: genre.items.length - 1 } },
      { key: "ArrowDown", val: { open: true, highlighted: genre.highlighted === genre.items.length - 1 ? 0 : (genre.highlighted + 1) } },
      { key: "ArrowUp", val: { open: true, highlighted: genre.highlighted < 1 ? genre.items.length - 1 : (genre.highlighted - 1) } },
      { key: "Escape", val: { open: false } },
      {
        key: "Enter", handler: () => {
          let obj = { ...genre, open: !genre.open };
          if (genre.open && genre.highlighted > -1) {
            obj.selected = genre.items[genre.highlighted];
            obj.items = [...genre.items, genre.selected].filter(x => x.value !== obj.selected.value);
            obj.highlighted = -1;
          }
          setGenre({ ...obj });
        }
      },
    ].find(k => k.key === ev.key);
    setGenre({ ...genre, ...keyAction?.val || {} });
    keyAction?.handler?.(ev);
  }

  return (
    <>
      <ThemeChanger></ThemeChanger>
      <div className='flex h-[100vh] items-center w-10/12 sm:w-7/12 md:w-5/12 lg:w-4/12 xl:w-3/12 2xl:w-2/12 pt-3 mx-auto font-ubuntu-mono dark:text-slate-300 text-gray-700'>
        <div className='flex flex-col space-y-2 w-full mx-auto'>
          <div className='flex w-full text-lg'>
            <label className='flex w-4/12'>Genre</label>
            <div className='flex flex-col w-8/12 cursor-default'>
              <div onClick={() => { setGenre({ ...genre, open: !genre.open }) }}
                tabIndex={2}
                onBlur={() => { setGenre({ ...genre, open: false }) }}
                onKeyDown={handleDropdownNavigation}
                className={'flex justify-between px-2 bg-slate-300 dark:bg-slate-900 dark:border dark:focus:border-slate-500 dark:border-transparent dark:rounded-none rounded-t shadow-inner focus:outline-none' + (!genre.open ? ' rounded-b' : '')}>
                <div className=''>{genre.selected.text}</div>
                {
                  genre.open ?
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                }
              </div>
              <div className='relative w-full'>
                <ul ref={itemsUlRef} className={'bg-slate-200 dark:bg-slate-800 shadow-md absolute w-full duration-500 ease-in-out scrollbar scrollbar-thumb-radius-none scrollbar-track-slate-300 scrollbar-thumb-slate-700 hover:scrollbar-thumb-slate-900' + (genre.open ? ' max-h-[150px] overflow-auto' : ' max-h-[0px] overflow-hidden')}>
                  {
                    genre.items.map((x, ind) =>
                      <li
                        onMouseOver={(e) => { setGenre({ ...genre, highlighted: ind }) }}
                        onMouseDown={() => { setGenre({ ...genre, highlighted: -1, open: false, selected: x, items: [...genre.items, genre.selected].filter(g => g.value !== x.value) }); }}
                        key={x.value} className={'px-2 border-t border-l shadow-inner border-slate-300 dark:border-slate-500 duration-300' + (genre.highlighted === ind ? ' bg-slate-300 border-slate-100 dark:bg-slate-900 dark:border-slate-300' : '') + (genre.items.length - 1 === ind ? ' rounded-b dark:rounded-none' : '')}>{x.text}</li>
                    )
                  }
                </ul>
              </div>
            </div>
          </div>
          <div className='flex w-full text-lg'>
            <label className='flex w-4/12'>Min. rating</label>
            <div className='flex w-8/12 space-x-2'>
              <input onChange={(e) => { setMinRating(e.currentTarget.value) }} value={minRating}
                className='flex w-4/12 dark:border dark:focus:border-slate-500 dark:border-transparent bg-slate-300 dark:bg-slate-900 rounded dark:rounded-none shadow-inner focus:outline-none px-2' type={'text'}></input>
              <Link href={{
                pathname: '/game',
                query: { genre: genre.selected.value, minRating }
              }}>
                <a className='flex w-8/12 focus:outline-none bg-slate-700 dark:bg-slate-300 dark:text-slate-700 hover:dark:text-slate-900 focus:dark:text-slate-900 justify-center text-slate-300 hover:text-slate-200 rounded dark:rounded-none shadow duration-200'>Play</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
