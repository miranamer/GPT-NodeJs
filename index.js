const express = require('express');
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

const app = express();

app.use(express.json());


const configuration = new Configuration({
    apiKey: process.env.OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

app.post('/time-complexity', async (req, res) => {
    try {
        const { prompt } = req.body;
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: `
                    ${prompt}

                    the time complexity of this code is
                    ###
                    `,
            temperature: 0,
            max_tokens: 64,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
            stop: ["\n"],
        });

        return res.status(200).json({
            success: true,
            data: response.data.choices[0].text
        })

    }catch(err){
        return res.status(400).json({
            success: false,
            error: err.response ? err.response.data : 'Server Fault'
        })
    }
})




const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server Running On Port ${port}`));