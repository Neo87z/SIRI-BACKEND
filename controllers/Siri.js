const express = require('express');
const router = express.Router();
var _ = require("underscore");
const APITWIe = require("twitter-api-sdk")
let CourseData = require('../models/courseDetails');
let EnrollCouse = require('../models/enrollCourse');
let TweetData = require('../models/tweedData');
let StudentDta = require('../models/StudentDetails');
let DataOnline = require('../models/OnlineLibrary');
var rn = require('random-number');
const jwt = require('jsonwebtoken')
const { Configuration, OpenAIApi } = require("openai");
const speech = require('@google-cloud/speech');
const Resemble = require('@resemble/node')

const client = new speech.SpeechClient();
const textToSpeech = require('@google-cloud/text-to-speech')
const clientSpe = new textToSpeech.TextToSpeechClient();
const fs = require("fs")
const util = require("util")


module.exports = function () {

    router.post('/test', async function (req, res) {
        const gcsUri = 'https://firebasestorage.googleapis.com/v0/b/siri-ccd99.appspot.com/o/Recording8408154343?alt=media&token=9cd1713e-75e4-4180-9bff-5552bc0aa529';

        const audio = {
            content: gcsUri,
        };
        const config = {
            encoding: 'LINEAR16',
            sampleRateHertz: 16000,
            languageCode: 'en-US',
        };
        const request = {
            audio: audio,
            config: config,
        };

        // Detects speech in the audio file
        const [response] = await client.recognize(request);
        const transcription = response.results
            .map(result => result.alternatives[0].transcript)
            .join('\n');
        console.log(`Transcription: ${transcription}`);

    })


    router.post('/openAI', async function (req, res) {
        console.log(req.body.Text)
        try {

            const configuration = new Configuration({
                apiKey: "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",
            });
            const openai = new OpenAIApi(configuration);

            const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: req.body.Text,
                temperature: 0.9,
                max_tokens: 150,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0.6,
                stop: [" Human:", " AI:"]
            });
            console.log(response.data.choices[0]["text"])
            var data = {
                Status: "Sucess",
                Message: response.data.choices[0]["text"]
            }
            res.status(201).send(data);

        } catch (err) {
            console.log("eerr")
        }


    })


    router.post('/Specch', async function (req, res) {
        try {

            ConvertToMp3()
        } catch (err) {
            console.log("eerr")
        }


    })


    async function ConvertToMp3(textData) {
        const text = textData;

        // Construct the request
        const request = {
            input: { text: text },
            // Select the language and SSML voice gender (optional)
            voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
            // select the type of audio encoding
            audioConfig: { audioEncoding: 'MP3' },
        };

        // Performs the text-to-speech request
        const [response] = await clientSpe.synthesizeSpeech(request);
        // Write the binary audio content to a local file
        const writeFile = util.promisify(fs.writeFile);
        await writeFile('output.mp3', response.audioContent, 'binary');
        console.log('Audio content written to file: output.mp3');

    }





















    return router;
}