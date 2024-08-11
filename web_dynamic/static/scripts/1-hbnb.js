$(function () {
  let amenities = {}
  $('.filters .amenities input[type="checkbox"]').on('change', function () {
    amenity_Id = $(this).attr('data-id')
    amenity_Name = $(this).attr('data-name')
    if ($(this).is(':checked'))
      amenities[amenityId] = amenityName;
    else
      delete selectedAmenities[amenityId]

    // display selected amenities
    content = Object.values(amenities).join(', ')
    $('.amenities h4').html(content);
  });
});
