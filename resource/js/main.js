

(function () {

  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      try {
        return document.querySelector(el)
      } catch (err) {

      }

    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    if (all) {
      select(el, all).forEach(e => e.addEventListener(type, listener))
    } else {
      select(el, all).addEventListener(type, listener)
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 10
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function (e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Clients Slider
   */
  new Swiper('.clients-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 40
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 60
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 80
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 120
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function (e) {
        e.preventDefault();
        portfolioFilters.forEach(function (el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        aos_init();
      }, true);



    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfokio-lightbox'
  });


  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', () => {
    aos_init();
  });

})();





function convertStDate(dt) {

  var arr = dt.slice(0, 4);
  var arr1 = dt.slice(4, 6);
  var arr2 = dt.slice(6, 8);

  var fns = arr + "/" + arr1 + '/' + arr2;

  return fns
}



$(document).on("click", "#button-message-sub", function () {


  var nm = $("#contact_mail_name").val();
  var body = $("#contact_mail_body").val();
  var subject = $("#contact_mail_subject").val();
  var email = $("#contact_mail_email").val();
  if (nm.length > 3 && body.length > 4 && subject.length > 4 && email.length > 5) {
    var ts = {
      "kv": {
        "body": body,
        "senderEmail": email,
        "senderFullname": nm,
        "subject": subject
      }
    }

    $.ajax({
      type: "POST",
      url: UrlQb + "api/post/cl/traininghub/sendWebMessageToCoreContainer",
      data: JSON.stringify(ts), // now data come in this function
      contentType: "application/json; charset=utf-8",
      crossDomain: true,
      dataType: "json",
      success: function (data, status, jqXHR) {


        alert("Message Sended");
      }
    })


    $("#contact_mail_name").val("");
    $("#contact_mail_body").val("");
    $("#contact_mail_subject").val("");
    $("#contact_mail_email").val("");
  } else {
    alert("Please fill in all fields")
  }
})


function convertStTime(dt) {

  var arr = dt.slice(0, 2);
  var arr1 = dt.slice(2, 4);


  var fns = arr + ":" + arr1;

  return fns
}

function getSingleSerc(fkId, id, header, lng, strtm, endtm, endr, prc, fnlPrc, inlx, evvelki) {

  var ts = {
    "kv": {
      "id": fkId,
      "apiId": '21070808411204348720'

    }
  }

  $.ajax({
    type: "POST",
    url: UrlQb + "api/post/cl/traininghub/getCertificationDescription",
    data: JSON.stringify(ts), // now data come in this function
    contentType: "application/json; charset=utf-8",
    crossDomain: true,
    dataType: "json",
    success: function (data, status, jqXHR) {

      var dat = data.tbl[0].r
      var logo = dat[0].logo

      $("#event_list_hub").append(genEventListBlock(id, logo, header, lng, strtm, endtm, fkId, endr, prc, fnlPrc));




      if ((inlx + 1) === evvelki) {

        new Swiper('.testimonials-slider', {
          speed: 600,
          loop: true,
          autoplay: {
            delay: 5000,
            disableOnInteraction: false
          },
          slidesPerView: 'auto',
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
          },
          breakpoints: {
            320: {
              slidesPerView: 1,
              spaceBetween: 40
            },

            1200: {
              slidesPerView: 3,
            }
          }
        });
      }

    }
  })


}


function genEventListBlock(id, logo, header, lng, strtm, endtm, certId, endr, prc, fnlPrc) {

  if (endr == "") {
    var hidden = "hidden"
  } else {
    var hidden = "visible"
  }
  return ` <div id='${id}' class="swiper-slide">
  <div class="testimonial-item">
  <div class="ribbon" style="visibility:${hidden}">
  <span>-${endr}%</span>
</div>
  <div class="profile mt-auto">
  <img src="${UrlQb}api/get/zdfiles/traininghub/${logo}" class="testimonial-img" alt="">
  <h3> ${header}</h3>
  <h4>Start Time ${strtm} <br> End Time ${endtm}</h4>
</div>
    <p>
    Language: ${lng}
    </p>
    <p>
    Price:<span id="old"> ${prc}</span><span id="new"> ${fnlPrc}</span>
    </p>


    <br>
    <a class="getstarted scrollto" href="index-main.html?&point=eventListAll&singLeEvents=${id}">Details</a>
  
        
  </div>
</div>`
}


$(document).ajaxComplete(function () {


});
function genEventsList() {
  var json = {
    "kv": {

      "apiId": "21071110022302166113"
    }
  }

  $.ajax({
    type: "POST",
    url: UrlQb + "api/post/cl/traininghub/getEventList4Web",
    data: JSON.stringify(json), // now data come in this function
    contentType: "application/json; charset=utf-8",
    crossDomain: true,
    dataType: "json",
    async: true,
    success: function (data, status, jqXHR) {
      var dat = data.tbl[0].r

      for (let index = 0; index < dat.length; index++) {
        var id = dat[index].id
        var fkId = dat[index].fkCertificationId
        var header = dat[index].eventTitle
        var lng = dat[index].eventLang
        var stst = dat[index].eventStatus
        var endr = dat[index].disCount
        var prc = dat[index].price + " " + dat[index].currency
        var fnlPrc = dat[index].finalPrice + " " + dat[index].currency
        var stst = dat[index].eventStatus
        var strtm = ": " + convertStDate(dat[index].startDate)/* +""+ convertStTime(dat[index].startTime) */
        var endtm = ": " + convertStDate(dat[index].endDate)/* +""+ convertStTime(dat[index].endTime) */

        var dl = lang.find(x => x.key === lng).value;


        if (stst === "A") {

          getSingleSerc(fkId, id, header, dl, strtm, endtm, endr, prc, fnlPrc, index, dat.length);
        }

      }






    },

    error: function (jqXHR, status) {

    }
  });
}

genEventsList();




