import { ArtistSearch } from "./ArtistSearch.js";

export function ArtistSearchContainer({searchTerm, setSearchTerm, searchSuggestions, show}) {
  function handleChange({target}) {

    if (target.value !== " ") {
      setSearchTerm(target.value);
    } else {
      setSearchTerm("");
    }
  }
  return (
    <div className="artist-search-container">
      <ArtistSearch searchTerm={searchTerm} searchSuggestions={searchSuggestions} show={show} onChange={handleChange} />
    </div>
  )
};