const newsText1 = document.getElementById("news1");
const newsText2 = document.getElementById("news2");
const newsText3 = document.getElementById("news3");
const newsText4 = document.getElementById("news4");
const newsText5 = document.getElementById("news5");
const newsText6 = document.getElementById("news6");
const newsText7 = document.getElementById("news7");
const newsText8 = document.getElementById("news8");
const newsText9 = document.getElementById("news9");
const newsText10 = document.getElementById("news10");

const image1 = document.getElementById("image1");
const image2 = document.getElementById("image2");
const image3 = document.getElementById("image3");
const image4 = document.getElementById("image4");
const image5 = document.getElementById("image5");
const image6 = document.getElementById("image6");
const image7 = document.getElementById("image7");
const image8 = document.getElementById("image8");
const image9 = document.getElementById("image9");
const image10 = document.getElementById("image10");

const url1 = document.getElementById("url1");
const url2 = document.getElementById("url2");
const url3 = document.getElementById("url3");
const url4 = document.getElementById("url4");
const url5 = document.getElementById("url5");
const url6 = document.getElementById("url6");
const url7 = document.getElementById("url7");
const url8 = document.getElementById("url8");
const url9 = document.getElementById("url9");
const url10 = document.getElementById("url10");

const getArticles = async () => {   
    fetch('https://backend-uoap.onrender.com/news')
    .then((response) => response.json())
    .then(data => {
        console.log(data.articles[0].urlToImage);
        //const newsText1 = document.getElementById("news1");
        newsText1.innerHTML = data.articles[0].title;
        newsText2.innerHTML = data.articles[1].title;
        newsText3.innerHTML = data.articles[2].title;
        newsText4.innerHTML = data.articles[3].title;
        newsText5.innerHTML = data.articles[4].title;
        newsText6.innerHTML = data.articles[5].title;
        newsText7.innerHTML = data.articles[6].title;
        newsText8.innerHTML = data.articles[7].title;
        newsText9.innerHTML = data.articles[8].title;
        newsText10.innerHTML = data.articles[9].title;
        
        image1.src = data.articles[0].urlToImage;
        image2.src = data.articles[1].urlToImage;
        image3.src = data.articles[2].urlToImage;
        image4.src = data.articles[3].urlToImage;
        image5.src = data.articles[4].urlToImage;
        image6.src = data.articles[5].urlToImage;
        image7.src = data.articles[6].urlToImage;
        image8.src = data.articles[7].urlToImage;
        image9.src = data.articles[8].urlToImage;
        image10.src = data.articles[9].urlToImage;
        
        url1.href = data.articles[0].url;
        url2.href = data.articles[1].url;
        url3.href = data.articles[2].url;
        url4.href = data.articles[3].url;
        url5.href = data.articles[4].url;
        url6.href = data.articles[5].url;
        url7.href = data.articles[6].url;
        url8.href = data.articles[7].url;
        url9.href = data.articles[8].url;
        url10.href = data.articles[9].url;
    });
    
    
}; 

getArticles();
