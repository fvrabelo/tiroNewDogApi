import React from 'react'
import ReactPaginate from 'react-paginate';
import {useEffect, useState} from 'react';
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";


const Page = () =>{

    const [items, setItems] = useState([])
  
  
    useEffect(() => {
      const getBreeds = async () =>{
        const res = await fetch(
         'https://api.thedogapi.com/v1/breeds?_page=0&limit=25&order=asc'
        );
        const data = await res.json();
        setItems(data)
      }
      getBreeds();
    }, [])
    console.log(items);
  // --------------------------------------------------------
  
  const fetchBreeds = async (currentPage) => {
    const res = await fetch(
      `https://api.thedogapi.com/v1/breeds?page=${currentPage}&limit=25&order=asc`
    )
      const data = await res.json()
      return data
  }
  
  // --------------------------------------------------------
  
  
  //confirmando botão clicado
    const handlePageClick = async (data) => {
      console.log(data.selected);
      let currentPage = data.selected
  
      const breedsFormServer = await fetchBreeds(currentPage)
      setItems(breedsFormServer)
    }
  
  // --------------------------------------------------------
  return (
      <Router>
      <main>
        <div className="container">
  
  
  
      <div className="row">{/* abre div row transformer */}
  
        {items.map((item) => {
          return <div className="col-sm-6 col-md-4 v my-2">
            <div className="card shadow-sm w-100" style={{ "maxHeight": "100", "maxWidth": "200" }}>
              <div className="card-body">
                <h6 className="card-subtitle mb-2 text-muted text-center">Breed Name</h6>
                <h5 className="card-title text-center">{item.name} </h5>
                <h6 className="card-subtitle mb-2 text-muted text-center" style={{ "marginTop": "20px" }}>Life time</h6>
                <h5 className="card-title text-center">{item.life_span} </h5>
                <a href={`/config/?id=${item.id}`} >Mais informações</a>
                {/* <Link to="/config">Mais informações Link</Link> *por algum motivo não está indo com link to, misericórdia**/}
                
              </div>
            </div>
          </div>;
        })}
      </div> {/* fecha div row transformer */}
      
        

      {/* PAGINAÇÃO */}
      <ReactPaginate
        previousLabel={"<< Previous"}
        nextLabel={">> Next"}
        breakLabel={"..."}
        pageCount={7}
        marginPagesDisplayed={2} //paginas das bordas
        pageRangeDisplayed={3} //paginas do meio
        onPageChange={handlePageClick}
        containerClassName={'pagination justify-content-center'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
        breakClassName={'page-item'}
        breakLinkClassName={'page-link'}
        activeClassName={'active'} />
    </div>
    
  
      
      </main>
      </Router>    
    );
  }

export default Page;