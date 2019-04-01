const weaterForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');

weaterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    messageOne.textContent = 'loading...';
    messageTwo.textContent = '';
    const url = '/weather?address=' + searchElement.value;
    fetch(url).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            messageOne.textContent = data.error;
            console.log(data.error);
        } else {
            console.log(data.location);
            messageOne.textContent = data.location;
            console.log(data.forecast); 
            messageTwo.textContent = data.forecast;
        }
    })
});

})