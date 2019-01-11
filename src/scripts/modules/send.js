import axios from '../../../node_modules/axios';
import swal from '../../../node_modules/sweetalert';

class Send {
  constructor() {
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
      if (this.checkType(form[i], 'checkbox') == true || this.checkType(form[i], 'radio') == true) {
        if (form[i].checked) {
          formData.append(form[i].name, form[i].value);
        }
      } else if (this.checkType(form[i], 'file') == true) {
        if (form[i].value.length) {
          formData.append(form[i].name, form[i].files[0], form[i].files[0].name);
        }
      } else {
        formData.append(form[i].name, form[i].value);
      }
    }

    axios({
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
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
    let timeout = 0;

    // Remove validations
    this.removeValidation(form);

    // Reset form
    if (typeof response.resetForm == 'undefined'){
      form.reset();
    }

    // Show alert
    if(typeof response.title !== 'undefined') {
      swal({
        title: response.title,
        text: response.message,
        icon: 'success',
        timer: 3000,
        buttons: false
      });

      timeout = 2500;
    } else {
      timeout = 100;
    }

    // Redirect page
    if(typeof response.redirect !== 'undefined') {
      setTimeout(function(){
        window.location.replace(response.redirect);
      }, timeout);
    }
  }

  handleError(error, form) {
    this.removeValidation(form);
    this.addValidation(form, error);
  }

  addValidation(form, error) {
    if(typeof error.title !== 'undefined') {
      // Show alert
      swal({
        title: error.title,
        text: error.message,
        icon: 'error',
        timer: 3000,
        buttons: false
      });
    }

    let data = error.data;

    for (let key in data) {
      let input = form.querySelector('.js-validate[name="' + key + '"]');

      let group = input.closest('.form-group');
          group.classList.add('-wrong');

      let messageError = document.createElement('span');
          messageError.classList.add('help-block');
          messageError.innerHTML = data[key];

      group.appendChild(messageError);
    }
  }

  removeValidation(form) {
    let groups = form.querySelectorAll('.form-group');

    Array.from(groups).forEach((group) => {
      if (group.classList.contains('-wrong')) group.classList.remove('-wrong');
      if (group.querySelector('.help-block')) group.removeChild(group.querySelector('.help-block'));
    });
  }

  checkType(element, type) {
    return element instanceof HTMLInputElement && element.getAttribute('type') == type;
  }
}

export default Send;
