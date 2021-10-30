import {React} from 'react'
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'


const Page = () =>{
    // identifica ID na url
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

// fetch da raca baseado no ID passado pela url
const [items, setItems] = useState([])
    useEffect(() => {
      const getBreeds = async () =>{
        const res = await fetch(
         `https://api.thedogapi.com/v1/breeds/${id}`
        );
        const data = await res.json();
        setItems(data)
      }
      getBreeds()
    }, [])


//fetch da imagem
function getImage(imageId) {
    fetch(`https://api.thedogapi.com/v1/images/${imageId}`)
    .then(r =>r.json())
    .then(response=> {
      const data = response

      document.querySelector(".image").src = data.url;
    })
  }


    return(
        <div className="" 
             style={{"display": "flex",
             "position":"relative",
             "justify-content": "center",
             "align-items": "center",
             'flex-direction': "column",
             "maxWidth":"100%",
             "maxHeight":"100%"}}>

            <h6 className="card-subtitle mb-2 text-muted text-center"  style={{"marginTop":"5px"}}>Raça</h6>
            <h5 className="card-title text-center">{items.name}</h5>
            
            <h6 className="card-subtitle mb-2 text-muted text-center" style={{"marginTop":"5px"}}>Propósito</h6>
            <h5 className="card-title text-center">{items.bred_for}</h5>
            
            <h6 className="card-subtitle mb-2 text-muted text-center" style={{"marginTop":"5px"}}>Grupo</h6>
            <h5 className="card-title text-center">{items.breed_group}</h5>
            
            <h6 className="card-subtitle mb-2 text-muted text-center" style={{"marginTop":"5px"}}>Temperamento</h6>
            <h5 className="card-title text-center">{items.temperament}</h5>
            
            <h6 className="card-subtitle mb-2 text-muted text-center" style={{"marginTop":"5px"}}>Tempo de vida</h6>
            <h5 className="card-title text-center">{items.life_span}</h5>
            {console.log(items.height)}
            Altura 
            <h3>{items.height.metric}</h3>
            {/*
            {console.log(items.weight)}
            Peso kg
            <h3>{items.weight.metric}</h3> */}

            <img className ="image" 
            src={getImage(items.reference_image_id) }
            style={{ "maxHeight": "300px", "maxWidth": "300px", "marginBottom":"15px" }}/>
            
            <Link to="/" className="btn btn-primary">Escolher outra raça</Link>
            

        </div>
        
    );
}

export default Page;