const urlMetadata = require('url-metadata')

module.exports = async (req, res) => {
  if (!req.query || !req.query.url) {
    res.status(400).send({
      success: 0,
      error,
    });
  }
  await urlMetadata(req.query.url)
    .then(
    function (metadata) {
      res.set('Content-Type', 'application/json');
      res.status(200).send({
        success: 1,
        meta: metadata
      });
    },
    function (error) {
      console.log(error)
      res.status(500).send({
        success: 0,
        error,
      });
    })
}
