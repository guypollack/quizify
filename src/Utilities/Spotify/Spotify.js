import { SongSearch } from "../../Components/SongSearch/SongSearch";

const clientId = "418cbefe2991437ca105b8e953755b2b";
const redirectUri = "http://localhost:3000/" //"http://quizify-music.surge.sh"; //"https://quizify-music.netlify.app"; //"http://localhost:3000/";
let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    } else if (window.location.href.includes("access_token") && window.location.href.includes("expires_in")) {
      const urlString = window.location.href;
      accessToken = urlString.match(/access_token=([^&]*)/)[1];
      const expiresIn = Number(urlString.match(/expires_in=([^&]*)/)[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
    }
  },
  search(type, term) {
    const headers = { Authorization: `Bearer ${Spotify.getAccessToken()}` };

    // fetch(`https://api.spotify.com/v1/search?type=artist&q=the+mountain+goats`, {headers: headers})
    //   .then(response => {
    //     console.log(response.json());
    //   })

    // fetch(`https://api.spotify.com/v1/artists/5ictveRyhWRs8Gt8Dvt1hS/top-tracks?market=GB`, {headers: headers})  
    //   .then(response => {
    //     console.log(response.json());
    //   })

    return fetch(`https://api.spotify.com/v1/search?type=${type}&q=${term}`, {headers: headers})
      .then(response => {
        return response.json();
      })
  },
  songSearch(song,artist) {
    const headers = { Authorization: `Bearer ${Spotify.getAccessToken()}` };

    return fetch(`https://api.spotify.com/v1/search?q=track:${song}%20artist:${artist}&type=track`, {headers: headers})
      .then(response => {
        return response.json();
      })
  },
  getTopTracks(id) {
    const headers = { Authorization: `Bearer ${Spotify.getAccessToken()}` };

    return fetch(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=GB`, {headers: headers})
      .then(response => {
        // console.log(response.json());
        return response.json();
      })
  }
};

export default Spotify;






// function getAccessToken() {
//   if (accessToken) {
//     return accessToken;
//   } else if (window.location.href.includes("access_token") && window.location.href.includes("expires_in")) {
//     const urlString = window.location.href;
//     accessToken = urlString.match(/access_token=([^&]*)/)[1];
//     const expiresIn = Number(urlString.match(/expires_in=([^&]*)/)[1]);
//     window.setTimeout(() => accessToken = '', expiresIn * 1000);
//     window.history.pushState('Access Token', null, '/');
//     return accessToken;
//   } else {
//     window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=user-read-private&redirect_uri=${redirectUri}`;
//   }
// }

// function search(term) {
//   const headers = { Authorization: `Bearer ${getAccessToken()}` };
//   return fetch(`https://api.spotify.com/v1/search?type=artist&q=${term}`, {headers: headers})
//     .then(response => {
//       return response.json();
//     })
// };

// console.log(search("the mountain goats"));