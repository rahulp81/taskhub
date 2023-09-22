import React from 'react';

function FavoriteActions({
    noOfProjectInstances,
    isFavorite,
    handleFav,
    handleDeleteProject,
    p,
  }: {
    noOfProjectInstances: number;
    isFavorite: boolean;
    handleFav: React.Dispatch<React.SetStateAction<boolean>>;
    handleDeleteProject: () => void;
    p: string[] | null;
  }) {
    <span className='text-xs peer text-gray-500'>
      {noOfProjectInstances > 0 && (
        <span className='absolute right-0 pr-3 group-hover:hidden'>
          {noOfProjectInstances}
        </span>
      )}
      <span className='group-hover:opacity-100 opacity-0 transition-opacity duration-250'>
        <div className="flex gap-0.5">
          <button className="rounded hover:bg-slate-200 p-1">
            <div className="">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="" />
                <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                <path d="M16 5l3 3" />
              </svg>
            </div>
          </button>
          <button className="rounded hover-bg-slate-200  p-1" onClick={() => handleFav(isFavorite as boolean, p)}>
            <div>
              {isFavorite ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M3 3l18 18" />
                  <path d="M19.5 12.572l-1.5 1.428m-2 2l-4 4l-7.5 -7.428a5 5 0 0 1 -1.288 -5.068a4.976 4.976 0 0 1 1.788 -2.504m3 -1c1.56 0 3.05 .727 4 2a5 5 0 1 1 7.5 6.572" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                </svg>
              )}
            </div>
          </button>
          <button className="rounded hover-bg-slate-200 p-1" onClick={() => handleDeleteProject()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="" />
              <path d="M4 7l16 0" />
              <path d="M10 11l0 6" />
              <path d="M14 11l0 6" />
              <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
              <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
            </svg>
          </button>
        </div>
      </span>
    </span>
}