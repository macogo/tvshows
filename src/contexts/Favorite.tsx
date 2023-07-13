import React, { createContext, useContext, useEffect, useState } from 'react';
import { Show } from '../models/ShowModel';

const FavoriteShowsKey = 'FavoriteShows';
type FavoriteList = {
  [key in string]: Show;
};

interface FavoriteContextProps {
  addFavorite: (show: Show) => void;
  deleteFavorite: (showId: string) => void;
  isFavorite: (showId: string) => boolean;
}
const FavoriteContext = createContext<FavoriteContextProps>({
  isFavorite: () => false,
  deleteFavorite: () => { },
  addFavorite: () => { },
});

export const FavoriteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favoriteList, setFavoriteList] = useState<FavoriteList>({});

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    updateStorage(favoriteList);
  }, [favoriteList]);

  function loadData() {
    try {
      const stringifiedList = localStorage.getItem(FavoriteShowsKey);
      if (stringifiedList) {
        const list = JSON.parse(stringifiedList);
        setFavoriteList(list);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const updateStorage = (list: FavoriteList) => {
    try {
      const stringifiedList = JSON.stringify(list);
      localStorage.setItem(FavoriteShowsKey, stringifiedList);
    } catch (error) {
      console.log(error);
    }
  }

  const addFavorite = (show: Show) => {
    setFavoriteList(prev => {
      return {
        ...prev,
        [show.id]: show,
      };
    });
  }

  const deleteFavorite = (showId: string) => {
    if (favoriteList[showId]) {
      const updatedList = { ...favoriteList };
      delete updatedList[showId];
      setFavoriteList(updatedList);
    }
  }

  const isFavorite = (showId: string): boolean => {
    return !!favoriteList[showId];
  }

  return (
    <FavoriteContext.Provider
      value={{ addFavorite, deleteFavorite, isFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

const useFavorite = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error('useFavorite must be used within an FavoriteProvider');
  }
  return context;
}
export { useFavorite };