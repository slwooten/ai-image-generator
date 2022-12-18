const userPrompt = document.getElementById('prompt');
const generateBtn = document.getElementById('btn');
const userSize = document.getElementById('size');
const userQuantity = document.getElementById('quantity');
const userAccessCode = document.getElementById('access-code');
const resultsCard = document.getElementById('results-card');
const showBtn = document.getElementById('show');
const loader = document.getElementById('loader');


/// SHOW ACCESS CODE TOGGLE ///
let shown = false;
const codeToggle = () => {
  shown = !shown;
  if (shown) {
    userAccessCode.setAttribute('type', 'text');
    showBtn.textContent = 'Hide';
  } else {
    userAccessCode.setAttribute('type', 'password');
    showBtn.textContent = 'Show';
  };
};

/// SHOW LOADER ///
const showLoader = () => {
  loader.removeAttribute('class', 'hidden');
  loader.setAttribute('class', 'loader');
};

/// HIDE LOADER ///
const hideLoader = () => {
  loader.removeAttribute('class', 'loader');
  loader.setAttribute('class', 'hidden');
};

/// ADD IMAGE ELEMENTS TO PAGE ///
const createImages = (images) => {
  images.map((image) => {
    const imageEl = document.createElement('img');
    imageEl.setAttribute('src', image.url);
    imageEl.setAttribute('class', 'generated-img');

    resultsCard.removeAttribute('class', 'hidden');
    resultsCard.setAttribute('class', 'results-card');
    resultsCard.append(imageEl);
  });
};

/// SHOWING THE ACCESS ERROR ///
const showAccessError = () => {
  window.alert('Sorry, the access code you entered is incorrect. Try again.');
};

/// HANDLE USERS SEARCH ///
const handleFormSubmit = async (e) => {
  e.preventDefault();

  resultsCard.innerHTML = '';
  resultsCard.removeAttribute('class', 'results-card');
  resultsCard.setAttribute('class', 'hidden');


  showLoader();

  const prompt = userPrompt.value;
  const size = userSize.value;
  const quantity = parseInt(userQuantity.value);
  const accessCode = userAccessCode.value;
  const url = "/openai/go";
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({
      prompt: prompt,
      size: size,
      quantity: quantity,
      accessCode: accessCode
    }),
  };

  if (prompt && size && quantity && accessCode) {
    try {
      const res = await fetch(url, options);

      const results = await res.json();

      if (results.success === false) {
        showAccessError();
      }

      hideLoader();
      createImages(results.data);

    } catch (error) {
      console.log(error);
    }
  } else {
    window.alert('Please enter a prompt.');
  }
};

showBtn.addEventListener('click', codeToggle);
generateBtn.addEventListener('click', handleFormSubmit);
