import { ArtistSearch } from "./ArtistSearch.js";
import "./ArtistSearchContainer.css";

export function ArtistSearchContainer({searchTerm, setSearchTerm, searchSuggestions}) {
  function handleChange({target}) {
    setSearchTerm(target.value);
  }
  return (
    <div className="artist-search">
      <ArtistSearch searchTerm={searchTerm} searchSuggestions={searchSuggestions} onChange={handleChange} />
    </div>
  )
};