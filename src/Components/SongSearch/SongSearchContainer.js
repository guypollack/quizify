import { SongSearch } from "./SongSearch.js";
import "./SongSearchContainer.css";

export function SongSearchContainer({searchTerms, setSearchTerms, searchSuggestions, currentSongInput, setCurrentSongInput}) {
  function handleFocus({target}) {
    // console.log(currentSongInput);
    setCurrentSongInput(Number(target.id));
    // console.log(searchSuggestions);
  }
  function handleChange({target}) {
    setSearchTerms(prev => ({...prev, [currentSongInput]: target.value}));
    // console.log(searchSuggestions);
  }
  return (
    <div className="song-search">
      <SongSearch key="1" inputNumber="1" searchTerm={searchTerms[1]} searchSuggestions={searchSuggestions[1]} onFocus={handleFocus} onChange={handleChange} />
      <SongSearch key="2" inputNumber="2" searchTerm={searchTerms[2]} searchSuggestions={searchSuggestions[2]} onFocus={handleFocus} onChange={handleChange} />
      <SongSearch key="3" inputNumber="3" searchTerm={searchTerms[3]} searchSuggestions={searchSuggestions[3]} onFocus={handleFocus} onChange={handleChange} />
      <SongSearch key="4" inputNumber="4" searchTerm={searchTerms[4]} searchSuggestions={searchSuggestions[4]} onFocus={handleFocus} onChange={handleChange} />
      <SongSearch key="5" inputNumber="5" searchTerm={searchTerms[5]} searchSuggestions={searchSuggestions[5]} onFocus={handleFocus} onChange={handleChange} />
    </div>
  )
};