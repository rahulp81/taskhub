import React, { useState, useContext, createContext, useEffect, useRef } from 'react'

interface favouriteContextPropType {
  favourite: favouriteType[] | null;
  setFavourite: React.Dispatch<React.SetStateAction<favouriteType[] | null>>
}

interface favouriteType {
  type: 'project' | 'label' | 'filter';
  name: string
}


export const FavouriteContext = createContext<favouriteContextPropType | null>(null)

export function useFavouriteContext() {
  const context = useContext(FavouriteContext);
  if (!context) {
    throw new Error("Context must be used within a Provider");
  }
  return context;
}


export function FavouriteProvider({ children }: { children: React.ReactNode }) {
  const [favourite, setFavourite] = useState<favouriteType[] | null>([]);

  const retryRef = useRef<number>(0);
  useEffect(() => {
    const fetchData = async () => {
      console.log('calling fetch');
      try {
        const res = await fetch('/api/app/favorite');
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const { favorites } = await res.json();
        console.log('result fav:', favorites);

        setFavourite(favorites);
        retryRef.current = 0;
      } catch (error) {
        if (retryRef.current < 3) {
          retryRef.current += 1;
          await fetchData(); // Retry the fetchData function
        } else {
          retryRef.current = 0;
          console.error('Failed to fetch data after 3 retries:', error);
        }
      }
    };

    fetchData(); // Call the async function inside useEffect
  }, []);

  return (
    <FavouriteContext.Provider value={{ favourite, setFavourite }}>
      {children}
    </FavouriteContext.Provider>
  )
}




