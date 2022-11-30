export function Image({name, url, visibility, score}) {
  const divClass = "artist-image-container " + visibility;
  return (
    <div className={divClass}>
      <img className="artist-image" src={url} />
      <p>{name}</p>
      <p>{score}/15</p>
      {/* <p>{visibility}</p> */}
    </div>)
}