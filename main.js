function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  var getAllRecords = function() {
    $.getJSON('https://api.airtable.com/v0/app1gicYFO0n8fPeh/Books?api_key=keyRtsOYYT6k8sJDV',
      function(airtable){
        var html = [];
        $.each(airtable.records, function(index, record) {
          var id = record.id;
          var picture = record.fields['Pictures'];
          var name = record.fields['Name'];
          html.push(listView(id, picture, name));
        });
        $('.list-view').append(html);
      }
    );
  }

  var getOneRecord = function(id) {
    $.getJSON(`https://api.airtable.com/v0/app1gicYFO0n8fPeh/Books/${id}?api_key=keyRtsOYYT6k8sJDV`,
      function(record){
        var html = [];
        var picture = record.fields['Pictures'];
        var name = record.fields['Name'];
        var category = record.fields['Category'];
        var link = record.fields['Link'];
        var author = record.fields['Author'];
        var summary = record.fields['Summary'];
        html.push(detailView(picture, name, category, link, author, summary ));
        $('.detail-view').append(html);
      }
    );
  }

  var listView = function(id, picture, name) {
    return `
      <div class="card border-dark" style="width: 18rem;">
      ${picture ? `<img src="${picture[0].url}">` : ``}
      <div class="card-body">
        <h2 class="card-title"><a href="index.html?id=${id}">${name}</h2></a>
        </div>
      </div>
    `;
  }

  var detailView = function(picture, name, category, link, author, summary) {
    return `
    ${picture ? `<img src="${picture[0].url}">` : ``}
    <h1>Title: ${name}</h1>
    <h2>Author: ${author}</h2>
    <h2>Description: ${summary}</h2>
    <h2>Type: ${category}
    <h3><a href="${link}" target="_blank">Click to purchase</a></h3>
    `;
}

var id = getParameterByName('id');
if (id) {
  getOneRecord(id);
} else {
  getAllRecords();
}