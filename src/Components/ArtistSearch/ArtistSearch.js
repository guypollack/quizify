import { styles } from "./ArtistSearchStyles.js"

export function ArtistSearch({searchTerm, searchSuggestions, show, onChange, onClick}) {
  return (
    <div>
      <h1>Artist Search</h1>
      {/* <h2>{show.toString()}</h2> */}
      <input autoComplete="off" onInput={onClick} type="text" list={show ? "artist-selection-data" : null} value={searchTerm} onChange={onChange} style={styles}></input>

      <datalist id="artist-selection-data">
        {searchSuggestions.map(suggestion => {
          return <option key={suggestion} value={suggestion} />
        })}
      </datalist>
    </div>
  )
}