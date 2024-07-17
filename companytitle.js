var TxtType = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};

window.onload = function () {
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    // var css = document.createElement("style");
    // css.type = "text/css";
    // css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    // document.body.appendChild(css);
};

function changeReadMore() {
    const mycontent =
        document.getElementById('mybox1id');
    const mybutton =
        document.getElementById('mybuttonid');
    const span1 = document.getElementById("span1")

    if (mycontent.style.display === 'none'
        || mycontent.style.display === '') {
        mycontent.style.display = 'inline';
        span1.style.display = "none";
        mybutton.textContent = 'ReadLess';
    } else {
        mycontent.style.display = 'none';
        mybutton.textContent = 'ReadMore';
        span1.style.display = "inline";
    }
}

function changeReadMorelg() {
    const mycontent =
        document.getElementById('mybox1id1');
    const mybutton =
        document.getElementById('mybuttonid1');
    const span1 = document.getElementById("span2")

    if (mycontent.style.display === 'none'
        || mycontent.style.display === '') {
        mycontent.style.display = 'inline';
        span1.style.display = "none";
        mybutton.textContent = 'ReadLess';
    } else {
        mycontent.style.display = 'none';
        mybutton.textContent = 'ReadMore';
        span1.style.display = "inline";
    }
}


const form = document.querySelector('form');
const fullName = document.getElementById("name");
const email = document.getElementById("email")
const comments = document.getElementById("comments")

// Flag to prevent multiple submissions
function sendEmail() {
    const bodyMessage = `Full Name: ${fullName.value} <br> Email: ${email.value} <br> comments: ${comments.value}`;
    //console.log(bodyMessage);
    console.log("Sending email with body:", bodyMessage);

    Email.send({
        Host: "smtp.elasticemail.com",
        Username: "legaltitle.in@gmail.com",
        Password: "B02A8031E8323889696B8E583B9F262AF71E",
        To: 'legaltitle.in@gmail.com',
        From: "legaltitle.in@gmail.com",
        Subject: email.value,
        Body: bodyMessage
    }).then(
        message => {
            if (message == "OK") {
                Swal.fire({
                    title: "Success!",
                    text: "Message sent sucessfully!",
                    icon: "success"
                });
            }
            console.log("Email send response:", message);
        }
    ).catch(error => {
        console.error("Error sending email:", error);
    });
}
form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Form submitted");
    sendEmail();
    form.reset();
    return false;
});