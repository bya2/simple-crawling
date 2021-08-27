const mongoose = require('mongoose');

const naverSeriesSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  preferred: {
    type: Number,
  },
  comments: {
    type: Number,
  },
  serials: {
    type: Number,
  },
  rate: {
    type: Number,
  }
})

module.exports = naverSeriesSchema;



// naverSeries: {
//   image: '#container > div.aside > a > img',
//   rate: '#content > div.end_head > div.score_area > em', // TEXT
//   preferred: '#content > div.end_head > div.user_action_area > ul > li:nth-child(2) > div > a > em',
//   comments: '#reviewCount',
//   total: '#content > h5 > strong',

//   bestComment: {
//     nickname: '#cbox_module_wai_u_cbox_content_wrap_tabpanel > ul > li.u_cbox_comment:nth:child(1) > div.u_cbox_comment_box > div > div.u_cbox_info > span.u_cbox_info_main > span > span > span.u_cbox_nick_area > span',
//     id: '#cbox_module_wai_u_cbox_content_wrap_tabpanel > ul > li.u_cbox_comment:nth:child(1) > div.u_cbox_comment_box > div > div.u_cbox_info > span.u_cbox_info_main > span > span > span.u_cbox_id_area > span',
//     content: '#cbox_module_wai_u_cbox_content_wrap_tabpanel > ul > li.u_cbox_comment:nth:child(1) > div.u_cbox_comment_box > div > div.u_cbox_text_wrap > span.u_cbox_contents',
//     updated: '#cbox_module_wai_u_cbox_content_wrap_tabpanel > ul > li.u_cbox_comment:nth:child(1) > div.u_cbox_comment_box > div > div.u_cbox_info_base > span.u_cbox_date',
//     comments: '#cbox_module_wai_u_cbox_content_wrap_tabpanel > ul > li.u_cbox_comment:nth:child(1) > div.u_cbox_comment_box > div > div.u_cbox_tool > a > span',
//     good: '#cbox_module_wai_u_cbox_content_wrap_tabpanel > ul > li.u_cbox_comment:nth:child(1) > div.u_cbox_comment_box > div > div.u_cbox_tool > div > a.u_cbox_btn_recomm > em',
//     bad: '#cbox_module_wai_u_cbox_content_wrap_tabpanel > ul > li.u_cbox_comment:nth:child(1) > div.u_cbox_comment_box > div > div.u_cbox_tool > div > a.u_cbox_btn_unrecomm > em',
//   }