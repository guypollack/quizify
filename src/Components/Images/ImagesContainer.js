import { Image } from "./Image";

export function ImagesContainer({ imageData, scores, imageVisibility }) {
  // console.log(imageData);
  return (
    imageData.map((artist, index) => <Image 
                                        key={artist.name}
                                        url={artist.url}
                                        name={artist.name}
                                        score={scores[index + 1]}
                                        visibility={imageVisibility[index]}
                                      />) //{
    //   return (
    //     <div className="artist-image-container" key={artist.name}>
    //       <img className="artist-image" src={artist.url} />
    //       <p>{artist.name}</p>
    //       <p>{scores[index + 1]}/15</p>
    //     </div>)
    // })
  )
}