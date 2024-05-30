// Navbar functionality
let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

window.onscroll = () => {
    menu.classList.remove('bx-x');
    navbar.classList.remove('active');
}

// Scroll Reveal Animation
const sr = ScrollReveal({
    distance: '60px',
    duration: 2500,
    delay: 400,
    reset: true
});

sr.reveal('.text', {delay: 100, origin: 'top'});
sr.reveal('.form-container form', {delay: 100, origin: 'left'});
sr.reveal('.heading', {delay: 100, origin: 'top'});
sr.reveal('.ride-container .box', {delay: 100, origin: 'top'});
sr.reveal('.services-container .box', {delay: 100, origin: 'top'});
sr.reveal('.about-container .box', {delay: 100, origin: 'top'});
sr.reveal('.reviews-container', {delay: 100, origin: 'top'});
sr.reveal('.feedback .box', {delay: 100, origin: 'bottom'});

document.addEventListener('DOMContentLoaded', function () {
    // Handle "Rent Now" button clicks
    const rentButtons = document.querySelectorAll('.btn');
    rentButtons.forEach(function (button) {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            
            const parentBox = event.target.closest('.box');
            if (parentBox) {
                const location = document.getElementById('address').value;
                const pickUpDate = document.getElementById('pickupdate').value;
                const returnDate = document.getElementById('returndate').value;
                const carName = parentBox.querySelector('h3').textContent;
                
                const data = {
                    location: location,
                    pick_up_date: pickUpDate,
                    return_date: returnDate,
                    car_name: carName
                };

                fetch('process.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })
                .then(response => response.text())
                .then(data => {
                    console.log(data);
                    alert("Successful booking!");
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            }
        });
    });

    // Handle feedback form submission
    const feedbackForm = document.querySelector('.feedback form');
    feedbackForm.addEventListener('submit', function (event) {
        event.preventDefault();
        
        const fullName = document.getElementById('feed-name').value;
        const contact = document.getElementById('feed-tel').value;
        const email = document.getElementById('feed-email').value;
        const feedback = document.getElementById('feedb').value;
        
        const feedbackData = {
            fullName: fullName,
            contact: contact,
            email: email,
            feedback: feedback
        };

        fetch('process.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(feedbackData),
        })
        .then(response => response.text())
        .then(data => {
            console.log(data); 
            alert("Feedback submitted successfully!");
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
