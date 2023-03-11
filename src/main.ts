import config from './config';
const buttonShorten = document.getElementById('shorten') as HTMLButtonElement;
const butttonCopy = document.getElementById('copy') as HTMLButtonElement;
const shorten = ()=>{
    const field = document.getElementById('url') as HTMLInputElement;
    const linkRequest = 
    {
        destination: field.value, 
        domain: {fullName: 'rebrand.ly'}
    }
    const requestHeaders = 
    {
        'Content-Type': 'application/json',
        'apikey': config.apikey,
    }

const request = async () : Promise<void> => {
 const response = await fetch('https://api.rebrandly.com/v1/links', {
     method: 'post',
     headers: requestHeaders,
     body: JSON.stringify(linkRequest),
   });

   const data = await response.json();
   let field = document.getElementById('url') as HTMLInputElement;
   if(data.shortUrl == undefined)
   {
        field.value = '';
        field.classList.add('error');
   }
   else
    {
        field.value = data.shortUrl;
        field.classList.remove('error');
    }   
}
    request();
}

const copy = async (): Promise <void> => {
    const inputUrl = document.getElementById('url') as HTMLInputElement;
    try{
        await navigator.clipboard.writeText(inputUrl.value);
        butttonCopy.textContent = 'copied';
        setTimeout(() => 
        {
            butttonCopy.textContent = 'copy';  
        }, 1000);
    }
    catch (error){
        console.error(error);
    }
   }
buttonShorten.addEventListener('click', shorten)
butttonCopy.addEventListener('click', copy);




 
