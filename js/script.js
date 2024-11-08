document.addEventListener('DOMContentLoaded', function () {
    var swiper = new Swiper('.swiper-container', {
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
    });
  
    const aside = document.querySelector('aside');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            aside.classList.add('aside-visible');
        } else {
            aside.classList.remove('aside-visible');
        }
    });
  
    const form = document.getElementById('commentaire');
    const nom = document.getElementById('nom');
    const prenom = document.getElementById('Prenom');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
  
    form.addEventListener('submit', function(event) {
        event.preventDefault(); 
  
        clearErrorMessages();
  
        const nomValue = nom.value.trim();
        const prenomValue = prenom.value.trim();
        const emailValue = email.value.trim();
        const messageValue = message.value.trim();
  
        let errorMessage = '';
  
        if (!nomValue) {
            errorMessage = 'Le champ Nom est requis.';
            displayErrorMessage(nom, errorMessage);
        }
        if (!prenomValue) {
            errorMessage = 'Le champ Prénom est requis.';
            displayErrorMessage(prenom, errorMessage);
        }
        if (!emailValue) {
            errorMessage = 'Le champ Email est requis.';
            displayErrorMessage(email, errorMessage);
        } else if (!validateEmail(emailValue)) {
            errorMessage = 'Veuillez entrer une adresse email valide.';
            displayErrorMessage(email, errorMessage);
        }
        if (!messageValue) {
            errorMessage = 'Le champ Commentaire est requis.';
            displayErrorMessage(message, errorMessage);
        }
  
        if (errorMessage) {
            return;
        }
  
        const formData = new FormData();
        formData.append('nom', nomValue);
        formData.append('Prenom', prenomValue);
        formData.append('email', emailValue);
        formData.append('message', messageValue);
  
        fetch('database.php', {
          method: 'POST',
          body: formData
        })
        .then(response => response.text())
        .then(data => {
          console.log('Commentaire envoyé avec succès!');
          console.log(data); 
          form.reset();
          afficherMessageConfirmation(); 
        })
        .catch(error => {
          console.log('Une erreur est survenue lors de l\'envoi du commentaire.');
          console.error('Erreur:', error);
        });
    });
  
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
  
    function afficherMessageConfirmation() {
        const submitButton = document.querySelector('#commentaire button[type="submit"]');
        submitButton.style.backgroundColor = 'green';
        submitButton.textContent = 'Envoyé avec succès!';
        setTimeout(() => {
            submitButton.style.backgroundColor = '';
            submitButton.textContent = 'Envoyer';
        }, 2000);
    }
  
    function displayErrorMessage(field, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        field.parentNode.insertBefore(errorDiv, field.nextSibling);
        field.addEventListener('input', function() {
            errorDiv.remove();
        });
    }
  
    function clearErrorMessages() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(function(message) {
            message.remove();
        });
    }
  
    function handleScroll() {
        const elements = document.querySelectorAll('.scroll-animation');
        const windowHeight = window.innerHeight;
  
        elements.forEach(element => {
            const positionFromTop = element.getBoundingClientRect().top;
  
            if (positionFromTop - windowHeight <= 0) {
                element.classList.add('scrolled');
            }
        });
    }
  
    window.addEventListener('scroll', handleScroll);
    handleScroll();
  });
  document.addEventListener('DOMContentLoaded', function () {
    function handleScroll() {
        const elements = document.querySelectorAll('.scroll-animation');
        const windowHeight = window.innerHeight;
  
        elements.forEach(element => {
            const positionFromTop = element.getBoundingClientRect().top;
  
            if (positionFromTop - windowHeight <= 0) {
                element.classList.add('scrolled');
            }
        });
    }
  
    window.addEventListener('scroll', handleScroll);
    handleScroll();
  });
  
  let comments = [];
  let currentIndex = 0;
  
  function fetchComments() {
      fetch('show_comments.php?action=get_comments')
          .then(response => response.json())
          .then(data => {
              comments = data;
              displayComment();
          })
          .catch(error => console.error('Error fetching comments:', error));
  }
  
  function displayComment() {
      if (comments.length === 0) return;
  
      const commentContainer = document.getElementById('div-general-comm');
      commentContainer.innerHTML = ''; // Clear previous comments
  
      for (let i = 0; i < 2; i++) {
          const commentIndex = (currentIndex + i) % comments.length;
          const comment = comments[commentIndex];
  
          const commentDiv = document.createElement('div');
          commentDiv.className = 'comment-container';
          commentDiv.innerHTML = `
              <div class="comment-header">
                  <img src="Images/user-pen-solid.svg" class="icon" alt="user icon" />
                  <div class="comment-name-email">
                      <p class="comment-nom-prenom">
                          ${comment.nom.charAt(0).toUpperCase() + comment.nom.slice(1).toLowerCase()} 
                          ${comment.prenom.charAt(0).toUpperCase() + comment.prenom.slice(1).toLowerCase()}
                      </p>
                      <p class="comment-email">${comment.email.toLowerCase()}</p>
                  </div>
              </div>
              <p class="comment-message">${comment.message}</p>
          `;
  
          commentContainer.appendChild(commentDiv);
      }
  
      currentIndex = (currentIndex + 2) % comments.length;
  }
  
  setInterval(displayComment, 5000);
  
  fetchComments();
  
  
  
  
  
  
  

