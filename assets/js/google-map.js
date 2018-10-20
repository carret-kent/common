// GoogleMapをLoad
// callbackにmaps.initを受け渡し
config.GOOGLE_MAP_SCRIPT_LOAD('maps.init');

var maps = {
    vars: {
        $document: $(document),
        $content: $('.content'),
        latlngTokyo: {
            lat: 35.681167,
            lng: 139.767052
        },
        geocoder: null,
    },
    objects: {
        simpleMap: null,
        pan: {
            map: null,
            maker: null
        },
        addressSearch: {
            map: null,
            maker: null
        },
        streetView: {
            map: null,
            streetView: null
        }
    },

    init: function () {
        // ジオコード変換用オブジェクト
        maps.vars.geocoder = new google.maps.Geocoder();

        maps.simpleMapInit();
        maps.panMapInit();
        maps.addressSearchMapInit();
        maps.streetViewMapInit();
    },

    // simpleMap
    simpleMapInit: function () {
        maps.objects.simpleMap = new google.maps.Map(document.getElementById('simple'), {
            center: maps.vars.latlngTokyo,
            zoom: 15,
            mapTypeControl: false,
            fullscreenControl: false,
            streetViewControl: false,
            zoomControl: false,
        });

        maps.mapEvent.setMaker(maps.objects.simpleMap, maps.vars.latlngTokyo)
    },

    // panMap
    panMapInit: function () {
        maps.objects.pan.map = new google.maps.Map(document.getElementById('pan'), {
            center: maps.vars.latlngTokyo,
            zoom: 15
        });

        maps.objects.pan.maker = maps.mapEvent.setMaker(maps.objects.pan.map, maps.vars.latlngTokyo);

        // Panイベントをバインド
        google.maps.event.addListener(maps.objects.pan.map, 'click', function (event) {
            maps.objects.pan.maker = maps.mapEvent.setAndPan(maps.objects.pan.map, maps.objects.pan.maker, event.latLng);
            maps.vars.$content.find('#pan-lat').val(event.latLng.lat());
            maps.vars.$content.find('#pan-lng').val(event.latLng.lng());
        });

        maps.vars.$content.find('#pan-lat').val(maps.vars.latlngTokyo.lat);
        maps.vars.$content.find('#pan-lng').val(maps.vars.latlngTokyo.lng);
    },

    // address Search
    addressSearchMapInit: function () {
        maps.objects.addressSearch.map = new google.maps.Map(document.getElementById('address'), {
            center: maps.vars.latlngTokyo,
            zoom: 15
        });

        maps.objects.addressSearch.maker = maps.mapEvent.setMaker(maps.objects.addressSearch.map, maps.vars.latlngTokyo);
    },

    // street View
    streetViewMapInit: function () {
        maps.objects.streetView.map = new google.maps.Map(document.getElementById('street-map'), {
            center: maps.vars.latlngTokyo,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            streetViewControl: true
        });

        maps.objects.streetView.streetView = new google.maps.StreetViewPanorama(document.getElementById('street-view'), {
            pano: null
        });

        maps.objects.streetView.streetView.addListener('position_changed', function () {
            maps.objects.streetView.map.panTo(maps.objects.streetView.streetView.getPosition());
        });

        maps.objects.streetView.map.setStreetView(maps.objects.streetView.streetView);
    },

    mapEvent: {
        setMaker: function (map, position) {
            return new google.maps.Marker({
                position: position,
                map: map
            });
        },
        clearMaker: function (maker) {
            maker.setMap(null);
        },
        setAndPan: function (map, maker, position) {
            maps.mapEvent.clearMaker(maker);

            map.panTo(new google.maps.LatLng(position.lat(), position.lng()));

            return new google.maps.Marker({
                position: position,
                map: map
            });
        },
        searchAndPan: function (map, maker, word) {
            console.log(map);
            console.log(maker);
            maps.vars.geocoder.geocode({'address': word}, function (result, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    maker = maps.mapEvent.setAndPan(map, maker, result[0].geometry.location);
                }
            });
        }
    }
};

$(function () {
    maps.vars.$content.on('click', '#address-search', function () {
        var word = $('#address-input').val();
        maps.mapEvent.searchAndPan(maps.objects.addressSearch.map, maps.objects.addressSearch.maker, word);
    });
});

