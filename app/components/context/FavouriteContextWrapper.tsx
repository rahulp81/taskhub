import React, {useState,useContext,createContext} from 'react'

interface favouriteContextPropType  {
favourite: favouriteType[] | null ;
setFavourite : React.Dispatch<React.SetStateAction<favouriteType[] | null>>
}

interface favouriteType{
   type : 'project' | 'label' | 'filter' ;
   name : string
}


export const FavouriteContext = createContext<favouriteContextPropType | null>(null)

export function useFavouriteContext(){
    const context = useContext(FavouriteContext);
    if (!context) {
      throw new Error("Context must be used within a Provider");
    }
    return context;
}


export function FavouriteProvider({children}:  {children : React.ReactNode}) {
  const[favourite,setFavourite] = useState<favouriteType[] | null>([]);
  console.log('favourites  are',favourite);
  return (
    <FavouriteContext.Provider value= {{favourite, setFavourite}}>
      {children}
    </FavouriteContext.Provider>
  )
}




