import { useEffect, useState } from 'react'
import ReactCardFlip from 'react-card-flip'
import { useSearchParams } from 'react-router-dom';

export default function Game() {
    const [queryParams, setQueryParams] = useSearchParams();
    const genre = queryParams.get('genre') || 'Crime';
    const minRating = parseFloat(queryParams.get('minRating') || '8');
    const [loading, setLoading] = useState('cards');
    const [cards, setCards] = useState([]);
    const [moves, setMoves] = useState(0);
    const [score, setScore] = useState(0);

    const getShuffledCards = (arr) => {
        let shuffled = [];
        let arrLength = arr.length;
        while (shuffled.length < arrLength) {
            let ind = Math.round(Math.random() * (arr.length - 1));
            let element = arr[ind];
            if (element !== null) {
                shuffled.push(element);
                arr[ind] = null;
            }
        }
        return shuffled;
    }

    useEffect(() => {
        const fetchShows = async () => {
            let shows = cards;
            while (shows.length < 10) {
                let data = await fetch('https://api.tvmaze.com/shows?page=' + (Math.round(Math.random() * 250) + 1).toString());
                data = await data.json();
                shows.push(...data.filter(s => shows.map(x => x.id).indexOf(s.id) < 0 && s.genres.indexOf(genre) > -1 && s.rating.average >= 8 && s.image !== null));
            }
            
            shows = getShuffledCards(shows);
            shows = shows.filter((s, i) => i < 10);
            setCards(getShuffledCards(
                [
                    ...shows.map(s => { return { ...s, cardGroup: 'a', flipped: false } }),
                    ...shows.map(s => { return { ...s, cardGroup: 'b', flipped: false } })
                ]
            ));
            setLoading(null);
        }
        fetchShows();
    }, [])

    useEffect(() => {
        const fc = cards.filter(x => x.flipped).map(y => y.id);
        const solved = cards.filter(x => x.flipped).map(y => y.id).filter((e, i, a) => a.indexOf(e) !== i);
        setScore(-1 * moves + solved.length * 10);
        if ((fc.length > 0) && (fc.length % 2 === 0)) {
            setTimeout(() => {
                let updatedCardsState = cards.map(x => { return { ...x, flipped: solved.indexOf(x.id) > -1 } });
                const newFc = updatedCardsState.filter(x => x.flipped).map(y => y.id);
                if (fc.toString() !== newFc.toString())
                    setCards([...updatedCardsState]);
            }, 1000);
        }
    }, [cards])

    return (
        <>
            <div className='flex w-11/12 xl:w-5/12 lg:w-6/12 md:w-7/12 sm:w-3/4 mx-auto font-ubuntu-mono dark:text-slate-300 text-gray-700'>
                {
                    loading === 'cards' ?
                        <div className="flex w-full items-center justify-center h-[100vh]">
                            <div className="w-20 h-20 border-t-2 border-b-2 border-gray-700 dark:border-slate-300 rounded-full animate-spin"></div>
                        </div>
                        :
                        <div className='flex h-[100vh] justify-center flex-col w-full'>
                            <div className='flex'>
                                <h1 className="text-2xl">Score: {score.toString()}</h1>
                            </div>
                            <div className='w-full grid grid-cols-5 gap-2'>
                                {
                                    cards.map((c, ind) =>
                                        <ReactCardFlip key={ind} isFlipped={cards[ind].flipped} containerClassName='cursor-pointer bg-gray-700 dark:bg-slate-300 dark:text-gray-700 text-slate-300 shadow-lg border border-gray-700 dark:border-slate-300'>
                                            <div onClick={() => {
                                                setMoves(moves + 1);
                                                let updatedCardsState = cards;
                                                updatedCardsState[ind].flipped = true;
                                                setCards([...updatedCardsState]);
                                            }
                                            }
                                                className='flex group text-5xl justify-center items-center aspect-[210/295]'>
                                                <span className='duration-300 group-hover:rotate-45'>?</span>
                                            </div>
                                            <div className='flex w-100 h-100'>
                                                <img className='flex' src={c.image.medium} width={210} height={295}></img>
                                            </div>
                                        </ReactCardFlip>
                                    )
                                }
                            </div>
                        </div>
                }
            </div>
        </>
    )
}
