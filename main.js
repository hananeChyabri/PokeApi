const URL_API = "https://pokeapi.co/api/v2/";

let fav_array = [];

const createListe = function(pokemonArray){
    const div_list_container = document.querySelector('#list-container');
    div_list_container.innerHTML = "";
    const ul_pokemon = document.createElement('ul');
    div_list_container.appendChild(ul_pokemon);
    for (const pokemon of pokemonArray) {
        const li_pokemon = document.createElement('li');
        li_pokemon.innerText = pokemon.name;
        li_pokemon.onclick = 
            function(event){
                showPokemonAsync(pokemon.name);
            };
        ul_pokemon.appendChild(li_pokemon);
    }
}

const showPokemon = function(pokemon_name){
    let pokemon_name_fr;
    let url_img;
    getData(
        URL_API+"pokemon-species/"+pokemon_name,
        function(data){
            pokemon_name_fr = data.names[4].name;
        },
        {
            method : "GET",
            async : false,
            body : null
        });
    getData(
        URL_API+"pokemon/"+pokemon_name,
        function(data){
            url_img = data.sprites.front_default;
        },
        {
            method : "GET",
            async : false,
            body : null
        });
    console.log(pokemon_name_fr);
    console.log(url_img);
    createProfile(pokemon_name_fr,url_img);
}

/* FETCH
fetch(URL_API+"pokemon-species/")
    .then(function(reponse){
        reponse.json()
                    .then(
                        function(data){
                            createListe(data.results);
                        }
                    )
    });
*/
/* ASYNC FUNCTION
const getPokemons = async function(){

    let reponse = await fetch(URL_API+"pokemon-species/");
    let data = await reponse.json();
    createListe(data.results);

};

getPokemons();
*/
/* XHR */
const getData = function(url,callback, options = {method : "GET", async : true, body : null }){
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            switch (xhr.status) {
                case 0:
                case 200:
                    let data = JSON.parse(xhr.responseText);
                    callback(data);
                    break;
                default:
                    console.error(`Status : ${xhr.status}`)
                    break;
            }
        }
    }
    xhr.open(options.method, url, options.async);
    xhr.send(options.body);
}

getData(URL_API+"pokemon-species/?limit=1017", function(data){
    createListe(data.results);
}) ;

const createProfile = function(pokemon_name_fr, url_img){
    const div_detail = document.querySelector("#detail");
    div_detail.innerHTML = "";
    const h1_name = document.createElement('h1');
    h1_name.innerText = pokemon_name_fr;
    div_detail.appendChild(h1_name);
    const img_pokemon = document.createElement('img');
    img_pokemon.src = url_img;
    div_detail.appendChild(img_pokemon);
    const btn_fav = document.createElement('button');
    btn_fav.innerText = "⭐";
    btn_fav.onclick= function(event){
        save_fav(pokemon_name_fr);
    };
    div_detail.appendChild(btn_fav);
}

const save_fav = function(pokemon_name_fr){
    fav_array = localStorage.getItem('fav') ? JSON.parse(localStorage.getItem('fav')) : [] ;
    if(fav_array.includes(pokemon_name_fr)){
        fav_array.splice(fav_array.indexOf(pokemon_name_fr),1);
    }
    else{
        fav_array.push(pokemon_name_fr);
    }
    localStorage.setItem('fav',JSON.stringify(fav_array));
    console.log(JSON.parse(localStorage.getItem('fav')));
}


const showPokemonAsync = async function(pokemon_name){
    let pokemon_name_fr;
    let url_img;
    
    let response = await fetch(URL_API+"pokemon-species/"+pokemon_name);
    let data = await response.json();
    pokemon_name_fr = data.names[4].name;
    
    response = await fetch(URL_API+"pokemon/"+pokemon_name);
    data = await response.json();
    url_img = data.sprites.front_default;
        
    console.log(pokemon_name_fr);
    console.log(url_img);
    createProfile(pokemon_name_fr,url_img);
}