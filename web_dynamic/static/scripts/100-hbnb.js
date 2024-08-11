$(function () {
  const apiBaseURL = 'http://0.0.0.0:5001';
  let selectedAmenities = {}
  let selectedStates = {}
  let selectedCities = {}


  // amenities filter
  $('.filters .amenities input[type="checkbox"]').on('change', function () {
    // update selected amenities dictionnary
    amenityId = $(this).attr('data-id')
    amenityName = $(this).attr('data-name')
    if ($(this).is(':checked'))
      selectedAmenities[amenityId] = amenityName;
    else
      delete selectedAmenities[amenityId]

    // display selected amenities
    content = Object.values(selectedAmenities).join(', ')
    $('.amenities h4').html(content);
  });

  // state filter
  $('.filters .locations .state-checkbox').on('change', function () {
    // update selected states dictionnary
    stateId = $(this).attr('data-id')
    stateName = $(this).attr('data-name')
    if ($(this).is(':checked'))
      selectedStates[stateId] = stateName;
    else
      delete selectedStates[stateId]

    // display selected states & cities
    content = [
      ...Object.values(selectedStates),
      ...Object.values(selectedCities)
    ].join(', ')
    $('.locations h4').html(content);
  });

  // city filter
  $('.filters .locations .city-checkbox').on('change', function () {
    // update selected cities dictionnary
    cityId = $(this).attr('data-id')
    cityName = $(this).attr('data-name')
    if ($(this).is(':checked'))
      selectedCities[cityId] = cityName;
    else
      delete selectedCities[cityId]

    // display selected states & cities
    content = [
      ...Object.values(selectedStates),
      ...Object.values(selectedCities)
    ].join(', ')
    $('.locations h4').html(content);
  });

  // display the API status
  let status_endpoint = apiBaseURL + '/api/v1/status/';
  $.get(status_endpoint, function (data) {
    if (data.status == 'OK')
      $("div#api_status").addClass('available');
    else
      $("div#api_status").removeClass('available');
  });


  // send a POST request to get the list of all places
  search_endpoint = apiBaseURL + '/api/v1/places_search/';

  $.ajax({
    url: search_endpoint,
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({}),
    success: function (response) {
      response.forEach(element => {
        // display places in DOM
        const content = `
        <article>
          <div class="title_box">
            <h2>${element.name}</h2>
            <div class="price_by_night">$${element.price_by_night}</div>
          </div>
          <div class="information">
            <div class="max_guest">${element.max_guest} Guests</div>
            <div class="number_rooms">${element.number_rooms} Bedrooms</div>
            <div class="number_bathrooms">${element.number_bathrooms} Bathrooms</div>
          </div>
          <div class="description">${element.description}</div>
			  </article>
        `
        $('section.places').append(content);
      });
    },
    error: function (xhr, status, error) {
      console.error('Error:', error);
    }
  });

  // filter by the states/cities/amenities checked
  $('button').on('click', function () {
    const amenityIds = Object.keys(selectedAmenities)
    const stateIds = Object.keys(selectedStates)
    const cityIds = Object.keys(selectedCities)
    const data = JSON.stringify(
      {
        'amenities': amenityIds,
        'states': stateIds,
        'cities': cityIds
      }
    );

    // send a POST request to get a list of places according to the filter
    $.ajax({
      url: search_endpoint,
      type: 'POST',
      contentType: 'application/json',
      data: data,
      success: function (response) {
        // first empty places section
        $('section.places').html('')

        // loop through places and display them
        response.forEach(element => {
          // display filtered places in DOM
          const content = `
          <article>
            <div class="title_box">
              <h2>${element.name}</h2>
              <div class="price_by_night">$${element.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">${element.max_guest} Guests</div>
              <div class="number_rooms">${element.number_rooms} Bedrooms</div>
              <div class="number_bathrooms">${element.number_bathrooms} Bathrooms</div>
            </div>
            <div class="description">${element.description}</div>
          </article>
          `
          $('section.places').append(content);
        });
      },
      error: function (xhr, status, error) {
        console.error('Error:', error);
      }
    });
  });

});
