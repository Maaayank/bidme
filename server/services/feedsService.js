const http = require('https');
const convert = require('xml-js')
const dbServices = require('../database').services
module.exports = {

    fetchUpdates: async (db) => {
        // try {

        //     http.get("https://gadgets.ndtv.com/rss/tablets/feeds", (res) => {

        //         const { statusCode } = res;

        //         if (statusCode == 200) {
        //             res.setEncoding('utf8');
        //             let rawData = '';

        //             res.on('data', (chunk) => { rawData += chunk; });
        //             res.on('end', () => {
        //                 var parsedData = convert.xml2json(rawData, { compact: true });
        //                 parsedData = JSON.parse(parsedData)
        //                 const items = parsedData.rss.channel.item
        //                 const parsedItems = []
        //                 items.forEach(element => {
        //                     item = {
        //                         guid: element.guid._cdata,
        //                         title: element.title._cdata,
        //                         description: element.description._cdata,
        //                         link: element.link._text,
        //                         category: element.category._cdata,
        //                         pub_date: element.pubDate._text
        //                     }

        //                     parsedItems.push(item)
        //                 });

        //                 dbServices.updateFeeds(db, parsedItems)
        //             })

        //         } else {
        //             res.resume()
        //             return
        //         }
        //     })
        // } catch (err) {
        //     console.log(err)
        // }
    }
}