export function TopTracks({data, show}) {
  return (
    <div className={`top-tracks${show ? " show" : ""}`}>
      {data.map((song, index) => {
      return <p>{index + 1}<span>. </span>{song}</p>
      })}
    </div>
  )
}