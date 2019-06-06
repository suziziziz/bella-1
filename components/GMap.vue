<template>
  <div id="map" class="w-100"></div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  },

  mounted() {
    const latitude = -22.911108
    const longitude = -43.1744414
    const element = document.getElementById('map')

    const options = {
      // How zoomed in you want the map to start at (always required)
      zoom: 15,
      scrollwheel: false,
      navigationControl: false,
      mapTypeControl: false,
      scaleControl: false,

      // The latitude and longitude to center the map (always required)
      // eslint-disable-next-line no-undef
      center: new google.maps.LatLng(latitude, longitude),

      // How you would like to style the map
      // This is where you would paste any style found on Snazzy Maps
      styles: [
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [
            {
              color: '#c8c8c8'
            },
            {
              lightness: 17
            }
          ]
        },
        {
          featureType: 'landscape',
          elementType: 'geometry',
          stylers: [
            {
              color: '#dfdfdf'
            },
            {
              lightness: 20
            }
          ]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.fill',
          stylers: [
            {
              color: '#ffffff'
            },
            {
              lightness: 17
            }
          ]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [
            {
              color: '#ffffff'
            },
            {
              lightness: 29
            },
            {
              weight: 0.2
            }
          ]
        },
        {
          featureType: 'road.arterial',
          elementType: 'geometry',
          stylers: [
            {
              color: '#ffffff'
            },
            {
              lightness: 18
            }
          ]
        },
        {
          featureType: 'road.local',
          elementType: 'geometry',
          stylers: [
            {
              color: '#ffffff'
            },
            {
              lightness: 16
            }
          ]
        },
        {
          featureType: 'poi',
          elementType: 'geometry',
          stylers: [
            {
              color: '#f5f5f5'
            },
            {
              lightness: 21
            }
          ]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [
            {
              color: '#f9ecd4'
            },
            {
              lightness: 21
            }
          ]
        },
        {
          elementType: 'labels.text.stroke',
          stylers: [
            {
              visibility: 'on'
            },
            {
              color: '#ffffff'
            },
            {
              lightness: 16
            }
          ]
        },
        {
          elementType: 'labels.text.fill',
          stylers: [
            {
              saturation: 36
            },
            {
              color: '#333333'
            },
            {
              lightness: 40
            }
          ]
        },
        {
          elementType: 'labels.icon',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [
            {
              color: '#f2f2f2'
            },
            {
              lightness: 19
            }
          ]
        },
        {
          featureType: 'administrative',
          elementType: 'geometry.fill',
          stylers: [
            {
              color: '#fefefe'
            },
            {
              lightness: 20
            }
          ]
        },
        {
          featureType: 'administrative',
          elementType: 'geometry.stroke',
          stylers: [
            {
              color: '#fefefe'
            },
            {
              lightness: 17
            },
            {
              weight: 1.2
            }
          ]
        }
      ]
    }
    // eslint-disable-next-line no-undef
    const map = new google.maps.Map(element, options)
    // eslint-disable-next-line no-unused-vars
    const marker =
      // eslint-disable-next-line no-undef
      new google.maps.Marker({
        // eslint-disable-next-line no-undef
        position: new google.maps.LatLng(latitude, longitude),
        map: map,
        title: this.name
      })
  }
}
</script>

<style lang="scss" scoped>
#map {
  height: 60vh;
}
</style>
