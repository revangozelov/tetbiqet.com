var UsId


var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');


    if (sParameterName[0] === sParam) {
      return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
    }
  }
  return false;
};

function topicBlockGen() {
  return `<div class="container" id='topic-div-block-el' style="padding-top: 100px;">
       <div class="col-12">
            <div class="box-loader shimmer">
              <div class="lines">
                <div class="line s_shimmer"></div>
               
              </div>
            </div>
          </div>  
          
          <div class="col-12">
               <div class="box-loader shimmer">
                 <div class="lines">
                   <div class="line s_shimmer"></div>
                  
                 </div>
               </div>
             </div>  
          <div class="col-12">
               <div class="box-loader shimmer">
                 <div class="lines">
                   <div class="line s_shimmer"></div>
                  
                 </div>
               </div>
             </div>  
          <div class="col-12">
               <div class="box-loader shimmer">
                 <div class="lines">
                   <div class="line s_shimmer"></div>
                  
                 </div>
               </div>
             </div>  
          <div class="col-12">
               <div class="box-loader shimmer">
                 <div class="lines">
                   <div class="line s_shimmer"></div>
                  
                 </div>
               </div>
             </div>  
          <div class="col-12">
               <div class="box-loader shimmer">
                 <div class="lines">
                   <div class="line s_shimmer"></div>
                  
                 </div>
               </div>
             </div>  
          <div class="col-12">
               <div class="box-loader shimmer">
                 <div class="lines">
                   <div class="line s_shimmer"></div>
                  
                 </div>
               </div>
             </div>  
  
  </div>`
}

(function () {


  var alte = getUrlParameter("point");



  if (alte === 'topic') {


    $('#main').html(topicBlockGen());
    genTopicBlock14() ;


  }
  if (alte === 'certificate') {
    $('#services').show()

    var subdt = getUrlParameter('certificateId');
    $('#certificatie-block').css("display", "none");
    $('#certificatie-block1').empty();
    $('#certificatie-block1').show();

    if (subdt === false) {


      genCertificationBlock14()

    } else {
      var crt = getUrlParameter('sub_cert');

      if (crt === false) {
        getCertiDescription(subdt)

      } else {
        genSertfifcationBlokLarge(crt);
      }

    }



  }
  if (alte === 'sourcedModelOver') {
    $('#blog').show();

    $(".trig-header").text("Sourced Agile Model Zones")
    var subdt = getUrlParameter('sub_sect');
    genSectionBlockGen();
    if (subdt === false) {


    } else {


      genSectionSingle(subdt);
    }


  }
  if (alte === 'eventListAll') {
    var subdt = getUrlParameter('singLeEvents');
    $('#services').show();
    
    if (!subdt==false) {
      $("#certificatie-block1").parents(".container").find(".section-header p").remove();
      $('#certificatie-block').css("display", "none");

    $('#certificatie-block1').show();
      
      getSingleBlockEventFullDesct(subdt);
      
    }else{
    

      $("#certificatie-block1").parents(".container").find(".section-header p").text("Upcoming Events");
      genEventsList2();
  
    }
  

  }
  if (alte === 'sourcedModelOver1') {
    $('#blog').show();

    $(".trig-header").text("Sourced Agile Model Roles")
    var subdt = getUrlParameter('sub_sect1');
    genSectionBlockGen1();
    if (subdt === false) {


    } else {


      genSectionSingle1(subdt);
    }


  }
  if (alte === 'systemSkils') {
    /* $('#skilss').show(); */


    /*   var subdt = getUrlParameter('sub_future');
      genSkilssBlock();
      if(subdt===false){
      
        
      }else{

         
        genFeatureSingle(subdt);
      } */
    $.get("system.html", function (html_string) {
      $('#main').html(html_string);


    });

  }

  if (alte === 'profile') {
    let sud = localStorage.getItem('UsId');
    if (sud !== null) {
      $.get("profile.html", function (html_string) {
        $('#main').html(html_string);

        $(".cstmtab .nav ul li").click(function () {
          $(this)
            .addClass("active")
            .siblings()
            .removeClass("active");

          let vale = $(this).val()
          tabs(vale);

        });
        let tab = document.querySelectorAll(".tab");

        function tabs(panelIndex) {
          tab.forEach(function (node) {
            node.style.display = "none";
          });
          $(tab[panelIndex]).css('display', 'block');

        }
        tabs(0);
      });
    } else {
      window.location.href = 'index.html';
    }


  }
  if (alte === 'login') {

    $.get("login.html", function (html_string) {
      $('#main').html(html_string);


    });

  }
  if (alte === 'active') {
    var ids = getUrlParameter('id');
    activProfileUserId(ids)




  }
  






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

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
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

  /**
   * Animation on scroll
   */
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

function convertStTime(dt) {

  var arr = dt.slice(0, 2);
  var arr1 = dt.slice(2, 4);


  var fns = arr + ":" + arr1;

  return fns
}

function getSingleEvent1(fkId, id, header, lng, strtm, endtm,endr,prc,fnlPrc) {

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

      $("#certificatie-block").hide()
      $("#certificatie-block1").show()

      $("#certificatie-block1").append(genEventListBlock1(id, logo, header, lng, strtm, endtm, fkId,endr,prc,fnlPrc));



    }
  })


}

function getCertificationEventList(fkId, id, header, lng, strtm, endtm,endr,prc,fnlPrc) {

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
      

      $('#cert-event-list').append(genEventListBlock1(id, logo, header, lng, strtm, endtm, fkId,endr,prc,fnlPrc));


    }
  })


}


function genEventListBlock1(id, logo, header, lng, strtm, endtm, certId,endr,prc,fnlPrc) {
  if(endr==""){
    var hidden = "hidden"
   }else{
     var hidden = "visible"
   }
  return ` <div id='${id}' class=" col-lg-4 col-md-6">
  <div class="testimonial-item">
  <div class="ribbon" style="visibility:${hidden}">
  <span>-${endr}%</span>
</div>
  <div class="profile mt-auto">
  <img src="${UrlQb}api/get/zdfiles/traininghub/${logo}" class="testimonial-img" alt="">
  <h6 class="pt-5"><b> ${header}</b></h6>
  <h4>Start Time ${strtm} <br> End Time ${endtm}</h4>
</div>
<p>
Language: ${lng}
</p>
<p>
Price:<span id="old"> ${prc}</span><span id="new"> ${fnlPrc}</span>
</p>

    <a class="getstarted scrollto" href="index-main.html?&point=eventListAll&singLeEvents=${id}">Details</a>
        
  </div>
</div>`
}



function genEventsList2() {
  var ts = {
    "kv": {
      "apiId":'21071110022302166113'

    }
  }
  $.ajax({
    type: "POST",
    url: UrlQb + "api/post/cl/traininghub/getEventList4Web",
    data: JSON.stringify(ts), // now data come in this function
    contentType: "application/json; charset=utf-8",
    crossDomain: true,
    dataType: "json",
    success: function (data, status, jqXHR) {
      var dat = data.tbl[0].r

      $("#certificatie-block1").empty();
      for (let index = 0; index < dat.length; index++) {
        var id = dat[index].id
        var fkId = dat[index].fkCertificationId
        var header = dat[index].eventTitle
        var lng = dat[index].eventLang
        var stst = dat[index].eventStatus
        var endr = dat[index].disCount
        var prc = dat[index].price+" "+dat[index].currency
        var fnlPrc =dat[index].finalPrice+" "+dat[index].currency
        var stst = dat[index].eventStatus
        var strtm = ": "+convertStDate(dat[index].startDate)/* +""+ convertStTime(dat[index].startTime) */
        var endtm = ": "+convertStDate(dat[index].endDate)/* +""+ convertStTime(dat[index].endTime) */
 
        var dl = lang.find(x => x.key === lng).value;
        
      
        if(stst === "A"){
     
          getSingleEvent1(fkId,id,header,dl,strtm,endtm,endr,prc,fnlPrc);
        }

      }


    },

    error: function (jqXHR, status) {

    }
  });
}


function getCertiDescription(id) {

  var ts = {
    "kv": {
      "id": id

    }
  }

  $.ajax({
    type: "POST",
    url: UrlQb + "api/post/zd/traininghub/getCertificationGroupList4Web",
    data: JSON.stringify(ts), // now data come in this function
    contentType: "application/json; charset=utf-8",
    crossDomain: true,
    dataType: "json",
    success: function (data, status, jqXHR) {
      var dat = data.tbl[0].r[0]

      $('#certificatie-block1').empty();

      var idSld = dat.id
      var desct = dat.description
      var log = dat.logo


      $('#certificatie-block1')
        .append($("<div>").attr('id', idSld)
          .addClass('col-lg-9 col-md-9')
          .append($("<div>").addClass("text-left").append('<img width="300px" src="' + UrlQb + 'api/get/zdfiles/traininghub/' + log + '" alt="">'))
          .append(desct)
        )



      getGroupInside(id);


    },

    error: function (jqXHR, status) {

    }
  });
}



function addGenSectList(id, nm, img, desct) {

  return `
  <article class="entry" id='${id}'>

  <div class="row col-lg-12">
    <img  src="${UrlQb}api/get/zdfiles/traininghub/${img}" alt="" style="max-height:100px; max-width:60px" class="col-lg-2 img-fluid">
    <h2 class="entry-title col-lg-10">
    <a href="">${nm}</a>
  </h2>
  </div>

 
  <div class="entry-content col-lg-12">
    ${desct}
  </div>

</article>`
}

function genSectionBlockGen() {

  $.ajax({
    type: "POST",
    url: UrlQb + "api/post/zd/traininghub/getModelSectionList4Web",
    data: JSON.stringify(), // now data come in this function
    contentType: "application/json; charset=utf-8",
    crossDomain: true,
    dataType: "json",
    success: function (data, status, jqXHR) {
      var dat = data.tbl[0].r

      $('#sidebarsection').empty();
      for (let index = 0; index < dat.length; index++) {
        var idSld = dat[index].id
        var imgSld = dat[index].logo
        var sctnm = dat[index].sectionName



        $('#sidebarsection')
          .append($("<div>").attr('id', idSld)
            .addClass('post-item clearfix')
            .append('<img src="' + UrlQb + 'api/get/zdfiles/traininghub/' + imgSld + '" alt="">')
            .append('<h4><a href="#">' + sctnm + '</a></h4>'))



        var subdt = getUrlParameter('sub_sect');


        if (subdt === false) {

          $("#sidebarsection").children().first().click();

        } else {
          $("#sidebarsection").find('#' + subdt).css("background", 'aliceblue');
        }

      }


    },

    error: function (jqXHR, status) {

    }
  });
}

function genSectionBlockGen1() {

  $.ajax({
    type: "POST",
    url: UrlQb + "api/post/zd/traininghub/getModelRoleList4Web",
    data: JSON.stringify(), // now data come in this function
    contentType: "application/json; charset=utf-8",
    crossDomain: true,
    dataType: "json",
    success: function (data, status, jqXHR) {
      var dat = data.tbl[0].r

      $('#sidebarsection').empty();
      for (let index = 0; index < dat.length; index++) {
        var idSld = dat[index].id
        var imgSld = dat[index].logo
        var sctnm = dat[index].roleName




        $('#sidebarsection')
          .append($("<div>").attr('id', idSld)
            .addClass('post-item1 clearfix')
            .append('<img src="' + UrlQb + 'api/get/zdfiles/traininghub/' + imgSld + '" alt="">')
            .append('<h4><a href="#">' + sctnm + '</a></h4>'))



        var subdt = getUrlParameter('sub_sect1');


        if (subdt === false) {

          $("#sidebarsection").children().first().click();

        } else {
          $("#sidebarsection").find('#' + subdt).css("background", 'aliceblue');
        }

      }


    },

    error: function (jqXHR, status) {

    }
  });
}

function genSkilssBlock() {

  $.ajax({
    type: "POST",
    url: UrlQb + "api/post/zd/traininghub/getSystemFeatureList4Web",
    data: JSON.stringify(), // now data come in this function
    contentType: "application/json; charset=utf-8",
    crossDomain: true,
    dataType: "json",
    success: function (data, status, jqXHR) {
      var dat = data.tbl[0].r


      for (let index = 0; index < dat.length; index++) {
        var idSld = dat[index].id

        var sctnm = dat[index].featureName
        var ornm = dat[index].orderNo



        $('#skilss-list-ul')
          .append($("<li>")
            .addClass("list-group-item feature-item").css("order", ornm).attr("id", idSld).attr("orderNo", ornm)
            .append(ornm + ". " + sctnm))



        var subdt = getUrlParameter('sub_future');


        if (subdt === false) {

          $("#skilss-list-ul").find("[orderNo='1']").first().click();

        } else {
          $("#skilss-list-ul").find('#' + subdt).addClass("active");
        }

      }


    },

    error: function (jqXHR, status) {

    }
  });
}

function genSectionSingle(id) {
  var ts = {
    "kv": {
      "id": id

    }
  }


  $.ajax({
    type: "POST",
    url: UrlQb + "api/post/zd/traininghub/getModelSectionList4Web",
    data: JSON.stringify(ts), // now data come in this function
    contentType: "application/json; charset=utf-8",
    crossDomain: true,
    dataType: "json",
    success: function (data, status, jqXHR) {
      var dat = data.tbl[0].r


      for (let index = 0; index < dat.length; index++) {
        var idSld = dat[index].id
        var imgSld = dat[index].logo
        var sctnm = dat[index].sectionName
        var dsc = dat[index].sectionFullDesc




        $('#entries-model').empty();
        $('#entries-model')
          .append(addGenSectList(idSld, sctnm, imgSld, dsc))



      }




    },

    error: function (jqXHR, status) {

    }
  });
}

function genSectionSingle1(id) {
  var ts = {
    "kv": {
      "id": id

    }
  }


  $.ajax({
    type: "POST",
    url: UrlQb + "api/post/zd/traininghub/getModelRoleList4Web",
    data: JSON.stringify(ts), // now data come in this function
    contentType: "application/json; charset=utf-8",
    crossDomain: true,
    dataType: "json",
    success: function (data, status, jqXHR) {
      var dat = data.tbl[0].r


      for (let index = 0; index < dat.length; index++) {
        var idSld = dat[index].id
        var imgSld = dat[index].logo
        var sctnm = dat[index].roleName
        var dsc = dat[index].roleFullDesc



        $('#entries-model').empty();
        $('#entries-model')
          .append(addGenSectList(idSld, sctnm, imgSld, dsc))



      }




    },

    error: function (jqXHR, status) {

    }
  });
}

function genFeatureSingle(id) {
  var ts = {
    "kv": {
      "id": id

    }
  }


  $.ajax({
    type: "POST",
    url: UrlQb + "api/post/zd/traininghub/getSystemFeatureList4Web",
    data: JSON.stringify(ts), // now data come in this function
    contentType: "application/json; charset=utf-8",
    crossDomain: true,
    dataType: "json",
    success: function (data, status, jqXHR) {
      var dat = data.tbl[0].r


      for (let index = 0; index < dat.length; index++) {
        var idSld = dat[index].id
        var imgSld = dat[index].logo
        var sctnm = dat[index].featureName
        var stat = dat[index].status
        var dsc = dat[index].featureDescription


        if (stat === "A") {

          $('#entries-skilss').empty();
          $('#entries-skilss')
            .append(addGenSectList(idSld, sctnm, imgSld, dsc))

        }

      }


    },

    error: function (jqXHR, status) {

    }
  });
}

function genCertificationBlock14() {

  $.ajax({
    type: "POST",
    url: UrlQb + "api/post/zd/traininghub/getCertificationGroupList4Web",
    data: JSON.stringify(), // now data come in this function
    contentType: "application/json; charset=utf-8",
    crossDomain: true,
    dataType: "json",
    success: function (data, status, jqXHR) {
      var dat = data.tbl[0].r

      $('#certificatie-block1').empty();
      $('#certificatie-block1').append($("<div>").addClass('dropMenuListCert'))

      for (let index = 0; index < dat.length; index++) {
        var idSld = dat[index].id
        var imgSld = dat[index].logo
        var orn = dat[index].orderNo


        var myArray = ['blue', 'red', 'orange', "green", 'purple', 'pink'];
        var rand = myArray[Math.floor(Math.random() * myArray.length)];



        $('#certificatie-block1')
          .append($("<div>").attr('id', idSld)
            .addClass('col-lg-4 col-md-6').attr('data-aos', 'fade-up').css('order', orn)
            .append($("<div>")
              .addClass('service-box service-box-list ' + rand)
              .append('<img src="' + UrlQb + 'api/get/zdfiles/traininghub/' + imgSld + '" alt="">')
            ))



      }


    },

    error: function (jqXHR, status) {

    }
  });
}
function genCertificationBlock14Single(id) {

  var ts = {
    "kv": {
      "id": id
    }
  }
  $.ajax({
    type: "POST",
    url: UrlQb + "api/post/zd/traininghub/getCertificationGroupList4Web",
    data: JSON.stringify(ts), // now data come in this function
    contentType: "application/json; charset=utf-8",
    crossDomain: true,
    dataType: "json",
    success: function (data, status, jqXHR) {
      var dat = data.tbl[0].r

     
     
      $('#parent-sertification').empty();

      for (let index = 0; index < dat.length; index++) {
        var idSld = dat[index].id
        var imgSld = dat[index].groupName
        var orn = dat[index].orderNo


        var myArray = ['blue', 'red', 'orange', "green", 'purple', 'pink'];
        var rand = myArray[Math.floor(Math.random() * myArray.length)];
     console.log(dat);


        $('#parent-sertification').append('<div id="'+idSld+'"> <a href="#" class="service-box-list" pid=' + idSld + ' class="read-more">'+imgSld+'</a></div>')



      }


    },

    error: function (jqXHR, status) {

    }
  });
}

function genTopicBlock14() {

  var ts = {
    "kv": {
      "code": "samdescription "
    }
  }
  $.ajax({
    type: "POST",
    url: UrlQb + "api/post/cl/traininghub/getTopicDescriptionByCode",
    data: JSON.stringify(ts), // now data come in this function
    contentType: "application/json; charset=utf-8",
    crossDomain: true,
    dataType: "json",
    success: function (data, status, jqXHR) {
      var dat = data.kv

  
        $("#topic-div-block-el").html(dat.topicBody);
      
  
       },

    error: function (jqXHR, status) {

    }
  });
}

$(document).on("click", "#event-list-back", function (e) {

  genEventsList2()

})

$(document).on("click", "#event-apply-btn", function (e) {
  var evntNm = $(this).parents(".testimonial-item").find("h3").text();
  var evntId = $(this).parents(".testimonial-item").parent().attr("id");

  $(".eventNameAplly").text("Event Name:" + evntNm);
  $(".eventNameAplly").attr("id", evntId);

  $("#applEventModal").modal("show");



})

$(document).on("click", "#send-request", function (e) {

  var nm = $("#recipient-name").val();
  var eml = $("#recipient-email").val();
  var nmbr = $("#recipient-number").val();
  var mesg = $("#recipient-message").val();
  var srnm = $("#recipient-surname").val();
  var id = $(".eventNameAplly").attr("id");


  if (nm.trim().length > 2 && eml.trim().length > 2 && nmbr.trim().length > 2 && mesg.trim().length > 2 && srnm.trim().length > 2) {

    sendRequestEventApply(nm, eml, srnm, mesg, id, nmbr);

  } else {

    alertBoxGenerate('Fill in all the fields!!!', "warning", "Error")

  }



})
$(document).on("click", ".service-box-list", function (e) {


  var id = $(this).parent().attr('id');
  $('#certificatie-block').hide();
  $('#certificatie-block1').empty();

  getCertiDescription(id);
  insertParam("certificateId", id)

})
$(document).on("click", "body", function () {


  // $(".dropMenuListCert").hide()

  ///  insertParam("certificateId", id)

})
$(document).on("click", "#sub_certification", function () {

  var id = $(this).attr('pid');

  insertParam("section-tab", "cert");
  genSertfifcationBlokLarge(id)
  insertParam("sub_cert", id)

})
$(document).on("click", "#back_certififcationlist", function () {

  var id = $(this).attr('pid');

  $('#certificatie-block').css("display", "none");
  $('#certificatie-block1').show();

  genCertificationBlock14();
  insertParam("point", "certificate");

})
$(document).on("click", "#training_dest_mini", function () {

  var id = $(this).attr('pid');
  insertParam("section-tab", "train");
  genSertfifcationBlokLarge(id);
  insertParam("sub_cert", id)

})
$(document).on("click", "#apply_dest", function () {

  var id = $(this).attr('pid');
  insertParam("section-tab", "apply");
  genSertfifcationBlokLarge(id);
  insertParam("sub_cert", id);

})
$(document).on("click", ".post-item", function () {

  var id = $(this).attr('id');
  $(".post-item").css("background", "white");
  $(this).css("background", "aliceblue");
  genSectionSingle(id)
  insertParam("sub_sect", id);
  $('html, body').animate({
    scrollTop: $('#entries-model').offset().top - 300
  }, 'fast');

})
$(document).on("click", ".post-item1", function () {

  var id = $(this).attr('id');
  $(".post-item1").css("background", "white");
  $(this).css("background", "aliceblue");

  genSectionSingle1(id)
  insertParam("sub_sect1", id)
  $('html, body').animate({
    scrollTop: $('#entries-model').offset().top - 300
  }, 'fast');
})
$(document).on("click", ".feature-item", function () {

  var id = $(this).attr('id');

  $(".feature-item").removeClass("active");
  $(this).addClass("active");

  genFeatureSingle(id)
  insertParam("sub_future", id)

})

function getGroupInside(id) {

  var ts = {
    "kv": {
      "fkCertificationGroupId": id

    }
  }

  $.ajax({
    type: "POST",
    url: UrlQb + "api/post/zd/traininghub/getCertificationList",
    data: JSON.stringify(ts), // now data come in this function
    contentType: "application/json; charset=utf-8",
    crossDomain: true,
    dataType: "json",
    success: function (data, status, jqXHR) {

      var dat = data.tbl[0].r

      $('#certificatie-block1').show();


      var blak = $("<div>").addClass("col-lg-3 col-md-3")
      for (let index = 0; index < dat.length; index++) {
        var idSld = dat[index].id

        var imgSld = dat[index].logo
        var order = dat[index].orderNo


        var myArray = ['blue', 'red', 'orange', "green", 'purple', 'pink'];
        var rand = myArray[Math.floor(Math.random() * myArray.length)];


        blak.append($("<div>").attr('id', idSld).css("order", order)
          .addClass('col-lg-12 col-md-12').attr('data-aos', 'fade-up').attr('data-aos-delay', (index + 100) * index)
          .append($("<div>")
            .addClass('service-box ' + rand)
            .append('<img src="' + UrlQb + 'api/get/zdfiles/traininghub/' + imgSld + '" alt="">')
            .append(' <a href="#" id="training_dest_mini" pid=' + idSld + ' class="read-more"><span>Training</span><i class="bi bi-arrow-right"></i> </a>')
            .append(' <a href="#" id="apply_dest" pid=' + idSld + ' class="read-more"><span>Apply</span><i class="bi bi-arrow-right"></i></a>')
            .append(' <a href="#" id="sub_certification" pid=' + idSld + ' class="read-more"><span>Read More</span> <i class="bi bi-arrow-right"></i></a>')
          ))



      }

      $('#certificatie-block1').append(blak)
    }
  })


}
function getSingleGruopShortInside(id) {

  var ts = {
    "kv": {
      "fkCertificationGroupId": id

    }
  }

  $.ajax({
    type: "POST",
    url: UrlQb + "api/post/zd/traininghub/getCertificationList",
    data: JSON.stringify(ts), // now data come in this function
    contentType: "application/json; charset=utf-8",
    crossDomain: true,
    dataType: "json",
    success: function (data, status, jqXHR) {

      var dat = data.tbl[0].r
      $('#other-sertification-sub').empty();

      var blak = $("<div>").addClass("col-lg-12 row col-md-12");
      console.log(dat);

      for (let index = 0; index < dat.length; index++) {
        var idSld = dat[index].id

        var imgSld = dat[index].certificationName
        var order = dat[index].orderNo
       
        var myArray = ['blue', 'red', 'orange', "green", 'purple', 'pink'];
        var rand = myArray[Math.floor(Math.random() * myArray.length)];


        blak.append(' <a href="#" id="sub_certification" pid=' + idSld + ' class="read-more">'+imgSld+'</a>')
          



      }

      $('#other-sertification-sub').append(blak)
    }
  })


}

function getSingleSerc(id) {

  var ts = {
    "kv": {
      "id": id,
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
      $('#certificatie-block1').hide();
      $('#certificatie-block').show();

      for (let index = 0; index < dat.length; index++) {
        var idSld = dat[index].id;
        var desct = dat[index].description;
        var lgo = dat[index].logo;
        var prtId = dat[index].parentId;
        var crtnm = dat[index].certificationName;
   
         
        $("#certification-image-single").attr("src", UrlQb + 'api/get/zdfiles/traininghub/' + lgo)
        $("#cert-name-single b").text(crtnm);
        $('#certificatie-block').attr("pid", idSld);
        $(".certifications-desct").html(desct);



       /*  getSingleGruopShortInside(prtId);
        genCertificationBlock14Single(prtId) */


      }


    }
  })


}
function getSingleBlockEventFullDesct(id) {

  var ts = {
    "kv": {
      "id1": id

    }
  }

  $.ajax({
    type: "POST",
    url: UrlQb + "api/post/cl/traininghub/getEventInfo",
    data: JSON.stringify(ts), // now data come in this function
    contentType: "application/json; charset=utf-8",
    crossDomain: true,
    dataType: "json",
    success: function (data, status, jqXHR) {
    

        var dat = data.kv;
    
     
          var header =dat.eventTitle;
          var fullDesc =dat.fullDesc;
      
          var fkId = dat.fkCertificationId;
          var header = dat.eventTitle;
          var lng = dat.eventLang;
          
          var hasApply = dat.hasApply;
          var applyUrl = dat.applyUrl;
          var fnlPrc =dat.finalPrice+" "+dat.priceUnit;
          var strtm = ": "+convertStDate(dat.startDate)/* +""+ convertStTime(dat[index].startTime) */
          var endtm = ": "+convertStDate(dat.endDate)/* +""+ convertStTime(dat[index].endTime) */
          var dl = lang.find(x => x.key === lng).value;
          getEventLogoUrl(id,header,dl,strtm,fkId,fullDesc,endtm,fnlPrc,hasApply,applyUrl);
          

    }
  })


}
function getEventLogoUrl(id,header,lng,strtm,fkId,fullDesc,endtm,fnlPrc,hasApply,applyUrl){
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
      $("#certificatie-block1").empty();
      var dat = data.tbl[0].r
        var logo = dat[0].logo
        var prtId = dat[0].parentId;
        $("#certificatie-block1").append($("<div>")
                                           .addClass("col-lg-3 col-md-3")
                                          .append($("<img>")
                                          .attr("width","100%")
                                          .attr("src",UrlQb + 'api/get/zdfiles/traininghub/' + logo))
                                         
                                          .append('<h6 class="pt-5"> <b>'+header+'</b></h6>')
                                          .append('<p>Language: '+lng+'</p>')
                                          .append('<p>Start Time: '+strtm+'</p>')
                                          .append('<p>End Time: '+endtm+'</p>')
                                          .append('<p>Price: <span style="color:red;font-weight:bold;">'+fnlPrc+'</span></p>')
                                          .append('<a class="getstarted scrollto" href="index-main.html?&point=certificate&certificateId='+prtId+'&sub_cert='+fkId+'#">Certification info <i class="bi bi-arrow-right"></i> </a><br>')
                                         .append($("<span>").addClass("appLyTrigger"))
                                        )
                                .append($("<div>")
                                           .addClass("ps-5 col-lg-9 col-md-9")
                                           .append("<div class='col-lg-12 col-md-12'>"+fullDesc+"</div>"));


                                        
     if(hasApply==1){
      
      if(!applyUrl==""){
      $(".appLyTrigger").append('<a class="getstarted scrollto" href="'+applyUrl+'">Apply<i class="bi bi-arrow-right"></i> </a><br>');
    }
    else{
       $(".appLyTrigger").append('<a class="getstarted scrollto" id="event-apply-btn" href="#">Apply<i class="bi bi-arrow-right"></i> </a>')
     }
    }
    }
  })
}

function genSertfifcationBlokLarge(id) {
  getSingleTraining(id);
  getSingleEventListApply(id);
  getSingleSerc(id);
  var alte = getUrlParameter("section-tab");



  if (alte === 'train') {
    $(".train-desct").click();


  }
  if (alte === 'cert') {
    $(".cert-desct").click();


  }
  if (alte === 'apply') {
    $(".apply-cert").click();


  }
}

function getSingleTraining(id) {

  var ts = {
    "kv": {
      "id": id

    }
  }

  $.ajax({
    type: "POST",
    url: UrlQb + "api/post/zd/traininghub/getCertificationTrainingInfo",
    data: JSON.stringify(ts), // now data come in this function
    contentType: "application/json; charset=utf-8",
    crossDomain: true,
    dataType: "json",
    success: function (data, status, jqXHR) {

      var dat = data.tbl[0].r


      for (let index = 0; index < dat.length; index++) {
        var idSld = dat[index].id;
        var crtnm = dat[index].trainingDescription;


        $('.training-full-desct').append(crtnm).attr("id", idSld);


      }


    }
  })


}

function getSingleEventListApply(id) {

  var ts = {
    "kv": {
      "fkCertificationId": id,
      "apiId":'21071110022302166113'

    }
  }
  

  $.ajax({
    type: "POST",
    url: UrlQb + "api/post/cl/traininghub/getEventList4Web",
    data: JSON.stringify(ts), // now data come in this function
    contentType: "application/json; charset=utf-8",
    crossDomain: true,
    dataType: "json",
    success: function (data, status, jqXHR) {

      var dat = data.tbl[0].r

      $('#cert-event-list').empty()

      for (let index = 0; index < dat.length; index++) {
    var id = dat[index].id
        var fkId = dat[index].fkCertificationId
        var header = dat[index].eventTitle
        var lng = dat[index].eventLang
        var stst = dat[index].eventStatus
        var endr = dat[index].disCount
        var prc = dat[index].price+" "+dat[index].currency
        var fnlPrc =dat[index].finalPrice+" "+dat[index].currency
        var stst = dat[index].eventStatus
        var strtm = ": "+convertStDate(dat[index].startDate)/* +""+ convertStTime(dat[index].startTime) */
        var endtm = ": "+convertStDate(dat[index].endDate)/* +""+ convertStTime(dat[index].endTime) */

        var dl = lang.find(x => x.key === lng).value;


        if (stst === "A") {

          getCertificationEventList(fkId, id, header, dl, strtm, endtm,endr,prc,fnlPrc)
        }




      }

    }
  })


}

function sendRequestEventApply(nm, eml, srnm, msg, id, nmbr) {
  var ts = {

    "kv": {
      "applierSurname": srnm,
      "fkEventsId": id,
      "applierEmail": eml,
      "applierMessage": msg,
      "applierMobile": nmbr,
      "applierName": nm
    }

  }

  $.ajax({
    type: "POST",
    url: UrlQb + "api/post/cl/traininghub/createApplyForEvent",
    data: JSON.stringify(ts), // now data come in this function
    contentType: "application/json; charset=utf-8",
    crossDomain: true,
    dataType: "json",
    success: function (data, status, jqXHR) {


      $("#recipient-name").val();
      $("#recipient-email").val();
      $("#recipient-number").val();
      $("#recipient-message").val();
      $("#recipient-surname").val();
      $("#applEventModal").modal("hide");
      alertBoxGenerate('Send Request Succesfuly', "success", "Notification")


    }
  })


}
function genTutorialListBlock(id,logo,header,lng,strtm,endtm,certId){
  return  ` <div id='${id}' class="swiper-slide">
  <div class="testimonial-item">
  <div class="profile mt-auto">
  <img src="${UrlQb}api/get/zdfiles/traininghub/${logo}" class="testimonial-img" alt="">
  <h6 class="pt-5"><b> ${header}</b></h6>
  <h4>Start Time ${strtm} <br> End Time ${endtm}</h4>
</div>
    <p>
    Language ${lng}
    </p>

    <a class="getstarted scrollto" id='event-apply-btn' href="">Apply</a>
    <br>
    <a class="getstarted scrollto" href="index-main.html?&point=certificate&sub_cert=${certId}&section-tab=train">Training</a>
    <br>
    <a class="getstarted scrollto" href="index-main.html?&point=certificate&sub_cert=${certId}&section-tab=cert">Certification</a>
        
  </div>
</div>`
}
function insertParam(name, value) {
  const params = new URLSearchParams(window.location.search);
  params.set(name, value);
  window.history.replaceState({}, "", decodeURIComponent(`${window.location.pathname}?${params}`));
}