export function ArtistSearch({searchTerm, searchSuggestions, show, onChange}) {
  return (
    <div className="artist-search">
      <h2>Choose an Artist</h2>
      <input autoComplete="off" type="text" list={show ? "artist-selection-data" : null} value={searchTerm} onChange={onChange}></input>

      <datalist id="artist-selection-data">
        {searchSuggestions.map(suggestion => {
          return <option key={suggestion} value={suggestion} />
        })}
      </datalist>
    </div>
  )
}