import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Card from '../components/Card';
import { showService } from '../services/show/showService';
import { Show } from "../models/ShowModel";
import Layout from '../components/Layout';
import '../styles/pages/show.scss'

export const ShowDetail = () => {
  const [show, setShow] = useState<Show>();
  const { id }: any = useParams();

  //get show detail
  useEffect(() => {
    const fetchData = async () => {
      const detail = await showService.getShow(id);
      setShow(detail);
    }
    fetchData();
  }, [id]);

  return (
    <Layout>
      {show && <div className="show-container">
        <div className="show-info">
          <Card {...show as any} />
          <div className="show-card-info">
            <div dangerouslySetInnerHTML={{ __html: show.summary }} />
            <p>{show.language}</p>
            <p>{show.premiered}</p>
            <p><a href={show.url}><strong>URL:</strong> <i>{show.url}</i></a></p>
          </div>
        </div>
        <div className="show-cast-content">
          <h2>Cast</h2>
          <div className="show-cast">
            {show._embedded.cast.map((item, index) => {
              return <div key={index} className="show-cast-item">
                <LazyLoadImage
                  height={295}
                  width={210}
                  effect='blur'
                  src={item.person?.image?.medium}
                  alt={item.person.name}
                />
                <div className='show-cast-card-info'>
                  <strong>{item.person.name}</strong>
                  <p>as {item.character.name}</p>
                </div>
              </div>
            })}
          </div>
        </div>

      </div>}
    </Layout>
  );
};

export default ShowDetail;
