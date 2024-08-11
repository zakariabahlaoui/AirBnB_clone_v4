$(function () {
  // amenities filter
  let selectedAmenities = {}
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

  // display the API status
  const endpoint = 'http://0.0.0.0:5001/api/v1/status/'
  $.get(endpoint, function (data) {
    if (data.status == 'OK')
      $("div#api_status").addClass('available');
    else
      $("div#api_status").removeClass('available');
  });
});
