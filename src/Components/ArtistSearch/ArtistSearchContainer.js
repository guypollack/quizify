import { ArtistSearch } from "./ArtistSearch.js";
import "./ArtistSearchContainer.css";

export function ArtistSearchContainer({searchTerm, setSearchTerm, searchSuggestions, show}) {
  function handleChange({target}) {

    if (target.value !== " ") {
      setSearchTerm(target.value);
    } else {
      setSearchTerm("");
    }
  }
  return (
    <div className="artist-search">
      <ArtistSearch searchTerm={searchTerm} searchSuggestions={searchSuggestions} show={show} onChange={handleChange} />
    </div>
  )
};