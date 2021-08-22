module.exports = {
  commentsPage: {
    gridLayout: {
      item: 'body > div.body-inner > section.series-list.recommendation-list.pt-3 > div > div > div.grid-item:nth-child(1)', // TEST ONE
      items: 'body > div.body-inner > section.series-list.recommendation-list.pt-3 > div > div > div.grid-item', // LIST
    },
    product: {
      href: 'div > div.card-body.p-4 > div > div.col-4.col-sm-3.pr-0 > div > a', // ATTR:href
      image: 'div > div.card-body.p-4 > div > div.col-4.col-sm-3.pr-0 > div > a > img', // ATTR:data-src
      title: 'div > div.card-body.p-4 > div > div.col-8.col-sm-9 > div > div.product-title > h3 > a', // TEXT
      author: 'div > div.card-body.p-4 > div > div.col-8.col-sm-9 > div > div.product-author > a', // TEXT
      categories: 'div > div.card-body.p-4 > div > div.col-8.col-sm-9 > div > div.product-category', // TEXT
      introduction: 'div > div.card-body.p-4 > div > div.col-8.col-sm-9 > div > p', // TEXT
      rate: 'div > div.card-body.p-4 > div > div.col-8.col-sm-9 > div > div.product-reviews' // TEXT
    },
    comment: {
      commentId: 'div > div.card-footer.text-left.p-4 div.content-wrap', // ATTR:id
      nickname: 'div > div.card-footer.text-left.p-4 > div.product-nickname.one-line > a:nth-child(1) > strong', // TEXT
      content: 'div > div.card-footer.text-left.p-4 div.content-wrap div.content-txt', // HTML
      blurEffect: 'div > div.card-footer.text-left.p-4 > div.content-wrap > div.blur-effect', // HTML
      rate: 'div > div.card-footer.text-left.p-4 > span', // ATTR:data-rateit-value
      updated: 'div > div.card-footer.text-left.p-4 > div.product-nickname.one-line > small', // TEXT
    },
  },
  productPage: {
    product: {
      platforms: '#product-page > div > div > div > div.col-lg-4.mb-4 > div.widget.p-cb > div.product-description > div.product-meta > div > a', // TEXT, ATTR:href
    },
    review: {
      commentId: '#comments > div > div:nth-child(1) > div.text > div.text_holder.content-wrap', // ATTR:id
      nickname: '#comments > div > div:nth-child(1) > div.text > h5.name > a:nth-child(1)', // TEXT
      comment: '#comments > div > div:nth-child(1) > div.text > div.text_holder.content-wrap > div', // HTML
      rate: '#comments > div > div:nth-child(1) > div.text > div:nth-child(1) > span', // ATTR:data-rateit-value
      updated: '#comments > div > div:nth-child(1) > div.text > div.text-right.m-t-10.d-block > span.comment_date.text-muted.d-none.d-md-inline-block', // TEXT
      good: '#comments > div > div:nth-child(1) > div.text > div.text-right.m-t-10.d-block > span:nth-child(2) > span', // TEXT
      bad: '#comments > div > div:nth-child(1) > div.text > div.text-right.m-t-10.d-block > span:nth-child(3) > span', // TEXT
    }
  },
  platformPage: {
    kakaoPage: {
      viewers: '#root > div.jsx-885677927.mainContents.mainContents_pc.hiddenMenuContent > div > div > div.css-sgpdfd > div > div.css-1ydjg2i > div.countInfoBox.css-1lmggoi > div.css-bvpmim > div', // TEXT
      comments: '#root > div.jsx-885677927.mainContents.mainContents_pc.hiddenMenuContent > div > div > div.css-sgpdfd > div > div.css-1ydjg2i > div.countInfoBox.css-1lmggoi > div.css-11vmqkl > div', // TEXT
      status: '#root > div.jsx-885677927.mainContents.mainContents_pc.hiddenMenuContent > div > div > div.css-sgpdfd > div > div.css-1ydjg2i > div.css-1nlm7ol > div.css-ymlwac > div:nth-child(1)', // TEXT
      // author: '#root > div.jsx-885677927.mainContents.mainContents_pc.hiddenMenuContent > div > div > div.css-sgpdfd > div > div.css-1ydjg2i > div.css-1nlm7ol > div.css-ymlwac > div:nth-child(2)', // TEXT
      // introductionButton: '#root > div.jsx-885677927.mainContents.mainContents_pc.hiddenMenuContent > div > div > div.css-sgpdfd > div > div.css-1ydjg2i > div.css-1nlm7ol > div.css-82j595 > button.css-zkp4tp', // CLICK
      
      bestComment: {
        nickname: '#root > div.jsx-885677927.mainContents.mainContents_pc.hiddenMenuContent > div > div > div.css-tgplph > div > div.css-l3rx45 > div:nth-child(1) > div > div.css-5rfesd > div.css-4cffwv > div.css-1rtcrhv', // TEXT
        content: '#root > div.jsx-885677927.mainContents.mainContents_pc.hiddenMenuContent > div > div > div.css-tgplph > div > div.css-l3rx45 > div:nth-child(1) > div > div.css-5rfesd > div.css-av465m', // TEXT
        good: '#root > div.jsx-885677927.mainContents.mainContents_pc.hiddenMenuContent > div > div > div.css-tgplph > div > div.css-l3rx45 > div:nth-child(1) > div > div.css-5rfesd > div.css-1mwn3f5 > div:nth-child(1) > div', // TEXT
        comments: '#root > div.jsx-885677927.mainContents.mainContents_pc.hiddenMenuContent > div > div > div.css-tgplph > div > div.css-l3rx45 > div:nth-child(1) > div > div.css-5rfesd > div.css-1mwn3f5 > div:nth-child(2) > div', // TEXT
      }
    },
    munpia: {
      image: '#board > div.novel-info.dl-horizontal.zoom > div.dt.cover-box > img',
      bigImage: '#board > div.novel-info.dl-horizontal.zoom > div.bigImgs > div > img',
      registered: '#board > div.novel-info.dl-horizontal.zoom > div.dd.detail-box > dl:nth-child(5) > dd:nth-child(2)',
      updated: '#board > div.novel-info.dl-horizontal.zoom > div.dd.detail-box > dl:nth-child(5) > dd:nth-child(4)',
      serials: '#board > div.novel-info.dl-horizontal.zoom > div.dd.detail-box > dl:nth-child(6) > dd:nth-child(2)',
      views: '#board > div.novel-info.dl-horizontal.zoom > div.dd.detail-box > dl:nth-child(6) > dd:nth-child(4)',
      recommended: '#board > div.novel-info.dl-horizontal.zoom > div.dd.detail-box > dl:nth-child(6) > dd:nth-child(6)',
      characters: '#board > div.novel-info.dl-horizontal.zoom > div.dd.detail-box > dl:nth-child(6) > dd:nth-child(8)',
      preferred: '#board > div.novel-info.dl-horizontal.zoom > div.dd.detail-box > div > div.fr > a.button.novel.trigger-subscribe.require-login > span > b',
      isCompleted: '#board > div.novel-info.dl-horizontal.zoom > div.dd.detail-box > p.iconset > span.xui-icon.xui-finish',

      tab: '#board > div.recom > div > div:nth-child(1) > li',

      bestComment: {
        title: '#ENTRY-VIEW > div.title > h2 > a',
        id: '#ENTRY-VIEW > div:nth-child(2) > dl.fl > dd > a > strong',
        updated: '#ENTRY-VIEW > div:nth-child(2) > dl.fr.def > dd:nth-child(2)',
        views: '#ENTRY-VIEW > div:nth-child(2) > dl.fr.def > dd:nth-child(4)',
        content: '#ENTRY-CONTENT', // 주석 제거
        good: '#ENTRY-CONTENT > div > ul > li:nth-child(1) > a > b',
        comments: '#COMMENTS > div > h3 > em',
      }
    },
    naverSeries: {
      image: '#container > div.aside > a > img',
      rate: '#content > div.end_head > div.score_area > em', // TEXT
      preferred: '#content > div.end_head > div.user_action_area > ul > li:nth-child(2) > div > a > em',
      comments: '#reviewCount',
      total: '#content > h5 > strong',

      bestComment: {
        nickname: '#cbox_module_wai_u_cbox_content_wrap_tabpanel > ul > li.u_cbox_comment:nth:child(1) > div.u_cbox_comment_box > div > div.u_cbox_info > span.u_cbox_info_main > span > span > span.u_cbox_nick_area > span',
        id: '#cbox_module_wai_u_cbox_content_wrap_tabpanel > ul > li.u_cbox_comment:nth:child(1) > div.u_cbox_comment_box > div > div.u_cbox_info > span.u_cbox_info_main > span > span > span.u_cbox_id_area > span',
        content: '#cbox_module_wai_u_cbox_content_wrap_tabpanel > ul > li.u_cbox_comment:nth:child(1) > div.u_cbox_comment_box > div > div.u_cbox_text_wrap > span.u_cbox_contents',
        updated: '#cbox_module_wai_u_cbox_content_wrap_tabpanel > ul > li.u_cbox_comment:nth:child(1) > div.u_cbox_comment_box > div > div.u_cbox_info_base > span.u_cbox_date',
        comments: '#cbox_module_wai_u_cbox_content_wrap_tabpanel > ul > li.u_cbox_comment:nth:child(1) > div.u_cbox_comment_box > div > div.u_cbox_tool > a > span',
        good: '#cbox_module_wai_u_cbox_content_wrap_tabpanel > ul > li.u_cbox_comment:nth:child(1) > div.u_cbox_comment_box > div > div.u_cbox_tool > div > a.u_cbox_btn_recomm > em',
        bad: '#cbox_module_wai_u_cbox_content_wrap_tabpanel > ul > li.u_cbox_comment:nth:child(1) > div.u_cbox_comment_box > div > div.u_cbox_tool > div > a.u_cbox_btn_unrecomm > em',
      }
    },
    ridibooks: {
      image: '#page_detail > div.detail_wrap > div.detail_body_wrap > section > article.detail_header.trackable > div.header_thumbnail_wrap > div.header_thumbnail.book_macro_200.detail_scalable_thumbnail > div > div > div > img',
      preferred: '#page_detail > div.detail_wrap > div.detail_body_wrap > section > article.detail_header.trackable > div.header_thumbnail_wrap > div.header_preference > button > span > span.button_text.js_preference_count',
      rate: '#page_detail > div.detail_wrap > div.detail_body_wrap > section > article.detail_header.trackable > div.header_info_wrap > div:nth-child(3) > p > span > span.StarRate_Score', // TEXT 뒤 '점' 빼아함.
      participants: '#page_detail > div.detail_wrap > div.detail_body_wrap > section > article.detail_header.trackable > div.header_info_wrap > div:nth-child(3) > p > span > span.StarRate_ParticipantCount',
      published_date: '#page_detail > div.detail_wrap > div.detail_body_wrap > section > article.detail_header.trackable > div.Header_Metadata_Block > ul:nth-child(1) > li.Header_Metadata_Item.book_info.published_date_info > ul > li',
      ISBN: '#page_detail > div.detail_wrap > div.detail_body_wrap > section > article.detail_header.trackable > div.Header_Metadata_Block > ul:nth-child(1) > li.Header_Metadata_Item.book_info.isbn_info > ul > li',
      comments: '#review_list_section > div.rui_tab_and_order > ul.rui_tab_2.js_review_list_filter_wrapper > li:nth-child(2) > a > span',
      comments_puchaser: '#review_list_section > div.rui_tab_and_order > ul.rui_tab_2.js_review_list_filter_wrapper > li:nth-child(1) > a > span',

      tab: '#review_list_section > div.rui_tab_and_order > ul.rui_order.js_review_list_order_wrapper > li:nth-child(2) > a', // CLICK

      bestComment: {
        id: '#review_list_section > div.review_list_wrapper.js_review_list_wrapper.active > ul > li:nth-child(1) > div.list_left.js_review_info_wrapper > div > p > span.reviewer_id',
        updated: '#review_list_section > div.review_list_wrapper.js_review_list_wrapper.active > ul > li:nth-child(1) > div.list_left.js_review_info_wrapper > div > ul > li.review_date',
        content: '#review_list_section > div.review_list_wrapper.js_review_list_wrapper.active > ul > li:nth-child(1) > div.list_right.js_review_wrapper > p > span.visible',
        good: '#review_list_section > div.review_list_wrapper.js_review_list_wrapper.active > ul > li:nth-child(1) > div.list_right.js_review_wrapper > div.review_status > div > button.rui_button_white_25.like_button.js_like_button > span > span.rui_button_text > span.like_count.js_like_count',
      }
    }
  }
}