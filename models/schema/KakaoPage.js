const mongoose = require('mongoose');

const kakaoPageSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  viewers: {
    type: Number,
  },
  comments: {
    type: Number,
  }
});

module.exports = kakaoPageSchema;



// kakaoPage: {
//   viewers: '#root > div.jsx-885677927.mainContents.mainContents_pc.hiddenMenuContent > div > div > div.css-sgpdfd > div > div.css-1ydjg2i > div.countInfoBox.css-1lmggoi > div.css-bvpmim > div', // TEXT
//   comments: '#root > div.jsx-885677927.mainContents.mainContents_pc.hiddenMenuContent > div > div > div.css-sgpdfd > div > div.css-1ydjg2i > div.countInfoBox.css-1lmggoi > div.css-11vmqkl > div', // TEXT
//   status: '#root > div.jsx-885677927.mainContents.mainContents_pc.hiddenMenuContent > div > div > div.css-sgpdfd > div > div.css-1ydjg2i > div.css-1nlm7ol > div.css-ymlwac > div:nth-child(1)', // TEXT
//   // author: '#root > div.jsx-885677927.mainContents.mainContents_pc.hiddenMenuContent > div > div > div.css-sgpdfd > div > div.css-1ydjg2i > div.css-1nlm7ol > div.css-ymlwac > div:nth-child(2)', // TEXT
//   // introductionButton: '#root > div.jsx-885677927.mainContents.mainContents_pc.hiddenMenuContent > div > div > div.css-sgpdfd > div > div.css-1ydjg2i > div.css-1nlm7ol > div.css-82j595 > button.css-zkp4tp', // CLICK
  
//   bestComment: {
//     nickname: '#root > div.jsx-885677927.mainContents.mainContents_pc.hiddenMenuContent > div > div > div.css-tgplph > div > div.css-l3rx45 > div:nth-child(1) > div > div.css-5rfesd > div.css-4cffwv > div.css-1rtcrhv', // TEXT
//     content: '#root > div.jsx-885677927.mainContents.mainContents_pc.hiddenMenuContent > div > div > div.css-tgplph > div > div.css-l3rx45 > div:nth-child(1) > div > div.css-5rfesd > div.css-av465m', // TEXT
//     good: '#root > div.jsx-885677927.mainContents.mainContents_pc.hiddenMenuContent > div > div > div.css-tgplph > div > div.css-l3rx45 > div:nth-child(1) > div > div.css-5rfesd > div.css-1mwn3f5 > div:nth-child(1) > div', // TEXT
//     comments: '#root > div.jsx-885677927.mainContents.mainContents_pc.hiddenMenuContent > div > div > div.css-tgplph > div > div.css-l3rx45 > div:nth-child(1) > div > div.css-5rfesd > div.css-1mwn3f5 > div:nth-child(2) > div', // TEXT
//   }
// },