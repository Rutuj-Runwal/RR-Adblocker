let contributor = document.getElementById('contributor')
let cards = ''
async function getContributors()  {
    const api_url = 'https://api.github.com/repos/Rutuj-Runwal/RR-Adblocker/contributors'
    const response = await fetch(api_url)
    const data = await response.json()
    // console.log(data) 
        data.map((item) => {
            cards += `
            <div class="contributor" style="display: flex; flex-direction: column; justify-content: center; align-items: center; padding:8px 10px; margin: 10px; box-shadow: 0 0 3px 1px rgba(0, 0, 0, .3); border-radius: 8px; width: 180px">
                <p style="border-bottom: 1px solid black; color:black; text-align: center; padding: 6px; margin: 5px; word-wrap:break-word">${item.login}</p>
                <a href=${item.html_url} target="_blank">
                    <img src=${item.avatar_url}alt="" style="width: 150px; border-radius: 50%; cursor: pointer; margin-top: 15px;">
                </a>
            </div>
            ` 
        })
                
      contributor.innerHTML = cards  
   
}

getContributors()