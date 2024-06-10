// Ascultă evenimentul care indică că documentul HTML a fost complet încărcat
document.addEventListener("DOMContentLoaded", function () {
    // Obține referințe către elementele HTML pe care le vom folosi
    const form = document.getElementById('validationForm'); // Formularul de validare
    const messageDiv = document.getElementById('message'); // Div-ul pentru mesaje
    const colorInput = document.getElementById('color'); // Input-ul pentru culoare
    const initialBackgroundColor = document.body.style.backgroundColor; // Culoarea de fundal inițială a documentului

    // Adaugă un ascultător pentru evenimentul de trimitere a formularului
    form.addEventListener('submit', function (event) {
        // Oprire comportament implicit de trimitere a formularului
        event.preventDefault();
        // Verifică dacă formularul este valid
        if (validateForm()) {
            // Salvează datele în localStorage
            saveDataToLocalStorage();
            // Trimite datele către server și așteaptă confirmarea
            sendFormData().then(() => {
                // Afisează un mesaj de succes
                messageDiv.textContent = "Formularul a fost trimis cu succes!";
                // Resetarea formularului după trimitere
                form.reset();
                // Restabilește culoarea de fundal inițială
                document.body.style.backgroundColor = initialBackgroundColor;
                // Schimbă culoarea aleatorie a mesajului de confirmare
                changeRandomColor(messageDiv);
            });
        }
    });

    // Adaugă un ascultător pentru schimbarea valorii input-ului de culoare
    colorInput.addEventListener('input', function () {
        // Schimbă culoarea de fundal a documentului în funcție de valoarea input-ului de culoare
        document.body.style.backgroundColor = colorInput.value;
    });

    // Funcție pentru validarea formularului
    function validateForm() {
        // Obține valorile introduse în câmpurile de nume și vârstă
        const name = document.getElementById('name').value;
        const age = document.getElementById('age').value;
        // Expresiile regulate pentru validarea numelui și vârstei
        const namePattern = /^[a-zA-Z\s]+$/;
        const agePattern = /^[0-9]{1,3}$/;

        // Verifică dacă numele respectă expresia regulată
        if (!namePattern.test(name)) {
            alert('Numele trebuie să conțină doar litere și spații.');
            return false;
        }

        // Verifică dacă vârsta respectă expresia regulată
        if (!agePattern.test(age)) {
            alert('Vârsta trebuie să fie un număr valid.');
            return false;
        }

        // Returnează true dacă formularul este valid
        return true;
    }

    // Funcție pentru salvarea datelor formularului în localStorage
    function saveDataToLocalStorage() {
        // Obține valorile din toate câmpurile formularului
        const formData = {
            name: document.getElementById('name').value,
            age: document.getElementById('age').value,
            color: document.getElementById('color').value,
            gender: document.querySelector('input[name="gender"]:checked')?.value,
            subscribe: document.getElementById('subscribe').checked,
            feedback: document.getElementById('feedback').value,
            rating: document.getElementById('range').value
        };

        // Converteste obiectul formData in JSON si il salveaza in localStorage
        localStorage.setItem('formData', JSON.stringify(formData));
    }

    // Funcție pentru schimbarea aleatoare a culorii unui element
    function changeRandomColor(element) {
        // Culorile disponibile pentru selectare
        const colors = ['red', 'green', 'blue', 'orange', 'purple'];
        // Selectează o culoare aleatorie din lista de culori disponibile
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        // Setează culoarea elementului la culoarea aleatorie selectată
        element.style.color = randomColor;
    }

    // Interval de timp pentru schimbarea aleatoare a culorii bordurii câmpului de nume
    setInterval(function () {
        // Obține elementul de input pentru nume
        const nameField = document.getElementById('name');
        // Obține culoarea actuală a bordurii
        const currentColor = getComputedStyle(nameField).borderColor;
        // Schimbă culoarea bordurii în funcție de culoarea actuală
        nameField.style.borderColor = currentColor === 'black' ? 'red' : 'black';
    }, 1000);

    // Adaugă un ascultător pentru evenimentul de apăsare a tastei Enter în câmpul de feedback
    document.getElementById('feedback').addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            // Oprirea comportamentului implicit al tastei Enter (de a trimite formularul)
            event.preventDefault();
            // Afișează un mesaj de alertă
            alert('Enter apăsat în textarea!');
        }
    });

    // Funcție asincronă pentru trimiterea datelor formularului către server
    async function sendFormData() {
        // Obține datele din formular
        const formData = {
            name: document.getElementById('name').value,
            age: document.getElementById('age').value,
            color: document.getElementById('color').value,
            gender: document.querySelector('input[name="gender"]:checked')?.value,
            subscribe: document.getElementById('subscribe').checked,
            feedback: document.getElementById('feedback').value,
            rating: document.getElementById('range').value
        };

        try {
            // Trimite datele prin cerere POST către server
            const response = await fetch('/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            // Verifică dacă răspunsul este OK
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Așteaptă transformarea răspunsului în format JSON
            const result = await response.json();
            // Afișează în consolă mesajul de succes
            console.log('Success:', result);
        } catch (error) {
            // Afișează în consolă mesajul de eroare în caz de eșec
            console.error('Error:', error);
        }
    }
});
