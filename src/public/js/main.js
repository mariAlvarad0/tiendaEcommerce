var dates = ["20/05/2023", "06/05/2023", "07/05/2023", "23/05/2023"]; //asi puedes recibir las fechas de la bd y hacer el jq de variables FOMATO IMPORTANTE!!

function DisableDates(date) {
    var string = jQuery.datepicker.formatDate('dd/mm/yy', date);
    return [dates.indexOf(string) == -1];
    //validar que se haya seleccionado una opcion en todas ellas si no no me deja entrar a el modal, lo mismo para enviar, todo validado HACER CHECKBOX!!
}

$(function () { //lo que hace nada más iniciar la página
    $("#date").datepicker({
        beforeShowDay: DisableDates,
        dateFormat: 'dd/mm/yy',
        minDate: new Date()
    });
    $("#dateholder").datepicker({
        beforeShowDay: DisableDates,
        dateFormat: 'dd/mm/yy',
        minDate: new Date()
    });
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;
    document.getElementById("date").placeholder = today;
    document.getElementById("dateholder").placeholder = today;

    $('.form-check-input').click(function () {
        $('.form-check-input').not(this).prop('checked', false);
    });
});

// el nav siga bajando conmigo
let nav = document.querySelector(".navbar");
window.onscroll = function () {
    if (document.documentElement.scrollTop > 50) {
        nav.classList.add("header-scrolled");
    } else {
        nav.classList.remove("header-scrolled");
    }
}

window.onscroll = function () {
    if (document.documentElement.scrollTop > 50) {
        nav.classList.add("header-scrolled");
    } else {
        nav.classList.remove("header-scrolled");
    }
}

// nav 
let navBar = document.querySelectorAll(".nav-link");
let navCollapse = document.querySelector(".navbar-collapse.collapse");
navBar.forEach(function (a) {
    a.addEventListener("click", function () {
        navCollapse.classList.remove("show");
    })
})

// movimiento del layout
var swiper = new Swiper(".mySwiper", {
    direction: "vertical",
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    autoplay: {
        delay: 3500,
    },
});

// contador
document.addEventListener("DOMContentLoaded", () => {
    function counter(id, start, end, duration) {
        let obj = document.getElementById(id),
            current = start,
            range = end - start,
            increment = end > start ? 1 : -1,
            step = Math.abs(Math.floor(duration / range)),
            timer = setInterval(() => {
                current += increment;
                obj.textContent = current;
                if (current == end) {
                    clearInterval(timer);
                }
            }, step);
    }
    counter("count1", 0, 1287, 3000);
    counter("count2", 100, 987, 2500);
    counter("count3", 0, 1440, 3000);
    counter("count4", 100, 2579, 3000);
});
function recogerDatos() {
    //asi se coge el de los select (en este caso personas)
    var personas = document.getElementById("personas").value;
    var recipientepersonas = document.getElementById("personasholder");
    recipientepersonas.value = personas;

    var fecha = document.getElementById("date").value;
    var recipientefechas = document.getElementById("dateholder");
    recipientefechas.value = fecha;

    var sesion = document.getElementById("sesion").value;
    var recipientesesion = document.getElementById("sesionholder");
    recipientesesion.value = sesion;
}

var resul;
function validatePhoneNumber() {
    var tlfnval = document.getElementById('recipienttlfn');
    var tlfnConval = document.getElementById('recipienttlfnCon');
    var regex = /(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}/;
    if (tlfnval.value == "") {
        if (regex.test(tlfnConval.value)) {
            resul = true;
        } else {
            resul = false;
        }
    } else if (tlfnConval.value == "") {
        if (regex.test(tlfnval.value)) {
            resul = true;
        } else {
            resul = false;
        }
    }
}

var resulemail;
function validateEmail() {
    var email = document.getElementById('recipientemail');
    var emailCon = document.getElementById('recipientemailCon');
    if (email.value == "") {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailCon.value)) {
            resulemail = true;
        } else {
            resulemail = false;
        }
    } else if (emailCon.value == "") {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
            resulemail = true;
        } else {
            resulemail = false;
        }
    }
}

function validarReserva() {
    var select = document.getElementById('personasholder'); // or in jQuery use: select = this;
    var selectsesion = document.getElementById('sesionholder');
    var nombreval = document.getElementById('recipientininom');
    validatePhoneNumber();
    validateEmail();
    if (select.value == "Personas") {
        $("#toastPers").toast('show');
    } else if (selectsesion.value == "Sesion") {
        $("#toastSes").toast('show');
    } else if (nombreval.value == "") {
        $("#toastNom").toast('show');
    } else if (resul == false) {
        $("#toasttlf").toast('show');
    } else if (resulemail == false) {
        $("#toastmail").toast('show');
    } else if (!$("#flexCheckUno").is(":checked") && !$("#flexCheckDos").is(":checked") && !$("#flexCheckTres").is(":checked")) {
        $("#toastclase").toast('show');
    }
}

function validarContacto() {
    var asuntoval = document.getElementById('asuntoContacto');
    var mensajeval = document.getElementById('mensajeContacto');
    var nombreval = document.getElementById('nombreContacto');

    validatePhoneNumber();
    validateEmail();

    if (asuntoval.value == "") {
        $("#toastAsun").toast('show');
    } else if (mensajeval.value == "") {
        $("#toastMsj").toast('show');
    } else if (nombreval.value == "") {
        $("#toastNomCon").toast('show');
    } else if (resul == false) {
        $("#toasttlfCon").toast('show');
    } else if (resulemail == false) {
        $("#toastmailCon").toast('show');
    }
}