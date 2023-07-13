import React, { useState, useContext, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { store } from '../../contexts/PageContextStore';
import { showService } from '../../services/show/showService';
import { Show } from '../../models/ShowModel';
import Card from '../../components/Card';
import './index.scss'

interface ShowListProps {
  data?: Show[];
}
const ShowList = ({
  data,
}: ShowListProps) => {
  const [shows, setShows] = useState<Show[]>([]);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const { storeState: { searchText = '' } = {} } = useContext(store);
  const isSearching = !!searchText;


  //get show list 
  const loadFunc = async () => {
    if (isSearching) { return }
    const list = await showService.getShowlist(page);
    const { data = [], nextPage = 0 } = list;
    setShows(prevItems => [...prevItems, ...data])
    setPage(nextPage)
    setHasMore(!!data.length)
  }

  //search TV show by search text
  useEffect(() => {
    const fecthData = async () => {
      const list = await showService.searchByName(searchText);
      setShows(list)
      setPage(0)
      setHasMore(false)
    }
    if (searchText) {
      fecthData()
    } else {
      setShows([])
      setHasMore(true)
    }
  }, [searchText])


  return (
    <>
      {!shows.length && isSearching ? <h2>Sorry, no results.</h2> :
        <InfiniteScroll
          className='showlist'
          pageStart={0}
          loadMore={loadFunc}
          hasMore={hasMore}
          loader={<div className="loader" key={0}>Loading ...</div>}
        >
          {shows.map((item, index) =>
            <Card {...item} key={index} />
          )}
        </InfiniteScroll>
      }
    </>
  );
}

export default ShowList;