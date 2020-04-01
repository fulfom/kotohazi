exports.handler = (event, context, callback) => {

  if ('url' in event.queryStringParameters === false) {
    console.error("parameter 'url' is necessary!!");
    return;
  }

  const targetUrl = event.queryStringParameters.url;

  const metascraper = require('metascraper')([
    require('metascraper-description')(),
    require('metascraper-image')(),
    require('metascraper-title')()
  ])
  
  const got = require('got')
  
  ;(async () => {
    const { body: html, url } = await got(targetUrl)
    const metadata = await metascraper({ html, url })
    console.log(metadata);
    callback(null, {
      statusCode: 200,
      "headers": { "Content-Type": "application/json; charset=utf-8"},
      body: JSON.stringify(metadata)
    });
  })()
};