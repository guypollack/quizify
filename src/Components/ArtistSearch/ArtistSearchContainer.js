import { ArtistSearch } from "./ArtistSearch.js";
import "./ArtistSearchContainer.css";

export function ArtistSearchContainer({searchTerm, setSearchTerm, searchSuggestions, show}) {
  function handleChange({target}) {
    setSearchTerm(target.value);
  }
  function printer() {
    // console.log("Click");
  }
  return (
    <div className="artist-search">
      <ArtistSearch searchTerm={searchTerm} searchSuggestions={searchSuggestions} show={show} onChange={handleChange} onClick={printer}/>
    </div>
  )
};