define([
  'lodash'
], function(_) {

  var outputFile = null;
  
  var parseNames = function (file, cb) {
    var reader = new FileReader();

    reader.onload = function (e) { 
      var lines = e.target.result.split('\n');
      var names = [];

      _.each(lines, function (line) {
        var tokens = []; // Added 'var' to prevent implicit global crash

        if (line.trim().length === 0) {
          return;
        }

        if (file.type === 'text/csv' || file.name.indexOf('.csv') !== -1) {
          tokens = line.split(',');
        } else if (file.type === 'text/tsv' || file.name.indexOf('.tsv') !== -1) {
          tokens = line.split('\t');
        } else {
          tokens.push(line);
        }

        var name = tokens[0].trim();
        var value = null; 
  
        if (tokens.length >= 2 && tokens[1].trim() !== '')  {
          value = parseFloat(tokens[1]);
        }

        names.push({ name: name, value: value });
      });

      cb(names);
    }

    reader.readAsText(file);
  };

  var generateOutputFile = function (names) {
    var lines = _.map(names, function (card, index) {
      var humanIndex = index + 1;
      if (card.value === null) {
        return new String(humanIndex + '. ' + card.name + '\n');
      } else {
        return new String(humanIndex + '. ' + card.name + ' (' + card.value + ')\n');
      }
    });

    var data = new Blob(lines, { type: 'text/plain' });

    if (outputFile !== null) {
      window.URL.revokeObjectURL(outputFile);
    }

    outputFile = window.URL.createObjectURL(data);

    return outputFile;
  }

  return {
    parseNames: parseNames,
    generateOutputFile: generateOutputFile
  };
});
