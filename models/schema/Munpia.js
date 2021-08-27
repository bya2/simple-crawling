const mongoose = require('mongoose');

const munpiaSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  views: {
    type: Number,
  },
  recommended: {
    type: Number,
  },
  preferred: {
    type: Number,
  },
});

module.exports = munpiaSchema;


// munpia: {
//   image: '#board > div.novel-info.dl-horizontal.zoom > div.dt.cover-box > img',
//   bigImage: '#board > div.novel-info.dl-horizontal.zoom > div.bigImgs > div > img',
//   registered: '#board > div.novel-info.dl-horizontal.zoom > div.dd.detail-box > dl:nth-child(5) > dd:nth-child(2)',
//   updated: '#board > div.novel-info.dl-horizontal.zoom > div.dd.detail-box > dl:nth-child(5) > dd:nth-child(4)',
//   serials: '#board > div.novel-info.dl-horizontal.zoom > div.dd.detail-box > dl:nth-child(6) > dd:nth-child(2)',
//   views: '#board > div.novel-info.dl-horizontal.zoom > div.dd.detail-box > dl:nth-child(6) > dd:nth-child(4)',
//   recommended: '#board > div.novel-info.dl-horizontal.zoom > div.dd.detail-box > dl:nth-child(6) > dd:nth-child(6)',
//   characters: '#board > div.novel-info.dl-horizontal.zoom > div.dd.detail-box > dl:nth-child(6) > dd:nth-child(8)',
//   preferred: '#board > div.novel-info.dl-horizontal.zoom > div.dd.detail-box > div > div.fr > a.button.novel.trigger-subscribe.require-login > span > b',
//   isCompleted: '#board > div.novel-info.dl-horizontal.zoom > div.dd.detail-box > p.iconset > span.xui-icon.xui-finish',

//   tab: '#board > div.recom > div > div:nth-child(1) > li',

//   bestComment: {
//     title: '#ENTRY-VIEW > div.title > h2 > a',
//     id: '#ENTRY-VIEW > div:nth-child(2) > dl.fl > dd > a > strong',
//     updated: '#ENTRY-VIEW > div:nth-child(2) > dl.fr.def > dd:nth-child(2)',
//     views: '#ENTRY-VIEW > div:nth-child(2) > dl.fr.def > dd:nth-child(4)',
//     content: '#ENTRY-CONTENT', // 주석 제거
//     good: '#ENTRY-CONTENT > div > ul > li:nth-child(1) > a > b',
//     comments: '#COMMENTS > div > h3 > em',
//   }