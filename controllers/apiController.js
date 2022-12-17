const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateImage = async (req, res) => {

  const { prompt, size, quantity } = req.body;

  try {
    // const response = await openai.createImage({
    //   prompt: prompt,
    //   n: quantity,
    //   size: size,
    // });

    // const images = response.data.data;

    res.status(200).json({
      success: true,
      // data: images,
      data: req.body,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
    res.status(400).json({
      success: false,
      message: 'The image could not be loaded.',
      errorMessage: error.message
    });
  }
};

module.exports = { generateImage };
