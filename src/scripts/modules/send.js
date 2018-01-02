class Send {
  constructor() {
    console.log('>>> Send constructor');

    $('.js-send-form').on('submit', function(e) {
      e.preventDefault();

      let form = $(this);

      let data = new FormData(this);

      if(form.find('.js-input-file').existsWithValue()) {
        data.append('file', $('.js-input-file')[0].files);
      }

      $.ajax({
        'headers': {
          'X-CSRF-Token' : $('meta[name="csrf-token"]').attr('content')
        },
        'url': form.attr('action'),
        'method': 'POST',
        'data': data,
        'cache': false,
        'contentType': false,
        'processData': false,
        'success': function(resp) {
          // Remove error message
          $('.help-block').empty();

          // Reset form
          form[0].reset();
          $('.js-input-file').each( function() {
            let input = $(this),
                label = input.next('.label');

            label.addClass('icon-right-after').text('Selecionar')
          });

          // Hide modal
          setTimeout(function(){
            // Hide modal
            $('.modal').modal('hide');
          }, 500);

          // Show alert success
          Swal({
            icon: 'success',
            title: resp.title,
            text: resp.message,
            buttons: false,
            timer: 4000
          });

          // Redirect page
          if(typeof resp.redirect !== 'undefined') {
            setTimeout(function(){
              window.location.replace(resp.redirect);
            }, 3000);
          }
        },
        'error': function(resp){
          // Remove error message
          $('.help-block').empty();

          // Add error message
          $.each(resp.responseJSON.errors, function (key, value) {
            let input = form.find('.js-validate[name=' + key + ']').closest('.form-group');
                input.find('.help-block').text(value);
          });
        }
      });
    });
  }
}

export default Send;
