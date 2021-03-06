import React, { useState } from 'react'
import { useEffect } from 'react';
import { readFavoriteEpisodes, readViewedEpisodes, saveFavoriteEpisodes, saveViewedEpisodes, unfavoriteEpisodes, unViewedEpisodes } from '../helpers/localStorage';
import { CardContainer, LinkCardContainer, FavoriteCheckBox, InputsContainer, FavoriteLabel, ViewedCheckBox } from '../styles/EpisodeCard.styles'

export default function EpisodeCard(props) {
  const { id, name, air_date, characters } = props;

  const [checked, setChecked] = useState('');
  const [viewed, setViewed] = useState('');

  function checkChecked() {
    const favorites = readFavoriteEpisodes().map((episode) => episode.id);
    const view = readViewedEpisodes().map((episode) => episode.id);
    setViewed(view.includes(id));
    setChecked(favorites.includes(id));
  }

  function handleChange() {
    if (!checked) {
      saveFavoriteEpisodes(props)
      setChecked(true);
    } else {
      unfavoriteEpisodes(id)
      setChecked(false)
    }
  }

  function handleViewed() {
    if (!viewed) {
      saveViewedEpisodes(props)
      setViewed(true);
    } else {
      unViewedEpisodes(id)
      setViewed(false)
    }
  }

  useEffect(() => {
    checkChecked();
  }, [])

  return (
    <CardContainer>
      <LinkCardContainer to={`/episodes/${id}`}>
        <div style={{ backgroundColor: '#1e2838', color: 'white'}}>
          <p><strong>{ `Episódio Nº ${id}`}</strong></p>
        </div>
        <p>{name}</p>
        <p>{ `Personagens: ${characters.length}` }</p>
        <p>{air_date}</p>
      </LinkCardContainer>
      <InputsContainer>
        <FavoriteLabel>
          <FavoriteCheckBox 
            type='checkbox'
            onChange={ handleChange }
            checked={ checked }
          />
          </FavoriteLabel>
          <ViewedCheckBox 
            type='checkbox'
            onChange={ handleViewed }
            checked={ viewed }
          />
      </InputsContainer>
    </CardContainer>
  )
}
