import axios from '../../../node_modules/axios';
import swal from '../../../node_modules/sweetalert';

class Send {
  constructor() {
    console.log('>>> Send constructor');

    let buttons = document.getElementsByClassName('js-send-form');

    Array.from(buttons).forEach((button) => {
      button.addEventListener('click', (evt) => {
        evt.preventDefault();

        let form = evt.target.closest('.form');

        this.handleOnSubmit(form, evt, button);
      });
    });
  }

  handleOnSubmit(form, evt, button) {
    let formData = new FormData();
    let formAction = form.action;

    if (button.hasAttribute('formAction')) {
      formAction = button.formAction;
    }

    for (let i = 0; i < form.length; ++i) {
      formData.append(form[i].name, form[i].value);
    }

    axios({
      method: 'post',
      url: formAction,
      data: formData
    })
    .then(response => {
      this.handleResponse(response.data, form);
    }, error => {
      this.handleError(error.response.data, form);
    });
  }

  handleResponse(response, form) {
    // Remove validations
    this.removeValidation(form);

    // Hide modal
    $('.modal').modal('hide');

    // Reset form
    form.reset();

    // Show alert
    swal({
      title: response.title,
      text: response.message,
      icon: 'success',
      timer: 3000,
      buttons: false
    });

    // Redirect page
    if(typeof response.redirect !== 'undefined') {
      setTimeout(function(){
        window.location.replace(response.redirect);
      }, 3000);
    }
  }

  handleError(error, form) {
    this.removeValidation(form);
    this.addValidation(form, error);
  }

  addValidation(form, error) {
    let data = error.data;
    for (let key in data) {
      let input = form.querySelector(`[name^=${key}`);
      let group = input.closest('.form-group');
          group.classList.add('-error');

      let label = document.createElement('span');
          label.classList.add('help-block');
          label.innerHTML = data[key];

      group.appendChild(label);
    }
  }

  removeValidation(form) {
    let groups = form.querySelectorAll('.form-group');

    Array.from(groups).forEach((group) => {
      if (group.classList.contains('-error')) group.classList.remove('-error');
      if (group.querySelector('.help-block')) group.removeChild(group.querySelector('.help-block'));
    });
  }
}

export default Send;
