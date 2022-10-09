let contributor = document.getElementById('contributor')

async function getContributors()  {
    const api_url = 'https://api.github.com/repos/Rutuj-Runwal/RR-Adblocker/contributors'
    const response = await fetch(api_url)
    const data = await response.json()
    // console.log(data)
   
    for(let i = 0; i < data.length; i++){
        return(contributor.innerHTML = data.map((item) => {
            let {login, avatar_url, html_url} = item
            return `
            <div class="contributor" style="margin: 8px; justify-content: center;">
                <span style="border-bottom: 3px solid black; text-align: center; padding: 6px; margin: 5px;">${login}</span>
                <br>
                <a href=${html_url} target="_blank">
                    <img src=${avatar_url}alt="" style="width: 150px; border-radius: 50%; cursor: pointer; margin-top: 15px;">
                </a>
            </div>
            ` 
        })
                
    )}
}

getContributors()