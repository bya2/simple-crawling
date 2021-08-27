const mongoose = require('mongoose');

const ridibooksSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  preferred: {
    type: Number,
  },
  paticipants: {
    type: Number,
  },
  comments: {
    type: Number,
  },
  rate: {
    type: Number,
  },
});

module.exports = ridibooksSchema;



// ridibooks: {
//   image: '#page_detail > div.detail_wrap > div.detail_body_wrap > section > article.detail_header.trackable > div.header_thumbnail_wrap > div.header_thumbnail.book_macro_200.detail_scalable_thumbnail > div > div > div > img',
//   preferred: '#page_detail > div.detail_wrap > div.detail_body_wrap > section > article.detail_header.trackable > div.header_thumbnail_wrap > div.header_preference > button > span > span.button_text.js_preference_count',
//   rate: '#page_detail > div.detail_wrap > div.detail_body_wrap > section > article.detail_header.trackable > div.header_info_wrap > div:nth-child(3) > p > span > span.StarRate_Score', // TEXT 뒤 '점' 빼아함.
//   participants: '#page_detail > div.detail_wrap > div.detail_body_wrap > section > article.detail_header.trackable > div.header_info_wrap > div:nth-child(3) > p > span > span.StarRate_ParticipantCount',
//   published_date: '#page_detail > div.detail_wrap > div.detail_body_wrap > section > article.detail_header.trackable > div.Header_Metadata_Block > ul:nth-child(1) > li.Header_Metadata_Item.book_info.published_date_info > ul > li',
//   ISBN: '#page_detail > div.detail_wrap > div.detail_body_wrap > section > article.detail_header.trackable > div.Header_Metadata_Block > ul:nth-child(1) > li.Header_Metadata_Item.book_info.isbn_info > ul > li',
//   comments: '#review_list_section > div.rui_tab_and_order > ul.rui_tab_2.js_review_list_filter_wrapper > li:nth-child(2) > a > span',
//   comments_puchaser: '#review_list_section > div.rui_tab_and_order > ul.rui_tab_2.js_review_list_filter_wrapper > li:nth-child(1) > a > span',

//   tab: '#review_list_section > div.rui_tab_and_order > ul.rui_order.js_review_list_order_wrapper > li:nth-child(2) > a', // CLICK

//   bestComment: {
//     id: '#review_list_section > div.review_list_wrapper.js_review_list_wrapper.active > ul > li:nth-child(1) > div.list_left.js_review_info_wrapper > div > p > span.reviewer_id',
//     updated: '#review_list_section > div.review_list_wrapper.js_review_list_wrapper.active > ul > li:nth-child(1) > div.list_left.js_review_info_wrapper > div > ul > li.review_date',
//     content: '#review_list_section > div.review_list_wrapper.js_review_list_wrapper.active > ul > li:nth-child(1) > div.list_right.js_review_wrapper > p > span.visible',
//     good: '#review_list_section > div.review_list_wrapper.js_review_list_wrapper.active > ul > li:nth-child(1) > div.list_right.js_review_wrapper > div.review_status > div > button.rui_button_white_25.like_button.js_like_button > span > span.rui_button_text > span.like_count.js_like_count',
//   }
// }