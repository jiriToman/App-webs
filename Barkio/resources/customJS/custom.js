// outext:min.js
// adding css changes to the parent class and switching images on the collapsed menu
var mopen = false;
var useros;
var devicesize;
var currenturl;
var redown;
var utmSource = "utmSource";
var utmMedium = "utmMedium";
var utmCampaign = "utmCampaign";
var newPlayUtm =
  "https://play.google.com/store/apps/details?id=com.tappytaps.android.barkio&referrer=utm_source%3D";
$("#menubtn").on({
  click: function () {
    var adress = $("#menuicon").attr("src");

    if (adress === "./images/menu.svg" || adress === "/images/menu.svg") {
      $("#menuicon").attr("src", "./images/menu-close.svg");
      // alert('adress is:'+ adress);
      // $(".navbar").css("padding-bottom", "0px");
      setTimeout(function () {
        mopen = true;
      }, 300);
    } else {
      $("#menuicon").attr("src", "./images/menu.svg");
      // alert('adress is:'+ adress);
      // $(".navbar").css("padding-bottom", "0px");
      setTimeout(function () {
        mopen = false;
      }, 300);
    }
  },
});

$("body").on({
  click: function () {
    if (mopen === true) {
      var adress = $("#menuicon").attr("src");
      if (adress === "./images/menu-close.svg" && mopen === true) {
        $("#menubtn").click(); //pokud se po otevreni menu klikne kamkoliv menu se zavre
      }
    }
  },
});
// funkce pro zmenu option selectu ve vybirani jazyka
function SelectElement(vvvv) {
  $("#lang").val("/" + vvvv);
}
var option;
$(document).ready(function () {
  if (document.documentElement.lang == "de") {
    // option = "de";
    $("#de").addClass("lng-a");
  } else if (document.documentElement.lang == "cs") {
    // option = "cs";
    $("#cs").addClass("lng-a");
  } else {
    $("#en").addClass("lng-a");
    // option = "en";
  }
  SelectElement(option);
});

// detekce os
function getOS() {
  var userAgent = window.navigator.userAgent,
    platform = window.navigator.platform,
    macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"],
    windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"],
    iosPlatforms = ["iPhone", "iPad", "iPod"],
    os = null;

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = "Mac OS";
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = "iOS";
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = "Windows";
  } else if (/Android/.test(userAgent)) {
    os = "Android";
  } else if (!os && /Linux/.test(platform)) {
    os = "Linux";
  }

  return os;
}
// uprava css podle velikosti zarizeni a detekovaneho os

$(document).ready(function () {
  var sdetect = $("#testdiv").css("background-color");

  if (sdetect == "#ffffff" || sdetect == "rgb(255, 255, 255)") {
    devicesize = "desktop";
  } else {
    devicesize = "mobile";
  }
  console.log("devicesize=" + devicesize);
  useros = getOS();
  console.log("useros=" + useros);

  // Zobrazí prvky podle mobilni platformy, pokud je platforma cokoliv jiného zobrazí se pouze Google Play
  if (useros === "Android") {
    $(".display-android").removeClass("hidden");
  } else if (useros === "iOS") {
    $(".display-ios").removeClass("hidden");
  } else {
    $(".display-ios").removeClass("hidden");
  }

  // Zobrazí prvky podle desktopové platformy, pokud je platforma cokoliv jiného zobrazí se pouze Windows
  if (useros === "Mac OS") {
    $(".display-macos").removeClass("hidden");
  } else if (useros === "Windows") {
    $(".display-windows").removeClass("hidden");
  } else if (useros === "Linux") {
    $(".display-linux").removeClass("hidden");
  } else {
    $(".display-windows").removeClass("hidden");
  }

  /*     if (useros === "Mac OS") {
            $(".hian").removeClass("hidden");
            $("#macbtn").removeClass("hidden");
            $(".hios").removeClass("hidden");
            $(".win").addClass("hidden");
            $(".mac").removeClass("hidden");
            $(".macdown").removeClass("hidden");
    
            if (devicesize === "mobile") {
                // osdtranit pro ostrou---------------------------!!!
                $(".hian").addClass("hidden");
                $("#macbtn").addClass("hidden");
    
            }
        } else if (useros === "Windows") {
            $(".hian").removeClass("hidden");
            $("#winbtn").removeClass("hidden");
            $(".hios").removeClass("hidden");
            $(".windown").removeClass("hidden");
            //  pridat reorder pro desktop platform modal - default
    
        } else if (useros === "Linux") {
            $(".hian").removeClass("hidden");
            $("#linxbtn").removeClass("hidden");
            $(".hios").removeClass("hidden");
            $(".lnxdown").removeClass("hidden");
            $(".win").addClass("hidden");
            $(".lnx").removeClass("hidden");
    
        } else if (useros === "Android") {
            $(".hian").removeClass("hidden");
    
        } else if (useros === "iOS") {
            $(".hios").removeClass("hidden");
    
        } else if (devicesize === "desktop") {
            // windows
            $(".hian").removeClass("hidden");
            $(".hios").removeClass("hidden");
        } else {
            //android
            $(".hian").removeClass("hidden");
        } */
});

// download and then redirect pro download.hbs nakonec jsme pouzili jiny pristup
// function DownloadAndRedirect(n) {
//     useros = getOS();
//     if (useros === "Mac OS") {
//         link = document.getElementById("maclink").href;
//         rlink = "mac";
//         linkII = document.getElementById("winlink").href;
//         rlinkII = "win";
//         linkIII = document.getElementById("lnxlink").href;
//         rlinkIII = "lnx";
//     } else if (useros === "Windows") {
//         link = document.getElementById("winlink").href;
//         rlink = "win";
//         linkII = document.getElementById("maclink").href;
//         rlinkII = "mac";
//         linkIII = document.getElementById("lnxlink").href;
//         rlinkIII = "lnx";
//     } else if (useros === "Windows") {
//         link = document.getElementById("lnxlink").href;
//         rlink = "lnx";
//         linkII = document.getElementById("winlink").href;
//         rlinkII = "win";
//         linkIII = document.getElementById("maclink").href;
//         rlinkIII = "mac";
//     }

//     if (n === 1) {
//         var DownloadURL = link;
//         relink = rlink;
//     } else if (n === 2) {
//         var DownloadURL = linkII;
//         relink = rlinkII;
//     } else if (n === 3) {
//         var DownloadURL = linkIII;
//         relink = rlinkIII;
//     }
//     var RedirectURL = "/downloadthx/down/" + relink;
//     var RedirectPauseSeconds = 3;
//     location.href = DownloadURL;
//     setTimeout("DoTheRedirect('" + RedirectURL + "')", parseInt(RedirectPauseSeconds * 1000));
// }
// function DoTheRedirect(url) { window.location = url; }
// URL of the page

function check_cookie_name(name) {
  var match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  if (match) {
    return match[2];
  } else {
    console.log("--something went wrong with reading cookies---");
  }
}

function setUtmCookies() {
  utmSource = check_cookie_name(utmSource);
  // console.log('utmSource='+utmSource);
  // utmCampaign= check_cookie_name(utmCampaign);
  // console.log('utmCampaign='+utmCampaign);
  // utmMedium= check_cookie_name(utmMedium);
  // console.log('utmMedium='+utmMedium);
}

function generateUtmUrl(link, location, source) {
  switch (link) {
    case "GPlay":
      newPlayUtm = newPlayUtm + source + "%26utm_campaign%3D" + location;
      break;
    default:
      return null;
  }
}
function changeLink(id, url) {
  var link = document.getElementById(id, link);
  link.setAttribute("href", url);
}

$(document).ready(function () {
  currenturl = window.location.href;
  console.log("currenturl" + currenturl);
  currentpathname = window.location.pathname;
  console.log("pathname " + currentpathname);

  if (currentpathname.indexOf("/download-thanks/win") > -1) {
    $(".windown").removeClass("hidden");
    // location.href = document.getElementById("download-windows").href;
    //pouzito kliknuti na download link protoze redirect na link pusobil potize v loadu stranky[napr se nenacetla favicona]
    document.getElementById("download-windows").click();
  } else if (currentpathname.indexOf("/download-thanks/mac") > -1) {
    $(".macdown").removeClass("hidden");
    document.getElementById("download-macos").click();
  } else if (currentpathname.indexOf("/download-thanks/lnx") > -1) {
    $(".lnxdown").removeClass("hidden");

    document.getElementById("download-linux").click();
  } else if (currentpathname === "/download-thanks" > -1) {
    $(".alldown").removeClass("hidden");
  }
  // vzrorovy link https://play.google.com/store/apps/details?id=com.tappytaps.android.barkio&referrer=utm_source%3DSepAnxiety%26utm_medium%3DBarkioWeb
  if (
    currenturl.indexOf("https://barkio.com/download/") > -1 ||
    currenturl.indexOf("http://barkio.com/download/") > -1 ||
    currenturl.indexOf("http://localhost:3000/download/") > -1 ||
    currenturl === "http://localhost:3000/download" ||
    currenturl === "http://barkio.com/download" ||
    currenturl === "https://barkio.com/download"
  ) {
    setUtmCookies();
    let location = "BarkioDownloadPage";
    var source;
    if (utmSource === "separation_anxiety_web") {
      source = "SepAnxiety";
      generateUtmUrl("GPlay", location, source);
      changeLink("download-google-play", newPlayUtm);
    } else if (utmSource === "web_separacni_uzkosti") {
      source = "SepUzkost";
      generateUtmUrl("GPlay", location, source);
      changeLink("download-google-play", newPlayUtm);
    }
  }
  if (
    currenturl.indexOf("https://barkio.com/?utm_source") > -1 ||
    currenturl.indexOf("http://barkio.com/cs?utm_source") > -1 ||
    currenturl.indexOf("https://barkio.com/cs?utm_source") > -1 ||
    currenturl.indexOf("http://barkio.com/?utm_source") > -1 ||
    currenturl.indexOf("http://localhost:3000/?utm_source") > -1 ||
    currenturl.indexOf("http://localhost:3000/cs?utm_source") > -1
  ) {
    setUtmCookies();
    let location = "BarkioWeb";
    var source;
    if (utmSource === "separation_anxiety_web") {
      source = "SepAnxiety";
      generateUtmUrl("GPlay", location, source);
      changeLink("mobile-menu-google-play", newPlayUtm);
      changeLink("mobile-main-google-play", newPlayUtm);
      changeLink("mobile-modal-google-play", newPlayUtm);
      changeLink("mobile-banner-google-play", newPlayUtm);
      changeLink("mobile-footer-google-play", newPlayUtm);
    } else if (utmSource === "web_separacni_uzkosti") {
      source = "SepUzkost";
      generateUtmUrl("GPlay", location, source);
      changeLink("mobile-menu-google-play", newPlayUtm);
      changeLink("mobile-main-google-play", newPlayUtm);
      changeLink("mobile-modal-google-play", newPlayUtm);
      changeLink("mobile-banner-google-play", newPlayUtm);
      changeLink("mobile-footer-google-play", newPlayUtm);
    }
  }
});

// scroll
// var shown = false;
// $(window).scroll(function () {
//     var hT = $('#scroll-to').offset().top,
//         hH = $('#scroll-to').outerHeight(),
//         wH = $(window).height(),
//         wS = $(this).scrollTop();

//     //  console.log((hT+hH-wH) , wS , shown);
//     if (wS > (hT + hH - wH) && shown === false) {
//         $('#menu-try').css({ "display": "inline-block" });

//         setTimeout(function () { $('#menu-try').css({ "opacity": "1", "transitiion": "all 0.3s" }); }, 1);

//         shown = true;
//     }
//     if (wS < (hT + hH - wH - 20) && shown === true) {

//         $('#menu-try').css({ "opacity": "0", "transitiion": "all 0.3s" });
//         setTimeout(function () { $('#menu-try').css({ "display": "none" }); }, 300);
//         shown = false;
//     }
// });
// form SENDY
$(document).ready(function () {
  let formSent = false;
  $("form").on("submit", function (e) {
    e.preventDefault();
    let target = $(this).attr("action");
    let email = $(this).find("input[type=email]").val();
    let source = $(this).find("input[name=Source]").val();
    let list = $(this).find("input[name=list]").val();
    let Formdata = "email=" + email + "&list=" + list + "&Source=" + source; //POKUD JINY FORM zmenit list !!!
    let botCheck = Boolean($(this).find("input[name=hp]").val());
    let mailCheck = /\S+@\S+\.\S+/.test(
      $(this).find("input[type=email]").val()
    );
    if (botCheck == false) {
      // show   botSubmissionErrorMessage: 'This doesn\'t look like a human submission.', false neni bot true je doplnit ostatni podminky
      if (mailCheck == true) {
        $.ajax({
          url: target,
          // url: "https://sendy.tappytaps.com/subscribe",
          type: "POST",
          data: Formdata,
          cache: false,
          success: function (html) {
            let success = $("#form-success-msg").html();
            formSent = true;
            $(".datain").addClass("hidden");
            $(".formmsg").html(success);
            $(".formmsg").addClass("join-banner");
            $(".formmsg").removeClass("hidden");
          },
          error: function (jqXHR, status, statusText) {
            let errormsg = $("#form-error-msg").html();
            // console.log('error message '+jqXHR.statusText); console.log('sending failed');
            $(".formmsg").html(errormsg);
            $(".formmsg").css("color", "#ff4f41");
            $(".formmsg").removeClass("hidden");
          },
        });
      } else if (mailCheck == false) {
        let emailmsg = $("#form-email-msg").html();
        $(".formmsg").html(emailmsg);
        $(".formmsg").removeClass("hidden");
      }
    }
  });
  // reset zobrazeni succes msg ve formu po zavreni modalu
  function clearModal() {
    if (formSent == true) {
      $(".datain").removeClass("hidden");
      $(".formmsg").addClass("hidden");
      $(".formmsg").removeClass("join-banner");
    }
  }
  //triggery pro reset
  $("#modal").on("hidden.bs.modal", clearModal);
  $("#modal-lg").on("hidden.bs.modal", clearModal);
  $("#modal-comingsoon-ios").on("hidden.bs.modal", clearModal);
});
// UTM tracking po redirectu

// $(document).ready(function () {
//     $.get("/getutm", function (data) {
//         utm = data.utm;
//         utm_source = data.utm_source;
//         utm_medium = data.utm_medium;
//         utm_campaign = data.utm_campaign;
//         console.log('utm ' + utm + ' source ' + utm_source + ' medium ' + utm_medium + ' campaign ' + utm_campaign)
//         if (utm == true) {
//             // console.log('utmpush start');
//             // ga('set', 'campaignSource', utm_source);
//             // ga('set', 'campaignMedium', utm_medium);
//             // ga('set', 'campaignName', utm_campaign);
//             // console.log('utmpush end');
//             function gtag() { dataLayer.push(arguments); }
//             gtag('js', new Date());

//             gtag('set', {
//                 'campaignName': utm_campaign,
//                 'campaignMedium': utm_medium,
//                 'campaignSource': utm_source
//             });

//             gtag('config', 'UA-133487-26');
//         }
//     });
// });
$(document).ready(function () {
  if (window.location.href == "https://barkio.com/en") {
    $("link[rel='canonical']").attr({ href: "https://barkio.com/en" });
    console.log("canonical " + $("link[rel='canonical']").attr("href"));
  }
});
