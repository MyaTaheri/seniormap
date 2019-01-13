var logos = {
    'Yale University': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Yale_University_Shield_1.svg/200px-Yale_University_Shield_1.svg.png',
    'Princeton University': 'https://upload.wikimedia.org/wikipedia/en/thumb/7/71/Princeton_shield.svg/200px-Princeton_shield.svg.png',
};

var map;

// Called by Maps API upon loading.
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), { // Define Map Settings
        center: {
            lat: 35,
            lng: -98
        },
        zoom: 4,
        disableDefaultUI: true,
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        backgroundColor: '#333333',
        styles: [
            {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{
                    color: '#222222'
                }]
            },
            {
                featureType: 'landscape',
                elementType: 'geometry',
                stylers: [{
                    color: '#444444'
                }]
            },
            {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [
                    {
                        color: '#444444'
                    },
                    {
                        lightness: -37
                    }
                ]
            },
            {
                featureType: 'poi',
                elementType: 'geometry',
                stylers: [{
                    color: '#666666'
                }]
            },
            {
                elementType: 'labels.text.stroke',
                stylers: [
                    {
                        visibility: 'on'
                    },
                    {
                        color: '#666666'
                    },
                    {
                        weight: 2
                    },
                    {
                        gamma: 0.84
                    }
                ]
            },
            {
                elementType: 'labels.text.fill',
                stylers: [{
                    color: '#ffffff'
                }]
            },
            {
                featureType: 'administrative',
                elementType: 'geometry',
                stylers: [
                    {
                        weight: 0.6
                    },
                    {
                        color: '#d12727'
                    }
                ]
            },
            {
                elementType: 'labels.icon',
                stylers: [{
                    visibility: 'off'
                }]
            },
            {
                featureType: 'poi.park',
                elementType: 'geometry',
                stylers: [{
                    color: '#333333'
                }]
            }
        ]
    });

    // TODO: Do this arynchronously
    Tabletop.init({
        key: '1oHzFViH9gI3rwXNeHqYLOiIIYo57m0n6EMPll5kZJRE',
        callback: function(students, tabletop) {
            // TODO: Stop using arrays
            for (student of tabletop.sheets()['raw'].toArray()) {
                var marker = new google.maps.Marker({
                    position: {
                        lat: parseFloat(student[6]),
                        lng: parseFloat(student[7]),
                    },
                    title: student[4] + ' ' + student[5] + ': ' + student[3],
                    name: student[4] + ' ' + student[5],
                    institution: student[3],
                })
                marker.addListener('click', function() {
                    document.getElementById('instructions').className = 'hidden';
                    document.getElementById('institution-name').textContent = marker.institution;
                    document.getElementById('institution-logo').src = logos[marker.institution];
                    var table = document.createElement('table'),
                        tbody = document.createElement('tbody');
                    var window = new google.maps.InfoWindow({
                        content: info,
                    });
                    window.open(map, marker);
                });
                marker.setMap(map);
            }
        },
        simpleSheet: true,
    });
}


