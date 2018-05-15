// /
export async function postQuerieValidateLogin(login,pass)
{
	let isUserValid;
	await fetch('/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: login,
        pass: pass
      }),
    })
    .then(res => res.json())
    .then(isUser => {
        console.log(isUser);
        isUserValid = isUser;

    })
    .catch (function (error) {
        console.log('Request failed', error);
    });
    

    return isUserValid;

}
// /reg
export async function postQuerieRegistration(login,pass1)
{
	let IsValid;
	await fetch('/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: login,
        pass: pass1
      }),
    })
    .then(res => res.json())
    .then(loginIsValid => {
        console.log("login is valid: " + loginIsValid);
        IsValid = loginIsValid;

    })
    .catch (function (error) {
        console.log('Request failed', error);
    });
    return IsValid;
}

// /send
export async function postQuerieSend(subscribers,text)
{
	await fetch('/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscribers:subscribers
        }),
      })
      .then(res => res.json())
      .then(obj => {
        if(obj.result) {
          sessionStorage.setItem('subscribers',JSON.stringify(obj.subscribersTypeSMS));
          sessionStorage.setItem('text',text); 
          sessionStorage.setItem('smsConst',obj.smsCost);
        }
                   
      })
      .catch (function (error) {
          console.log('Request failed', error);
      });
}

// / accept
export async function postQuerieAccept(subscribers,text, login, pass, alphaname )
{

  await fetch('/accept', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: login,
          pass: pass,
          alphaname: alphaname,
          subscribers:subscribers,
          text:text
        }),
      })
      .then(res => res.json())
      .then(obj => {
            if(obj.res != true)
              alert("Ooops! Something was wrong...");
      })
      .catch (function (error) {
          console.log('Request failed', error);
      });
}
export async function getQueriepostQuerieValidateLogin(login,pass,request_url)
{
  await fetch(request_url, {
      method: 'get',
      dataType: 'json',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((response) => 
      {
        response.json() // << This is the problem

      })
    .then((responseData) => { // responseData = undefined

        return responseData.isValid;
     })
    .catch(function(err) {
        console.log(err);
      })
     .done();

}
