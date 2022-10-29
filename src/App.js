import React, { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';
import { ArtistSearchContainer } from "./Components/ArtistSearch/ArtistSearchContainer";
import { SongSearchContainer } from "./Components/SongSearch/SongSearchContainer";
import Spotify from "./Utilities/Spotify/Spotify.js";

function App() {
  const [artistSearchTerm, setArtistSearchTerm] = useState("");
  const [artistSearchSuggestions, setArtistSearchSuggestions] = useState([]);

  const [songSearchTerms, setSongSearchTerms] = useState({1:"", 2: "", 3: "", 4: "", 5: ""});
  const [songSearchSuggestions, setSongSearchSuggestions] = useState({1: [], 2: [], 3: [], 4: [], 5: []});

  const [currentSongInput, setCurrentSongInput] = useState(1);

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

  function updateSongSearchSuggestions(index) {
    if (artistSearchTerm && songSearchTerms[index]) {
      Spotify.songSearch(songSearchTerms[index],artistSearchTerm)
        .then(searchResults => searchResults.tracks.items)
        .then(filteredItems => {
          return filteredItems.map(song => song.name)
        })
        .then(songs => songs.slice(0,10))
        .then(reducedSongs => reducedSongs.filter((value, index, self) => self.indexOf(value) === index))
        .then(dedupedSongs => setSongSearchSuggestions(prev => ({...prev, [index]: dedupedSongs})));
    } else {
      setSongSearchSuggestions(prev => ({...prev, [index]: []}));
      // setSongSearchSuggestions(prev => ({...prev}));
    }
  }

  useEffect(() => {
    updateSongSearchSuggestions(currentSongInput);
  },[songSearchTerms]);

  useEffect(() => {
    Object.keys(songSearchSuggestions).forEach(index => updateSongSearchSuggestions(index));
  },[artistSearchTerm]);

  return (
    <div>
      <ArtistSearchContainer searchTerm={artistSearchTerm} setSearchTerm={setArtistSearchTerm} searchSuggestions={artistSearchSuggestions} />
      <SongSearchContainer searchTerms={songSearchTerms} setSearchTerms={setSongSearchTerms} searchSuggestions={songSearchSuggestions} currentSongInput={currentSongInput} setCurrentSongInput={setCurrentSongInput} />
    </div>
  )
}

export default App;
