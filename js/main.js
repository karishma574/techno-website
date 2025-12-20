$(document).ready(function () {
  // Init AOS
  AOS.init();

  /* ---------------- MOBILE MENU ---------------- */
  const openMenuBtn = $("#open-menu");
  const closeMenuBtn = $("#close-menu");
  const mobileMenu = $("#mobile-menu");

  openMenuBtn.on("click", function () {
    mobileMenu.removeClass("translate-x-full").addClass("translate-x-0");
  });

  closeMenuBtn.on("click", function () {
    mobileMenu.removeClass("translate-x-0").addClass("translate-x-full");
  });

  /* ---------------- SWIPER ---------------- */
  new Swiper(".swiper", {
    direction: "vertical",
    loop: true,
    slidesPerView: 1,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
  });

  /* ---------------- TABS ---------------- */
  const allTabsBtn = document.querySelectorAll("#tabs-btns button");
  const allTabsBlock = document.querySelectorAll("#tabs-block > div");

  allTabsBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      allTabsBtn.forEach((b) => b.classList.remove("tab-active"));
      e.currentTarget.classList.add("tab-active");

      const filter = e.currentTarget.getAttribute("data-id");

      if (filter === "All") {
        allTabsBlock.forEach((block) => block.classList.remove("hidden"));
      } else {
        allTabsBlock.forEach((block) => block.classList.add("hidden"));
        document
          .querySelectorAll(`#tabs-block div[data-filter=${filter}]`)
          .forEach((block) => block.classList.remove("hidden"));
      }
    });
  });

  /* ---------------- CONTACT FORM ---------------- */
  if ($("#contact-form").length) {
    $("#contact-form").validate({
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
        element.attr("name") === "phoneNumber"
          ? element.parent().after(error)
          : element.after(error);
      },

      submitHandler: function (form, event) {
        event.preventDefault();

        const $btn = $("#contact-form button[type='submit']");
        $btn.text("Sending...").attr("disabled", true);

        const dataObj = {};
        new FormData(form).forEach((v, k) => (dataObj[k] = v));

        fetch("http://localhost:3000/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataObj),
        })
          .then(async (res) => {
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Submission failed");
            return data;
          })
          .then((data) => {
            console.log("MongoDB contact saved:", data);
            window.location.href = "thank-you-contact.html";
          })
          .catch((err) => {
            alert(err.message || "Sending failed. Please try again later.");
            $btn.text("SUBMIT").removeAttr("disabled");
          });
      },
    });
  }

  /* ---------------- NEWSLETTER FORM ---------------- */
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
        body: JSON.stringify({ email }),
      })
        .then(async (res) => {
          const data = await res.json();
          if (!res.ok) throw new Error(data.message || "Subscription failed");
          return data;
        })
        .then((data) => {
          console.log("MongoDB newsletter saved:", data);
          alert("Thank you for subscribing!");
          $("#newsletter-email").val("");
          $btn.text("Subscribe").removeAttr("disabled");
        })
        .catch((err) => {
          alert(err.message || "Subscription failed.");
          $btn.text("Subscribe").removeAttr("disabled");
        });
    });
  }

  /* ---------------- HERO SCROLL EFFECT ---------------- */
  const hero = document.getElementById("hero-container");
  if (hero) {
    const heroHeight = hero.offsetHeight;
    window.addEventListener("scroll", () => {
      const progress = Math.min(window.scrollY / heroHeight, 1);
      hero.style.opacity = 1 - progress;
      hero.style.transform = `translateY(${progress * 100}px)`;
    });
  }

  /* ---------------- FLOATING DOTS ---------------- */
  document.querySelectorAll(".dot").forEach((dot) => {
    dot.animate(
      [
        { transform: "translate(0,0)", opacity: 1 },
        {
          transform: `translate(${Math.random() * 200 - 50}px, ${
            Math.random() * 200 - 20
          }px)`,
          opacity: 0,
        },
      ],
      {
        duration: Math.random() * 5000 + 5000,
        delay: Math.random() * 2000,
        iterations: Infinity,
        direction: "alternate",
        easing: "ease-in-out",
      }
    );
  });
});
