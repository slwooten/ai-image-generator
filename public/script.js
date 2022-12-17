console.log('hello there');

const userPrompt = document.getElementById('prompt');
const generateBtn = document.getElementById('btn');
const userSize = document.getElementById('size');
const userQuantity = document.getElementById('quantity');
const resultsCard = document.getElementById('results-card');


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

/// HANDLE USERS SEARCH ///
const handleFormSubmit = async (e) => {
  e.preventDefault();

  try {
    const prompt = userPrompt.value;
    const size = userSize.value;
    const quantity = parseInt(userQuantity.value);
    // console.log(prompt, size, quantity);

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
        quantity: quantity
      }),
    };
    const res = await fetch(url, options);

    const results = await res.json();

    createImages(results.data);

    console.log(results);
  } catch (error) {
    console.log(error);
  }
};

generateBtn.addEventListener('click', handleFormSubmit);
