var test_flux = new JFlux();

// -------- register dispatcher --------
test_flux.add({
    action: 'first',
    next_action: 'second',
    store: function () {
        console.log('first store');
    },
    view: function () {
        console.log('first view');
    }
});

test_flux.add({
    action: 'second',
    next_action: '',
    store: function () {
        console.log('second store');
    },
    view: function () {
        console.log('second view');
    }
});
// -------------------------------------

$(function () {
    $('#run').on('click', function (event) {
        test_flux.action('first');
    });
});
