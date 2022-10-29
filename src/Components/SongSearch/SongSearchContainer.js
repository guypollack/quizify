import { SongSearch } from "./SongSearch.js";
import "./SongSearchContainer.css";

export function SongSearchContainer({searchTerm, setSearchTerm, searchSuggestions}) {
  function handleChange({target}) {
    setSearchTerm(target.value);
  }
  return (
    <div className="song-search">
      <SongSearch searchTerm={searchTerm} searchSuggestions={searchSuggestions} onChange={handleChange} />
    </div>
  )
};