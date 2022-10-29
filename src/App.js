import React, { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';
import { ArtistSearchContainer } from "./Components/ArtistSearch/ArtistSearchContainer";
import { SongSearchContainer } from "./Components/SongSearch/SongSearchContainer";
import Spotify from "./Utilities/Spotify/Spotify.js";

function App() {
  const [artistSearchTerm, setArtistSearchTerm] = useState("");
  const [artistSearchSuggestions, setArtistSearchSuggestions] = useState([]);

  const [songSearchTerm, setSongSearchTerm] = useState("");
  const [songSearchSuggestions, setSongSearchSuggestions] = useState([]);

  useEffect(() => {
    Spotify.getAccessToken()
  },[]);

  useEffect(() => {
    if (artistSearchTerm) {
      Spotify.search("artist",artistSearchTerm)
        .then(searchResults => searchResults.artists.items)
        .then(items => items.map(artist => artist.name))
        .then(artists => artists.slice(0,10))
        .then(reducedArtists => reducedArtists.filter((value, index, self) => self.indexOf(value) === index))
        .then(dedupedArtists => setArtistSearchSuggestions(dedupedArtists));
    }
  },[artistSearchTerm]);

  // useEffect(() => {
  //   // console.log(songSearchTerm);
  //   if (artistSearchTerm && songSearchTerm) {
  //     Spotify.search("track",songSearchTerm)
  //       .then(searchResults => searchResults.tracks.items)
  //       // .then(items => {
  //       //   console.log(items);
  //       // })
  //       // .then (items => items.forEach(item => {
  //       //   console.log(item.artists[0].name)
  //       // }))
  //       .then(items => items.filter(item => item.artists[0].name === artistSearchTerm))
  //       // .then(filteredItems => {
  //       //   console.log(filteredItems);
  //       // })
  //       .then(filteredItems => {
  //         // console.log(filteredItems);
  //         return filteredItems.map(song => song.name)
  //       })
  //       .then(songs => songs.slice(0))
  //       .then(reducedSongs => reducedSongs.filter((value, index, self) => self.indexOf(value) === index))
  //       .then(dedupedSongs => setSongSearchSuggestions(dedupedSongs));
  //   }
  // },[songSearchTerm]);

  useEffect(() => {
    // console.log(songSearchTerm);
    if (artistSearchTerm && songSearchTerm) {
      Spotify.songSearch(songSearchTerm,artistSearchTerm)
        // .then(searchResults => {
        //   console.log(searchResults);
        // })
        .then(searchResults => searchResults.tracks.items)
        // .then(items => items.filter(item => item.artists[0].name === artistSearchTerm))
        .then(filteredItems => {
          return filteredItems.map(song => song.name)
        })
        .then(songs => songs.slice(0,10))
        .then(reducedSongs => reducedSongs.filter((value, index, self) => self.indexOf(value) === index))
        .then(dedupedSongs => setSongSearchSuggestions(dedupedSongs));
    } else {
      setSongSearchSuggestions([]);
    }
  },[artistSearchTerm, songSearchTerm]);

  return (
    <div>
      <ArtistSearchContainer searchTerm={artistSearchTerm} setSearchTerm={setArtistSearchTerm} searchSuggestions={artistSearchSuggestions} />
      <SongSearchContainer searchTerm={songSearchTerm} setSearchTerm={setSongSearchTerm} searchSuggestions={songSearchSuggestions} />
    </div>
  )
}

export default App;
