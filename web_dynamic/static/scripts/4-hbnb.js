$(function () {
  const domain = 'http://0.0.0.0:5001';
  let amenities = {}
  $('.filters .amenities input[type="checkbox"]').on('change', function () {
    amenityId = $(this).attr('data-id')
    amenityName = $(this).attr('data-name')
    if ($(this).is(':checked'))
      amenities[amenityId] = amenityName;
    else
      delete amenities[amenityId]

    content = Object.values(amenities).join(', ')
    $('.amenities h4').html(content);
  });

  let status_endpoint = domain + '/api/v1/status/';
  $.get(status_endpoint, function (data) {
    if (data.status == 'OK')
      $("div#api_status").addClass('available');
    else
      $("div#api_status").removeClass('available');
  });


  search_endpoint = domain + '/api/v1/places_search/';

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

  // filter by the list of amenities checked
  $('button').on('click', function () {
    const ids = Object.keys(amenities)
    const data = JSON.stringify({ 'amenities': ids })

    // send a POST request to get a list of places that has selected amenities
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
