const genres = [
    {
        'id':28,
        'name':'Action'
    },
        {
        'id':12,
        'name':'Adventure'
    },
        {
        'id':16,
        'name':'Animation'
    },
        {
        'id':35,
        'name':'Comedy'
    },
        {
        'id':80,
        'name':'Crime'
    },
        {
        'id':99,
        'name':'Documentary'
    },
        {
        'id':18,
        'name':'Drama'
    },
        {
        'id':10751,
        'name':'Family'
    },
        {
        'id':14,
        'name':'Fantasy'
    },
        {
        'id':36,
        'name':'History'
    },
        {
        'id':27,
        'name':'Horror'
    },
        {
        'id':10402,
        'name':'Music'
    },
        {
        'id':9648,
        'name':'Mystery'
    },
        {
        'id':10749,
        'name':'Romance'
    },
        {
        'id':878,
        'name':'Science Fiction'
    },
        {
        'id':10770,
        'name':'TV Movie'
    },
        {
        'id':53,
        'name':'Thriller'
    },
        {
        'id':10752,
        'name':'War'
    },
        {
        'id':37,
        'name':'Western'
    },
    
]


const stringfiedGenres = genres.map(({name}) => name.toLowerCase()).join('|');
intent(['what does this app do?','what can I do here','what is this app about'],(p)=>{
    p.play(`This is Alanmovie developed by Mohammad Mohammadi,
           an app where you can find the movies you love,
           Try saying: 'Go to Comedy','Suprise me','Search for The Salesman','Make it dark',Log in
           `);
})

intent('Make it dark',(p)=>{
    p.play({command: 'changeMode',mode:'dark'});
    p.play('Batman likes this , I hop you will as well.');
}) 
intent('Make it light',(p)=>{
    p.play({command: 'changeMode',mode:'light'});
    p.play('Ahh , my eyes hurt.');
})
intent(['Login','log in'],(p)=>{
       p.play('Logging you in.'); 
    p.play({command: 'login'});
 
})
intent(['Log out','logout'],(p)=>{
       p.play('Logging you out.'); 
    p.play({command: 'logout'});
 
})
intent(`go to $(GENRE ${stringfiedGenres}|top rated|popular|upcoming)`,(p)=>{
       p.play(`Going to ${p.GENRE.value} category.`); 
    p.play({command: 'chooseGenre',genreOrCategory :p.GENRE.value,genres});
 
})
intent('Search for $(QUERY* (.*))',(p)=>{
       p.play(`Searching for ${p.QUERY.value} `); 
    p.play({command: 'search',query :p.QUERY.value});
 
})
intent(["it's Halloween",'I want to get scared'],(p)=>{

    p.play({command: 'chooseGenre' ,genreOrCategory:'Horror',genres});
           p.play("Where there is no imagination, there is no horror"); 
 
})
intent(["Give me something funny",'I want to laugh'],(p)=>{

    p.play({command: 'chooseGenre' ,genreOrCategory:'Comedy',genres});
           p.play("Live for today and let tomorrow come later."); 
 
})
intent('Surprise me',(p)=>{
    const selectedCategory = genres[Math.floor(Math.random()*genres.length)].name;
       p.play(`Sounds good. Enjoy some ${selectedCategory} movies`); 
    p.play({command: 'chooseGenre',genreOrCategory:selectedCategory,genres});
 
})