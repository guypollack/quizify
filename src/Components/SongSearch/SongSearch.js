export function SongSearch({searchTerm, searchSuggestions, onChange, onFocus, inputNumber, show, mark, disabled}) {
  return (
    <div className="song-search">
      <input autoComplete="off" id={inputNumber} type="text" list={show ? `song-selection-data-${inputNumber}` : null} placeholder={`Guess ${inputNumber}`} value={searchTerm} onChange={onChange} onFocus={onFocus} disabled={disabled}></input>
      <div className={`tick-container${mark === "correct" ? " show" : ""}`}>
        <p>✓</p>
      </div>
      <div className={`squiggle-container${mark === "wrong-place" ? " show" : ""}`}>
        <p>~</p>
      </div>
      <div className={`cross-container${mark === "incorrect" ? " show" : ""}`}>
        <p>X</p>
      </div>
      <datalist id={`song-selection-data-${inputNumber}`}>
        {searchSuggestions.map(suggestion => {
          return <option key={suggestion} value={suggestion} />
        })}
      </datalist>
    </div>
  )
}