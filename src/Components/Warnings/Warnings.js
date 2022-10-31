export function Warnings({artist, blanks, dupes, previousArtist, artistValid, songsValid}) {
  if (!artistValid) {
    return <p>Select an artist from the list</p>
  }
  if (!songsValid) {
    return <p>Select songs by your chosen artist from the list</p>
  }
  if (previousArtist) {
    return <p>You have already guessed {artist}'s top tracks</p>
  }
  if (blanks) {
    return <p>Do not leave any fields blank</p>
  }
  if (dupes) {
    return <p>Please change duplicate answers</p>
  }
}