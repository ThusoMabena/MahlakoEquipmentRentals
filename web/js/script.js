document.addEventListener('DOMContentLoaded', function () {

  var itemLabels = {
    chairsQty: 'Chairs',
    tentQty: 'Tent',
    meatCutterQty: 'Meat cutter machine',
    portableToiletsQty: 'Portable toilets',
    mobileFreezerQty: 'Mobile freezer'
  };

  function clamp(value) {
    var n = parseInt(value, 10);
    if (isNaN(n) || n < 0) return 0;
    if (n > 99) return 99;
    return n;
  }

  function syncHiddenField(displayInput) {
    var mirrorId = displayInput.getAttribute('data-mirror');
    var hidden = document.getElementById(mirrorId);
    if (hidden) hidden.value = displayInput.value;
    updateSummary();
  }

  function updateSummary() {
    var box = document.getElementById('summaryBox');
    var lines = [];
    Object.keys(itemLabels).forEach(function (fieldId) {
      var hidden = document.getElementById(fieldId);
      var qty = clamp(hidden ? hidden.value : 0);
      if (qty > 0) {
        lines.push(qty + ' × ' + itemLabels[fieldId]);
      }
    });

    if (lines.length === 0) {
      box.innerHTML = '<span class="empty">No items selected yet — set quantities above.</span>';
    } else {
      box.innerHTML = lines.map(function (l) { return '<div>' + l + '</div>'; }).join('');
    }
  }

  
  document.querySelectorAll('.qty-stepper').forEach(function (stepper) {
    var input = stepper.querySelector('input');
    var buttons = stepper.querySelectorAll('button');

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var step = parseInt(btn.getAttribute('data-step'), 10);
        input.value = clamp(clamp(input.value) + step);
        syncHiddenField(input);
      });
    });

    input.addEventListener('change', function () {
      input.value = clamp(input.value);
      syncHiddenField(input);
    });
  });

  // Require at least one item before allowing submission
  var form = document.getElementById('bookingForm');
  form.addEventListener('submit', function (e) {
    var total = 0;
    Object.keys(itemLabels).forEach(function (fieldId) {
      var hidden = document.getElementById(fieldId);
      total += clamp(hidden ? hidden.value : 0);
    });
    if (total === 0) {
      e.preventDefault();
      alert('Please select at least one item before confirming your booking.');
      document.getElementById('gear').scrollIntoView({ behavior: 'smooth' });
    }
  });

  updateSummary();
});
