import { SongSearch } from "./SongSearch.js";

export function SongSearchContainer({searchTerms, setSearchTerms, searchSuggestions, currentSongInput, setCurrentSongInput, show, marks, disabled}) {
  function handleFocus({target}) {
    setCurrentSongInput(Number(target.id));
  }
  function handleChange({target}) {
    if (target.value !== " ") {
      setSearchTerms(prev => ({...prev, [currentSongInput]: target.value}));
    } else {
      setSearchTerms(prev => ({...prev, [currentSongInput]: ""}));
    }
  }
  return (
    <div className="song-search-container">
      <h3>Guess your Artist's Most Popular Tracks on Spotify</h3>
      <small>Note: Popularity is based on the total number of plays the track has had and how recent those plays are.<br />
        Songs that are being played a lot now will have a higher popularity than songs that were played a lot in the past.
        {/* Note: the popularity value may lag actual popularity by a few days: the value is not updated in real time. */}
      </small>
      {[1,2,3,4,5].map(num => {
        return <SongSearch show={show[num]} mark={marks[num]} key={num.toString()} inputNumber={num.toString()} searchTerm={searchTerms[num]} searchSuggestions={searchSuggestions[num]} onFocus={handleFocus} onChange={handleChange} disabled={disabled} />
      })}
    </div>
  )
};