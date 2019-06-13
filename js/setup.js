// var userDialog = document.querySelector('.setup');
// userDialog.classList.remove('hidden');

document.querySelector('.setup-similar').classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

  var WIZARD_NAMES = ['Иван', 'Хуан Себястьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var NUMBER_OF_WIZARDS = 4;

  var randomWizards = function(NUMBER_OF_WIZARDS) {
    var x = [];
    for (var i = 0; i < NUMBER_OF_WIZARDS; i++) {
      x[i] = {
        name: WIZARD_NAMES[(Math.floor(Math.random() * WIZARD_NAMES.length))] + ' ' + WIZARD_LAST_NAMES[(Math.floor(Math.random() * WIZARD_LAST_NAMES.length))],
        coatColor: COAT_COLOR[Math.floor(Math.random() * COAT_COLOR.length)],
        eyesColor: EYES_COLOR[Math.floor(Math.random() * EYES_COLOR.length)]
      };
    }
    return x;
  };

wizards = randomWizards(NUMBER_OF_WIZARDS);

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
  similarListElement.appendChild(fragment);

//userDialog.querySelector('.setup-similar').classList.remove('hidden');

// Обработчик событий на открытие окна настроек.
//Объявление переменных.
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var setupClose = document.querySelector('.setup-close');

//Обработчик нажатия на Esc
var onPopupEscPress = function(evt) {
  if (evt.keyCode === ESC_KEYCODE && document.querySelector('.setup-user-name') !== document.activeElement) {
closePopup();
}
};

//Общий обработчик открытия
var openPopup = function() {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

//Общий обработчик закрытия
var closePopup = function() {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

//Обработчик событий на открытие окна
setupOpen.addEventListener('click', function() {
  openPopup();
});

//Открытие окна, когда на иконку встали табом
setupOpen.addEventListener('keydown', function(evt) {
if (evt.keyCode === ENTER_KEYCODE) {
  openPopup();
}
});

//Обработчик событий на закрытие окна
setupClose.addEventListener('click', function() {
  closePopup();
});

//Закрытие окна, когда на крестик встали табом
setupClose.addEventListener('keydown', function(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

//Замена текста стандартной ошибки при валидации
var userNameInput = setup.querySelector('.setup-user-name');

userNameInput.addEventListener('invalid', function(evt) {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25 символов');
  }
    else if (userNameInput.validity.valueMissing) {
      userNameInput.setCustomValidity('Обязательное поле');
    }
    else {
      userNameInput.setCustomValidity('');
    }
  });

//Валидация может быть на стороне js, не только html5
userNameInput.addEventListener('input', function(evt) {
  var target = evt.target;
  if (target.value.length < 2) {
    target.setCustomValidity('Имя должно состоять минимум их 2-х символов');
  } else {
    target.setCustomValidity('');
  }
});


//Объявление переменных для смены цвета элементов персонажа
var colorFireballBackground = document.querySelector('.setup-fireball-wrap');
var colorFireballInput = document.querySelector('input[name="fireball-color"]');

var colorEyesUse = document.querySelector('.wizard-eyes');
var colorEyesInput = document.querySelector('input[name="eyes-color"]')

var colorCoatUse = document.querySelector('.wizard-coat');
var colorCoatInput = document.querySelector('input[name="coat-color"]');

//Функция смены цвета МАНТИИ по порядку
function onCoatClick(){
  var n = 0;
  for(var i = 0; i < COAT_COLOR.length; i++) {
    if (colorCoatUse.style.fill === COAT_COLOR[i]) {
      n = i;
      };
};
  if (n === (COAT_COLOR.length - 1)) {
      n = 0;
      colorCoatUse.style.fill = COAT_COLOR[n];
      colorCoatInput.value = COAT_COLOR[n];
    } else {
      colorCoatUse.style.fill = COAT_COLOR[n+1];
      colorCoatInput.value = COAT_COLOR[n+1];
  };
};

//Обработчик нажатия на МАНТИЮ - вызывает функцию смены цвета
colorCoatUse.addEventListener('click', function() {
onCoatClick();
  });

//Функция смены цвета ГЛАЗ по порядку
  function onEyesClick(){
    var n = 0;
    for(var i = 0; i < EYES_COLOR.length; i++) {
      if (colorEyesUse.style.fill === EYES_COLOR[i]) {
        n = i;
        };
  };
    if (n === (EYES_COLOR.length - 1)) {
        n = 0;
        colorEyesUse.style.fill = EYES_COLOR[n];
        colorEyesInput.value = EYES_COLOR[n];
      } else {
        colorEyesUse.style.fill = EYES_COLOR[n+1];
        colorEyesInput.value = EYES_COLOR[n+1];
    };
  };

  //Обработчик нажатия на ГЛАЗА- вызывает функцию смены цвета
  colorEyesUse.addEventListener('click', function() {
  onEyesClick();
    });

//Функция смены цвета ФАЙЕРБОЛА
var countColorFireball = 0; //счетчик переключений цвета файербола

//Непосредственно функция смены цвета ФАЙЕРБОЛА
  function onFireballClick(){
    if (countColorFireball === (FIREBALL_COLOR.length - 1)) {
        colorFireballBackground.style.background = FIREBALL_COLOR[0];
        colorFireballInput.value = FIREBALL_COLOR[0];
        countColorFireball = 0;
      } else {
        countColorFireball++;
        colorFireballBackground.style.background = FIREBALL_COLOR[countColorFireball];
        colorFireballInput.value = FIREBALL_COLOR[countColorFireball]
    };
  };

  //Обработчик нажатия на ФАЙЕРБОЛ - вызывает функцию смены цвета
        colorFireballBackground.addEventListener('click', function() {
        onFireballClick();
          });
