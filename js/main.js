$(document).ready(function () {


    AOS.init();

    var openMenuBtn = $("#open-menu");
    var closeMenuBtn = $("#close-menu");
    var mobileMenu = $("#mobile-menu");


    openMenuBtn.on('click', function () {
        mobileMenu.removeClass("translate-x-full");
        mobileMenu.addClass("translate-x-0");
    })

    closeMenuBtn.on('click', function () {
        mobileMenu.removeClass("translate-x-0");
        mobileMenu.addClass("translate-x-full");
    })


    const swiper = new Swiper('.swiper', {
        direction: 'vertical',
        loop: true,
        slidesPerView: 1,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },


    });





    const allTabsBtn = document.querySelectorAll('#tabs-btns button');
    const allTabsBlock = document.querySelectorAll('#tabs-block > div');



    allTabsBtn.forEach(ele => {

        ele.addEventListener("click", e => {
            allTabsBtn.forEach(btn => {
                btn.classList.remove('tab-active');
            });
            e.currentTarget.classList.add('tab-active');

            if (e.currentTarget.getAttribute("data-id") == "All") {
                allTabsBlock.forEach(block => {
                    block.classList.remove('hidden');
                })
            } else {

                allTabsBlock.forEach(block => {
                    block.classList.add('hidden');
                });

                document.querySelectorAll(`#tabs-block div[data-filter=${e.currentTarget.getAttribute("data-id")}]`).forEach(block => {
                    block.classList.remove('hidden');
                })
            }
        })


    })


    if(document.querySelector("#contact-form")) {
        $('#contact-form').validate({


        errorElement: "p",
        errorClass: "text-sm font-medium text-destructive",
        rules: {
            name: { required: true, minlength: 3, maxlength: 35 },
            message: { required: true, minlength: 3, maxlength: 300 },
            email: { required: true, email: true, minlength: 8, maxlength: 40 },
            phoneNumber: { required: true, minlength: 10, maxlength: 12 },
            companyName: { required: true, minlength: 2, maxlength: 40 },
            jobTitle: { required: true, minlength: 2, maxlength: 40 },
            country: { required: true },




        },
        messages: {
            name: { required: "Name must be at least 2 characters." },
            message: { required: "Message must be at least 10 characters." },
            email: { required: "Please enter a valid email address." },
            phoneNumber: { required: "Please enter a valid phone number." },
            companyName: { required: "Please enter your company name." },
            jobTitle: { required: "Please enter your job title." },
            country: { required: "Please select your country." },



        },

        errorPlacement: function (error, element) {
            if (element.attr('name') == "phoneNumber") {
                element.parent().after(error);
            } else {
                element.after(error);
            }

        },
        submitHandler: function (form, event) {
                event.preventDefault();

                $("#contact-form button[type='submit']").text("Sending...").attr("disabled", true);

                const formData = new FormData(form);
                const dataObj = {};

                // Iterate through the FormData object and populate the dataObj
                formData.forEach((value, key) => {
                    dataObj[key] = value;
                });

                // Send to local API (make sure server is running and CORS allows this origin)
                fetch("http://localhost:3000/api/contact", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(dataObj),
                })
                .then(response => {
                    if (!response.ok) throw new Error('Network response was not ok');
                    return response.json();
                })
                .then(data => {
                    console.log("Contact saved:", data);
                    // Redirect to thank you page
                    window.location.href = "thank-you-contact.html";
                })
                .catch((error) => {
                    console.error("Error saving contact:", error);
                    alert("Sending failed. Please try again later.");
                    $("#contact-form button[type='submit']").text("SUBMIT").removeAttr("disabled");
                });
            }
    });
    }


// ---------------- NEWSLETTER FORM ----------------
    if ($("#newsletter-form").length) {
        $("#newsletter-form").on("submit", function (e) {
            e.preventDefault();
            const email = $("#newsletter-email").val().trim();

            if (!email) {
                alert("Please enter a valid email.");
                return;
            }

            const $btn = $("#newsletter-form button[type='submit']");
            $btn.text("Subscribing...").attr("disabled", true);

            fetch("http://localhost:3000/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            })
            .then(res => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.json();
            })
            .then(data => {
                console.log("Newsletter success:", data);
                alert("✅ Thank you for subscribing!");
                $("#newsletter-email").val("");
                $btn.text("Subscribe").removeAttr("disabled");
            })
            .catch(err => {
                console.error("Newsletter error:", err);
                alert("❌ Subscription failed. Try again later.");
                $btn.text("Subscribe").removeAttr("disabled");
            });
        });
    }




    const hero = document.getElementById('hero-container');

    if (hero) {
        const heroHeight = hero.offsetHeight;

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;

            const progress = Math.min(scrollY / heroHeight, 1);

            const opacity = 1 - progress;
            const translateY = progress * 100;

            hero.style.opacity = opacity;
            hero.style.transform = `translateY(${translateY}px)`;
        });

    }




    const dots = document.querySelectorAll('.dot');

    dots.forEach(dot => {
        // Random direction and distance
        const x = (Math.random() * 200 - 50).toFixed(1); // ±100px
        const y = (Math.random() * 200 - 20).toFixed(1); // ±100px

        // Slow speed: 5 to 10 seconds
        const duration = (Math.random() * 5000 + 5000);
        const delay = Math.random() * 2000;

        dot.animate([
            { transform: 'translate(0, 0)', opacity: 1 },
            { transform: `translate(${x}px, ${y}px)`, opacity: 0 }
        ], {
            duration: duration,
            delay: delay,
            iterations: Infinity,
            direction: 'alternate',
            easing: 'ease-in-out',
            fill: 'both'
        });
    });






    if (document.querySelector("#checkout-form")) {
        $('#checkout-form').validate({


            errorElement: "p",
            errorClass: "text-sm font-medium text-destructive",
            rules: {
                firstName: { required: true, minlength: 2, maxlength: 35 },
                lastName: { required: true, minlength: 2, maxlength: 35 },
                email: { required: true, email: true, minlength: 8, maxlength: 40 },




            },
            messages: {
                firstName: { required: "First Name must be at least 2 characters" },
                lastName: { required: "Last Name must be at least 2 characters" },
                email: { required: "Please enter a valid email address" },


            },

            errorPlacement: function (error, element) {
                    element.after(error);

            },
            submitHandler: function (form, event) {
                event.preventDefault();
                
                // Get form data
                const formData = {
                    firstName: $("#checkout-form [name='firstName']").val(),
                    lastName: $("#checkout-form [name='lastName']").val(),
                    email: $("#checkout-form [name='email']").val(),
                    amountInUSD: $(".selected-plan-price").text().replace('$', '').trim()
                };
                
                // Update button state
                $("#checkout-form button[type='submit']").text("Processing payment...").attr("disabled", "");
                
                // Get API domain from config
                const apiDomain = "https://payments.techno-designs.com";
                const paymentEndpoint = `${apiDomain}/payment-link`;
                
                // Make the payment request
                $.ajax({
                    url: paymentEndpoint,
                    type: "POST",
                    data: JSON.stringify(formData),
                    contentType: "application/json",
                    success: function(response) {
                        if (response && response.paymentLink) {
                            // Open payment link in a new tab
                            window.open(response.paymentLink, '_self');
                        } else {
                            // Handle error - no payment link in response
                            $("#checkout-error").text("Payment processing failed. Please try again.").removeClass("hidden");
                            $("#checkout-form button[type='submit']").text("Proceed to Payment").removeAttr("disabled");
                        }
                    },
                    error: function(xhr, status, error) {
                        // Handle error
                        console.error("Payment request failed:", error);
                        $("#checkout-error").text("Payment processing failed. Please try again.").removeClass("hidden");
                        $("#checkout-form button[type='submit']").text("Proceed to Payment").removeAttr("disabled");
                    }
                });
            }
        });
        }





});




