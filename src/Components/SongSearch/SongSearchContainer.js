import { SongSearch } from "./SongSearch.js";
import "./SongSearchContainer.css";

export function SongSearchContainer({searchTerms, setSearchTerms, searchSuggestions, currentSongInput, setCurrentSongInput, show}) {
  function handleFocus({target}) {
    setCurrentSongInput(Number(target.id));
  }
  function handleChange({target}) {
    setSearchTerms(prev => ({...prev, [currentSongInput]: target.value}));
  }
  return (
    <div className="song-search">
      {[1,2,3,4,5].map(num => {
        return <SongSearch show={show[num]} key={num.toString()} inputNumber={num.toString()} searchTerm={searchTerms[num]} searchSuggestions={searchSuggestions[num]} onFocus={handleFocus} onChange={handleChange} />
      })}
    </div>
  )
};