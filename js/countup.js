  // Countup
  var counters = document.querySelectorAll('.counter');
  counters.forEach(function(counter) {
    var delay = parseInt(counter.getAttribute('data-delay'));
    var time = parseInt(counter.getAttribute('data-time'));

    function animateValue() {
      var start = 0;
      var end = parseInt(counter.innerText);
      var duration = time / delay;
      var range = end - start;
      var current = start;
      var increment = end > start ? 1 : -1;
      var stepTime = Math.abs(Math.floor(duration / range));

      var timer = setInterval(function() {
        current += increment;
        counter.innerText = current;
        if (current === end) {
          clearInterval(timer);
        }
      }, stepTime);
    }

    animateValue();
  });