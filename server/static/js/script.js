(function() {
  function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    var files = evt.dataTransfer.files;
    for (var i = 0, f; f = files[i]; i++) {
      UploadRoom.upload(f);
      var li = '<li><strong>' + f.name + '</strong> (' + (f.type || 'n/a') + ') - ' + f.size + ' bytes, last modified: ' + (f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a') + '</li>';
      $('#active_uploads').append(li);
    }
  }

  function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  }

  var dropZone = document.getElementById('drop_zone');
  dropZone.addEventListener('dragover', handleDragOver, false);
  dropZone.addEventListener('drop', handleFileSelect, false);
})();