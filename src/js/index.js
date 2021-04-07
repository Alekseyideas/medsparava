import axios from 'axios';
import Test from './componetns/component';
import Test2 from './componetns/component2';
$('document').ready(() => {
  $('.ceremony__slider').slick({
    // normal options...
    infinite: true,
    slidesToShow: 3,
    dots: true,

    // the magic
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          infinite: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          arrows: false,
          slidesToShow: 1,
          dots: true
        }
      }
    ]
  });

  $('.jury__slider').slick({
    // normal options...
    infinite: true,
    slidesToShow: 1,
    dots: true,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          arrows: false
        }
      }
    ]
  });

  const links = document.querySelectorAll('a');

  if (window.location.hash) {
    const block = window.location.hash.replace('#', '');
    setTimeout(() => {
      scrollTo(block);
    }, 100);
  }

  links.forEach(link => {
    link.addEventListener('click', e => {
      if (link.href === `${window.origin}/#`) return e.preventDefault();
      const block = link.href.split('#')[1];
      scrollTo(block);
      return true;
    });
  });

  function scrollTo(el) {
    if (document.querySelector(`.${el}`)) {
      $('html, body').animate(
        {
          scrollTop: $(`.${el}`).offset().top
        },
        500
      );
    }
  }

  function checkInputsQuestionnaireForm() {
    const lastName = document.querySelector('#lastName');
    const name = document.querySelector('#name');
    const surname = document.querySelector('#surname');
    const position = document.querySelector('#position');
    const experience = document.querySelector('#experience');
    const job = document.querySelector('#job');
    const institutionProfile = document.querySelector('#institutionProfile');
    const subordinatesNumber = document.querySelector('#subordinatesNumber');
    const photo = document.querySelector('#photo');
    const personalData = document.querySelector('#personalData');
    const submitBtn = document.querySelector('#btn-submit-questionnaire');
    const form = document.querySelector('.questionnaire__form');
    const inputs = form.querySelectorAll('input');
    const selects = form.querySelectorAll('select');
    const radios = form.querySelectorAll('input[type=radio]');
    const data = {
      lastName: '',
      name: '',
      surname: '',
      position: '',
      // experience: '',
      job: '',
      mob: '',
      institutionProfile: '',
      subordinatesNumber: '',
      photo: ''
    };

    const radioData = {
      stg: '',
      dStg: '',
      ppz: '',
      place: '',
      frm: '',
      tpz: ''
    };

    const selectData = {
      obl: ''
    };

    if (radios[0]) {
      radios.forEach(radio => {
        radio.addEventListener('change', e => {
          console.log(value, 'value');
          const { name, value } = e.target;
          const uiWrapperRadio = document.getElementById(name);
          if (uiWrapperRadio) uiWrapperRadio.classList.remove('hasError');
          radioData[name] = value;
        });
      });
    }

    if (selects[0]) {
      selects.forEach(select => {
        select.addEventListener('change', e => {
          const { name, value } = e.target;
          const uiSelect = document.getElementById(name);
          if (uiSelect) {
            uiSelect.parentElement.classList.remove('hasError');
            selectData[name] = value;
          }
        });
      });
    }

    if (inputs[0])
      inputs.forEach(input => {
        if (input.type === 'checkbox') return null;

        data[input.name] = input.value;

        input.addEventListener('keyup', e => {
          const uiInput = document.getElementById(e.target.name);
          if (uiInput) {
            uiInput.parentElement.classList.remove('hasError');
            data[e.target.name] = e.target.value;
          }
        });
      });

    personalData.addEventListener('change', () => {
      personalData.parentElement.classList.remove('hasError');
    });
    submitBtn.addEventListener('click', e => {
      let hasError = false;

      Object.keys(radioData).map(key => {
        const uiWrapperRadio = document.getElementById(key);
        if (uiWrapperRadio && !radioData[key]) {
          hasError = true;
          uiWrapperRadio.classList.add('hasError');
        }
      });

      Object.keys(selectData).map(key => {
        const uiSelect = document.getElementById(key);
        if (uiSelect && uiSelect.hasAttribute('required') && !selectData[key]) {
          hasError = true;
          uiSelect.parentElement.classList.add('hasError');
        }
        return key;
      });
      Object.keys(data).map(key => {
        const uiInput = document.getElementById(key);
        if (uiInput && uiInput.hasAttribute('required') && !data[key]) {
          hasError = true;
          uiInput.parentElement.classList.add('hasError');
        }
        return key;
      });
      if (!personalData.checked) {
        hasError = true;
        personalData.parentElement.classList.add('hasError');
      }

      if (hasError) {
        e.preventDefault();
        return null;
      }

      console.log(data);
    });
  }
  function checkProjectPersonForm() {
    const form = document.querySelector('.project-person__form-about');
    const submitBtn = form.querySelector('.btn-submit');
    const projectFile = form.querySelector('#projectFile');
    const inputs = form.querySelectorAll('input');
    const textarea = form.querySelectorAll('textarea');
    const radios = form.querySelectorAll('input[type=radio]');

    const radioData = {
      vp: ''
    };

    const data = {
      projectName: '',
      goal: '',
      results: '',
      presentation: '',
      project: '',
      reviews: '',
      photoMaterials: '',
      additionalMaterial: ''
    };

    if (radios[0]) {
      radios.forEach(radio => {
        radio.addEventListener('change', e => {
          console.log(value, 'value');
          const { name, value } = e.target;
          const uiWrapperRadio = document.getElementById(name);
          if (uiWrapperRadio) uiWrapperRadio.classList.remove('hasError');
          radioData[name] = value;
        });
      });
    }

    if (textarea[0]) {
      textarea.forEach(input => {
        data[input.name] = input.value;

        input.addEventListener('change', e => {
          const uiInput = document.getElementById(e.target.name);
          if (uiInput) {
            uiInput.parentElement.classList.remove('hasError');
            data[e.target.name] = e.target.value;
          }
        });
      });
    }

    if (inputs[0])
      inputs.forEach(input => {
        if (input.type === 'checkbox') return null;

        data[input.name] = input.value;

        input.addEventListener('keyup', e => {
          const uiInput = document.getElementById(e.target.name);
          if (uiInput) {
            uiInput.parentElement.classList.remove('hasError');
            data[e.target.name] = e.target.value;
          }
        });

        input.addEventListener('change', e => {
          const uiInput = document.getElementById(e.target.name);

          if (e.target.type === 'file') {
            uiInput.parentElement.classList.remove('hasError');
            data[e.target.name] = e.target.value;
          }
        });
      });

    submitBtn.addEventListener('click', e => {
      let hasError = false;

      Object.keys(radioData).map(key => {
        const uiWrapperRadio = document.getElementById(key);
        if (uiWrapperRadio && !radioData[key]) {
          hasError = true;
          uiWrapperRadio.classList.add('hasError');
        }
      });

      Object.keys(data).map(key => {
        const uiInput = document.getElementById(key);
        if (uiInput && uiInput.hasAttribute('required') && !data[key]) {
          hasError = true;
          uiInput.parentElement.classList.add('hasError');
        }
        return key;
      });

      if (hasError) {
        e.preventDefault();
        return null;
      }

      // console.log(data);
    });
  }
  if (document.querySelector('#btn-submit-questionnaire')) {
    checkInputsQuestionnaireForm();
  }
  if (document.querySelector('.project-person__form-about')) {
    checkProjectPersonForm();
  }

  $(':file').jfilestyle({ input: false });
});
