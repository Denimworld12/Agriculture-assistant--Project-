$(window).scroll(function () {
  if ($('.about-list').hasClass('about-page') == false) {
    if ($(window).scrollTop() >= 250 && $(window).scrollTop() <= 4700) {

      $('.about-list').addClass('fixed');

    }
    else {

      $('.about-list').removeClass('fixed');

    }
  }
  else if ($('.about-list').hasClass('about-page') == true) {
    if ($(window).scrollTop() >= 250 && $(window).scrollTop() <= 3500) {

      $('.about-list').addClass('fixed');

    }
    else {

      $('.about-list').removeClass('fixed');

    }
  }

  if ($('.about-list').hasClass('glossary-page') == true) {
    if ($(window).scrollTop() >= 250 && $(window).scrollTop() <= 3400) {

      $('.about-list').addClass('fixed');

    }
    else {

      $('.about-list').removeClass('fixed');

    }
  }

  // Sticky dropdown for sidemenus for mobile devices
  if (typeof $(".sticky-dropdown .btn-sisfs")[0] != "undefined") {
    // $(".sticky-dropdown .btn-sisfs")[0].innerText = "Section Menu";
    // $(".sticky-dropdown .btn-sisfs")[0].innerText = "Submenu List";
    if ($(window).scrollTop() >= 300) {
      let stickydropdowntext = $(".sticky-dropdown .dropdown-menu li a.active").text();
      // $(".sticky-dropdown .btn-sisfs")[0].innerText = stickydropdowntext;
      if ($(".sticky-dropdown .btn-sisfs").length && $(".sticky-dropdown .btn-faq").length) {
        $(".sticky-dropdown .btn-sisfs")[0].innerText = stickydropdowntext;
        $(".sticky-dropdown .btn-faq")[0].innerText = stickydropdowntext;
      }
    }
  }


});

$(document).ready(function () {
  $('#search').keyup(function () {
    var input, filter, found, table, tr, td, i, j;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("test");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td");
      for (j = 0; j < td.length; j++) {
        if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
          found = true;
        }
      }
      if (found) {
        tr[i].style.display = "";
        found = false;
      } else {
        tr[i].style.display = "none";
      }
    }

  });
})

function getSecondPart(str) {
  return str.split('-')[1];
}
$(document).ready(function () {

  jQuery('.hide-icon').click(function (e) {
    jQuery('.collapse').collapse('hide');
  });
  jQuery('.expand-icon').click(function (e) {
    jQuery('.collapse').collapse('hide');
  });
  // $('.nav li').click(function (e) {

  //   $('.nav li').removeClass('active');

  //   var $this = $(this);
  //   if (!$this.hasClass('active')) {
  //     $this.addClass('active');
  //   }
  // });

  //sidebar active class toggle
  // $('.about-list>li').on('mouseover', 'a', function () {
  //   $('.about-list>li>a.active').removeClass('active');
  //   $(this).addClass('active');
  // });

  // show icon to show answer
  // $('.expand-icon').click(function () {
  //   var id = $(this).attr('id');
  //   id_no = getSecondPart(id);
  //   if ($('#show-' + id_no).css('display') == 'none') {
  //     $('#show-' + id_no).css("display", "block");
  //     $('#q-' + id_no).css('color', '#E26640');

  //     $(this).css("display", "none")
  //   }
  //   else {
  //     $('#show-' + id_no).css("display", "none");
  //     $('#q-' + id_no).css('color', '#333333');
  //     $(this).css("display", "block")
  //   }
  // });
  // hide icon to collapse answer
  // $('.hide-icon').click(function () {
  //   var id = $(this).attr('id');
  //   id_no = getSecondPart(id);
  //   if ($('#hide-' + id_no).css('display') == 'none') {
  //     $('#hide-' + id_no).css("display", "block");
  //     $('#q-' + id_no).css('color', '#333333');
  //     $(this).css("display", "none")
  //   }
  //   else {
  //     $('#hide-' + id_no).css("display", "none");

  //     $('#q-' + id_no).css('color', '#E26640');
  //     $(this).css("display", "block")
  //   }
  // });

  // Sticky dropdown for sidemenus for mobile devices
  $(".sticky-dropdown .dropdown-menu li a").on('click', function () {
    $(".btn:first-child").text($(this).text());
    $(".btn:first-child").val($(this).text());
    $('.dropdown-menu').removeClass('show');
  });

  // $(window).on('scroll', function () {
  //   $(".sticky-dropdown .btn-sisfs")[0].innerText = "Submenu List";
  //   if ($(window).scrollTop() >= 300) {
  //     let stickydropdowntext = $(".sticky-dropdown .dropdown-menu li a.active").text();
  //     $(".sticky-dropdown .btn-sisfs")[0].innerText = stickydropdowntext;
  //   }
  // });

  //  Active class on click
  // $('.navbar-nav .nav-link').on('click', function () {
  //   $('.navbar-nav .nav-link').removeClass('active');
  //   $(this).addClass('active');
  // });

  // Main Navigation menu active class
  $('.navbar-nav .nav-link').on('click', function () {
    // $('.navbar-nav .nav-link').removeClass('active');
    $(".nav-item .nav-link").removeClass("active");
    $(this).addClass("active");
  });

  $('.navbar-nav>li>a').on('click', function () {
    $('#navbarCollapse').collapse('hide');
    $('#navbar-close').addClass("hidden")
    $('#navbar-hamburger').removeClass("hidden")
  });

  // OffCanvas script for sidebar for login screen
  $('[data-toggle="offcanvas"]').on('click', function () {
    $('.offcanvas-collapse').toggleClass('open');
    document.getElementById("overlay").style.display = "block";
  });

  $('.offcanvas-collapse .close').click(function () {
    $('.offcanvas-collapse').toggleClass('open');
    document.getElementById("overlay").style.display = "none";
  });

  // Change hambuger menu when open in small screens
  $('#ChangeToggle').click(function () {
    // $('#navbar-hamburger').toggleClass('hidden');
    // $('#navbar-close').toggleClass('hidden');
  });

  $('#navbar-hamburger').click(function () {
    $(this).addClass('hidden');
    $('#navbar-close').removeClass('hidden');
  });

  $('#navbar-close button').click(function () {
    $("#navbar-close").addClass('hidden');
    $('#navbar-hamburger').removeClass('hidden');
  });




  // Example starter JavaScript for disabling form submissions if there are invalid fields
  (function () {
    'use strict';
    window.addEventListener('load', function () {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation');
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function (form) {
        form.addEventListener('submit', function (event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);
  })();

});