import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GallarySnap = () => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const savedSearch = localStorage.getItem('gallerySearch');
    if (savedSearch) {
      setSearch(savedSearch);
      performSearch(savedSearch);
    }
  }, []);

  const apiKey = '636e1481b4f3c446d26b8eb6ebfe7127';

  const Changehndler = (e) => {
    setSearch(e.target.value);
    setTimeout(()=>{
      return performSearch(e.target.value);
    },2000)
   

  };
 
  const SubmitHndler = (e) => {
    e.preventDefault();
    performSearch(search);
  };

  const performSearch = (searchTerm) => {
    axios.get(
      `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${searchTerm}&per_page=24&format=json&nojsoncallback=1`
    )
    .then((response) => {
      setData(response.data.photos.photo);
     
      localStorage.setItem('gallerySearch', searchTerm);
    }
    ).catch(
      (e)=>{console.log(e)}
    );
  };

  return (
    <div className='container'>
      <h3 className='text-center'>GallarySnap</h3>
      <div>
        <form className='input-group' onSubmit={SubmitHndler}>
          <input type='text' className='form-control' required onChange={Changehndler} value={search} />
          &nbsp;
          <button type='submit' value='Search' name='Search' className='btn btn-primary' required >       <lord-icon
    src="https://cdn.lordicon.com/kkvxgpti.json"
    trigger="hover"/>
  </button>
        </form>
      </div>
      <Gallary data={data} />
    </div>
  );
};

const Gallary = ({ data }) => {
  return (
    <div className='row'>
      {data.slice(0, 10).map((image,index) => (
        <div key={image.id} className='col-md-4'>
          <img
            src={`https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}_m.jpg`}
            height='200'
            width='250'
            alt={image.title}
            className='img-fluid'
          />
        </div>
      ))}
    </div>
  );
};

export default GallarySnap;
