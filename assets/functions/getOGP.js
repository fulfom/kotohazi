const axios = require('axios');

exports.handler = async(event, context, callback) => {

  if ('url' in event.queryStringParameters === false) {
    console.error("parameter 'url' is necessary!!");
    return;
  }

  const url = event.queryStringParameters.url;

  return axios.get(url)
    .then(res => {
      const el = new DOMParser().parseFromString(res.text, "text/html")
      const headEls = (el.head.children)
      let data = new Map();
      let ogp = new Map();
      let seo = new Map();
      data.set('title',el.title);
      Array.from(headEls).map(v => {
          const prop = v.getAttribute('property');
          const name = v.getAttribute('name');
          if (prop){
              ogp.set(prop, v.getAttribute("content"));
          }
          else if(name){
              seo.set(name, v.getAttribute("content"));
          }
      })
      data.set('ogp',ogp);
      data.set('seo',seo);
      console.log(data);
      
      if (!data.hasOwnProperty('title')) {
          console.error("Error getting ogp data: no ogpData returned");
          return res.json({ error: "no ogpData returned" });
      } 
      let ogpData = {};
      ogpData['siteName'] = data.title;
      for (let prop in data.ogp) {
          if (/^og:/g.test(prop)) {
              ogpData[prop.split(':')[1]] = data.ogp[prop][0];
          }
      }
      for (let prop in data.seo) {
        if (/^og:/g.test(prop)) {
            ogpData[prop.split(':')[1]] = data.seo[prop][0];
        }
      }
      console.log(JSON.stringify(ogpData));
      callback(null, {
        statusCode: 200,
        "headers": { "Content-Type": "application/json; charset=utf-8"},
        responseType: 'text',
        body: JSON.stringify(ogpData)
      });
    })
    .catch(e => ({
      statusCode: 400,
      body: e
    }));
};