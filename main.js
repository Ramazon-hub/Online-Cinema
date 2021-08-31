const form = document.querySelector('.form'),
        input = document.querySelector('input'),
        pageBtnBox = document.querySelector('.page-btns'),
        cinemaList = document.querySelector('.cinema-list'),
        movieTemplate = document.querySelector('.cinema-template').content,
        cinemaFragment = document.createDocumentFragment(),
        btnFragment = document.createDocumentFragment();
let pageNum = 1 ;
let inputValue;
async function fetchCinema(value){
    console.log(value)
    const films = await fetch(`https://www.omdbapi.com/?apikey=f81c2d07&s=${value}&page=${pageNum}`)
    const res = await films.json()
    const data = await res.Search;
    const filmsnum = await res.totalResults;
        cinemaList.innerHTML = '';
        pageBtnBox.innerHTML = '';
        renderCinema(data);
        createbtns(filmsnum);  
        pageBtnBox.appendChild(btnFragment)
        cinemaList.appendChild(cinemaFragment);
    }  
    function renderCinema(data){
            data.forEach(cinema=>{
                const movieTemplateClone = movieTemplate.cloneNode(true);
        
                const  cloneCinemaImg = movieTemplateClone.querySelector('.cinema-list__item-img'),
                       cloneCinemaName = movieTemplateClone.querySelector('.cinema-list__item-heading'),
                       cloneCinemaYear = movieTemplateClone.querySelector('.cinema-list__item-year');
        
                       cloneCinemaImg.src = cinema.Poster;
                       cloneCinemaName.textContent = cinema.Title;
                       cloneCinemaYear.textContent = cinema.Year
        
                        cinemaFragment.appendChild(movieTemplateClone);
        
            })
            
        };
    //

fetchCinema('need');


form.addEventListener('submit',(evt)=>{
    evt.preventDefault();
     inputValue = input.value.trim();
    fetchCinema(inputValue);
})

function createbtns(value){
    let allPages = Math.ceil(Number(value)/10)
    for(i=1;i<=allPages;i++){
        let btn = document.createElement('button');  
        btn.className = 'page-btn'         
        btn.dataset.id = i;
        btn.textContent = i;
        
        btn.addEventListener('click',(evt)=>{
            let numId = evt.currentTarget.dataset.id;
            pageNum = Number(numId)
            console.log(pageNum)
            if(input.value == ''){
                fetchCinema('need')
            }else{
                fetchCinema(inputValue)
            }
            
        })
        btnFragment.appendChild(btn);
    }



};

console.log(pageNum);
   
