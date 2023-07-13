import React from 'react';
import { Show } from '../../models/ShowModel';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useFavorite } from '../../contexts/Favorite';
import likeIcon from '../../assets/icons/like.svg'
import unlikeIcon from '../../assets/icons/unlike.svg'
import ratingIcon from '../../assets/icons/rating.svg'
import './index.scss'

const Card = (show: Show) => {
  const favoriteContext = useFavorite();
  const key = `${show.id}`;
  const { addFavorite, deleteFavorite, isFavorite } = favoriteContext;

  // save/unsave favorite TV shows
  const handleFavorite = () => {
    isFavorite(key) ? deleteFavorite(key) : addFavorite(show)
  }

  return (
    <div className='card'>
      <a href={`/show/${show.id}/${show.name.replace(/ /g, "-").toLocaleLowerCase()}`}>
        <LazyLoadImage
          height={295}
          width={210}
          effect='blur'
          src={show.image?.medium}
          alt={show.name}
        />
      </a>
      <div className='card-info'>
        <p><strong>{show.name}</strong></p>
        <i>{show.type}</i>
        <div className='card-info-bottom'>
          <img src={`${isFavorite(key) ? likeIcon : unlikeIcon}`} alt='like' title='Save this show' onClick={handleFavorite} />
          <div className='card-info-rating'>
            <img src={ratingIcon} alt='rating' />
            <label>{show.rating?.average}</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;