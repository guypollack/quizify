import { styles } from "./ArtistSearchStyles.js"

export function ArtistSearch({searchTerm, searchSuggestions, onChange}) {
  return (
    <div>
      <h1>Artist Search</h1>
      <input type="text" list="artist-selection-data" value={searchTerm} onChange={onChange} style={styles}></input>

      <datalist id="artist-selection-data">
        {searchSuggestions.map(suggestion => {
          return <option key={suggestion} value={suggestion} />
        })}
      </datalist>
    </div>
  )
}