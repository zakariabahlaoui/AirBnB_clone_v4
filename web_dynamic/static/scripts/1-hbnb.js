$(function () {
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
});
