module.exports = {
  validURL: function (str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  },
  hasProtocol: function (str) {
    var pattern = new RegExp('https?:\\/\\/')

    return !!pattern.test(str);
  },
  hasWWW: function (str) {
    var pattern = new RegExp(/www./)

    return !!pattern.test(str);
  },
}
