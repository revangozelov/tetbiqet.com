var fkUserCode = localStorage.getItem("UsId");
var lang = [{
    key: "en",
    value: "English"
},
{
    key: "az",
    value: "Azeribaijan"
},
{
    key: "ru",
    value: "Russian"
},

]
var UrlQb = "https://app.sourcedagile.com/";
$(document).on("click", '#sign_in_btn', function () {
    var userNm = $(this).parents('.modal-content').find('#exampleInputEmail1').val();
    var userPass = $(this).parents('.modal-content').find('#exampleInputPassword1').val();
    getUserLogin(userNm, userPass);


})
var ellepse = "notID"
var idNotf = 564564646464646464
function alertBoxGenerate(text, type, nov) {

    var box = `<div id="${ellepse + idNotf}" class="alert ${type}">
	<span class='alert-close' onclick="this.parentElement.style.display='none';">&times;</span>
	<b>${nov}</b><br>
<ul><li>

${text}
</li>

</ul></div>`


    $('.alert_box_inside').append(box);

    setTimeout(() => {
        $('#' + ellepse + idNotf).remove();
    }, 5000);
    idNotf++
}
function deTimeSplit(dt) {
    var arr = dt.slice(0, 4);
    var arr1 = dt.slice(4, 6);
    var arr2 = dt.slice(6, 8);

    var fns = arr + "-" + arr1 + '-' + arr2;

    return fns
}

function reDeTimeSplit(dt) {
    var arr = dt.slice(0, 4);
    var arr1 = dt.slice(5, 7);
    var arr2 = dt.slice(8, 10);

    var fns = arr + "" + arr1 + '' + arr2;

    return fns
}
function getUserLogin(usNm, pass) {

    let datUs = {
        "kv": {
            "email": usNm,
            "password": pass


        }
    }
    $.ajax({
        type: "POST",
        url: UrlQb + "api/post/cl/traininghub/loginUser",
        data: JSON.stringify(datUs), // now data come in this function
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        dataType: "json",
        success: function (data, status, jqXHR) {


            var dat = data.kv;
            try {
                var err = data.err[0]['code'];

                $('#errorMessage').text(err);
                return

            } catch (err) {
                localStorage.setItem('UsId', dat.fkUserId);

                $('#loginModalPage').modal("toggle");

                window.location.reload();
            }






        },

        error: function (jqXHR, status) {

        }
    });
}


function activateRegstrPage(text, type) {

    return `  <div class="container "><div style="margin-top:170px" class="alert alert-${type}" role="alert">
    ${text}
  </div></div>
    `
}

function activProfileUserId(id) {

    var ts = {
        "kv": {
            "id": id
        }
    }
    $.ajax({
        type: "POST",
        url: UrlQb + "api/post/cl/traininghub/activateUser",
        data: JSON.stringify(ts), // now data come in this function
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        dataType: "json",
        success: function (data, status, jqXHR) {


            try {
                var dat = data.err[0]
                $('#main').html(activateRegstrPage(dat.val, "warning"));
            } catch (error) {
                $('#main').html(activateRegstrPage("Your registration has been completed successfully", "success"));
            }





        }
    })
}

$(document).on('click', '#changePass-UserREg', function () {


    var oldps = $('#exampleInputPasswordOld').val();
    var newps = $('#exampleInputPasswordNew').val();
    var cnewps = $('#exampleInputPasswordReNew').val();

    if (newps.trim().length > 0 && cnewps.trim().length > 0) {
        if (newps.trim().length > 5) {

            if (newps === cnewps) {


                updatePass(fkUserCode, oldps, newps, cnewps);
            } else {
                alertBoxGenerate("Again password incorrect", "warning", "error");
            }

        } else {
            alertBoxGenerate("Password short", "warning", "error");
        }
    } else {
        alertBoxGenerate('Fill in all the fields!!!', "warning", "Error")
    }





})

function updatePass(id, oldps, newps, cnewps) {

    var prop = {
        "kv": {
            "fkUserId": id,
            "oldPassword": oldps,
            "newPassword": newps,
            "confirmPassword": cnewps
        }
    }
    $.ajax({
        type: "POST",
        url: UrlQb + "api/post/cl/traininghub/updateActiveUserPassword4Web",
        data: JSON.stringify(prop), // now data come in this function
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        dataType: "json",
        success: function (data, status, jqXHR) {

            try {
                var err = data.err[0];

                alertBoxGenerate(err.code, "warning", "error");

            } catch {
                $('#changePasswordModal').modal("toggle");
                alertBoxGenerate("Changes Saved", "success", "Notification");
            }


        },

        error: function (jqXHR, status) {
            // error handler

            alert('fail' + status.code);
        }
    });
}
$(document).on('click', '#enter-forgot-menu', function () {
    var prt = $(this).parents('.modal-dialog');


    prt.find('.modeOn1').toggle();
    prt.find('.modeOn2').toggle();
    prt.find('.modalOnblock2').toggle();
    prt.find('.modalOnBlock1').toggle();


})
$(document).on('click', '#exit-forgot-menu', function () {
    var prt = $(this).parents('.modal-dialog');


    prt.find('.modeOn1').toggle();
    prt.find('.modeOn2').toggle();
    prt.find('.modalOnblock2').toggle();
    prt.find('.modalOnBlock1').toggle();


})
$(document).on('click', '#submit-email-forgot', function () {
    var val = $(this).parents('.modal-dialog').find('#forgotEmailİn').val();

    if (val.trim().length > 6) {
        forgotPassApi(val);
    } else {
        alertBoxGenerate("Email incorrect", "warning", "error");
    }

})


function forgotPassApi(ml) {
    let dtset = {
        "kv": {
            "email": ml

        }
    }
    $.ajax({
        type: "POST",
        url: UrlQb + "api/post/cl/traininghub/forgotPassword4Web",
        data: JSON.stringify(dtset), // now data come in this function
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        dataType: "json",
        success: function (data) {


            try {
                var val = data.err[0]['val'];
                alertBoxGenerate(val, 'warning', 'Wrong Operation');
            } catch (error) {
                var val = data.kv.msg;
                alertBoxGenerate(val, 'success', 'Notification');
                $("#loginModalPage").modal("hide");

            }
        },

        error: function (jqXHR, status) {
            // error handler

            alert('fail' + status.code);
        }
    });
}
$(".cstmtab .nav ul li").click(function () {
    $(this)
        .addClass("active")
        .siblings()
        .removeClass("active");

    let vale = $(this).val()
    //tabs(vale);

});
let tab = document.querySelectorAll(".tab");

function tabs(panelIndex) {
    tab.forEach(function (node) {
        node.style.display = "none";
    });
    $(tab[panelIndex]).css('display', 'block');

}
tabs(0);

$(document).on("click", "#login-modal-btn", function (e) {

    $("#loginModalPage").modal("show");



})

//user register send api
function resetFlud(email) {

    $('#name-f').val();

    $('#name-l').val();
    $('#email').val();
    $('#tel').val();
    $('#pass').val();
    $('#pass2').val();
    $('#Date').val();
    $('#number-index-code').val();



    $('.visible_cts_block').css('visibility', 'hidden');

    $('.visible_cts_block').before('<div class="alert alert-success" role="alert">Qeydiyyat uğurla başa çatmışdır.Zəhmət olmasa ' + email + ' adresini yoxlayın</div>');

}

function setUserInfoDataBase() {

    var nm = $('#name-f').val();
    var surnm = $('#name-l').val();
    var eml = $('#email').val();
    var numb = $('#tel').val();
    var pass = $('#pass').val();
    var repass = $('#pass2').val();
    var date = $('#Date').val();
    var codeCn = $('#number-index-code').val();


    let objectUser = {
        "kv": {
            "name": nm,
            "surname": surnm,
            "email": eml,
            "mobile": "(+" + codeCn + ")" + numb,
            "password": pass,
            "confirmPassword": repass,
            "birthDate": reDeTimeSplit(date)
        }

    }

    if (nm && surnm && eml && numb.trim().length > 3) {
        if (pass.trim().length > 3) {

            if (pass == repass) {


                $.ajax({
                    type: "POST",
                    url: UrlQb + "api/post/cl/traininghub/registerNewUser",
                    data: JSON.stringify(objectUser), // now data come in this function
                    contentType: "application/json; charset=utf-8",
                    crossDomain: true,
                    dataType: "json",
                    success: function (data, status, jqXHR) {


                        try {

                            alertBoxGenerate(data.err[0]['val'], 'warning', 'Error')
                            data.err[0]['val'];
                        } catch (error) {
                            resetFlud(eml);
                        }

                        alertBoxGenerate("Registration succesfully completed. For activation your account please check your email.", 'success', "Notification")
                    },

                    error: function (jqXHR, status) {
                        // error handler

                        alert('fail' + status.code);
                    }
                });
            } else {

                alertBoxGenerate('Duplicate Password Not Recorded Correctly', "warning", "Error")

            }

        } else {

            alertBoxGenerate('Password short', "warning", "Error")
        }


    } else {

        alertBoxGenerate('Fill in all the fields!!!', "warning", "Error")

    }

}


$(document).on('click', '#submit_regstr_qb', function () {

    setUserInfoDataBase()
})

getUserInfoProfile();

function getUserInfoProfile() { // pass your data in method


    userId = localStorage.getItem('UsId');

    if (userId !== null) {

        let objectUser1 = {
            "kv": {

                "fkUserId": userId

            }

        }
        $('#login_btn_data').css('display', 'none');

        $('[data-target="#exampleModal"]').css('display', 'none');
        $('.navbar-custom-menu').css('display', 'block');

        $.ajax({
            type: "POST",
            url: UrlQb + "api/post/zd/traininghub/getUserFullInfo4Web",
            //	data: JSON.stringify(data), // now data come in this function
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            dataType: "json",

            data: JSON.stringify(objectUser1),
            success: function (data, status, jqXHR) {
                var dat = data.tbl[0].r
                for (let index = 0; index < dat.length; index++) {

                    var idTc = dat[index]['id'];
                    var gendr = dat[index]['gender'];
                    var cty = dat[index].city;
                    var mbl = dat[index]['mobile'];
                    var brthDt = deTimeSplit(dat[index]['birthDate']);

                    var nm = dat[index]['name'];
                    var srnm = dat[index]['surname'];
                    var imgTc = dat[index]['imgUrl'];
                    var eml = dat[index]['email']

                    var city = dat[index]['city'];
                    var country = dat[index]['country'];
                    var organ = dat[index]['organization'];


                    var fb = dat[index]['socialFb']
                    var insta = dat[index]['socialInstagram']
                    var link = dat[index]['socialLn']
                    var twt = dat[index]['socialTwitter']
                    var xng = dat[index]['socialXing']




                    nmFK = nm;
                    surNmFK = srnm
                    $("#user_name_pr").text(nm + " " + srnm);
                    $("#city_user_pr").text(cty);
                    $("#user_pr_mobile").text(mbl);
                    $("#user_pr_mail").text(eml);
                    $("#update_user_name").val(nm);
                    $("#update_user_surname").val(srnm);
                    $("#update_user_mail").val(eml);
                    $("#update_user_mobil").val(mbl);
                    $("#update_user_brthday").val(brthDt);
                    $("#update_user_gender").val(gendr);
                    $("#update_user_city").val(city);
                    $("#update_user_country").val(country);
                    $("#update_user_orgn").val(organ);
                    $("#update_user_fbLink").val(fb);
                    $("#update_user_xing").val(xng);
                    $("#update_user_twitLink").val(twt);
                    $("#update_user_insLink").val(insta);
                    $("#update_user_LnLink").val(link);

                    if (imgTc === "") {

                        $("#profile_picture_img").attr('src', 'img/userprofile.png');
                        $('#user_index_img').attr('src', 'img/userprofile.png');
                        $('#user_index_img_large').attr('src', 'img/userprofile.png');
                        $('#name_index_block').text(nm + ' ' + srnm);
                    } else {


                        $("#profile_picture_img").attr('src', UrlQb + 'api/get/zdfiles/traininghub/' + imgTc);
                        userImageIn(imgTc, nm, srnm);
                    }



                }



            },

            error: function (jqXHR, status) {
                // error handler

                alert('fail' + status.code);
            }
        });
    }
}

$(document).on("click", '#update_user_btn', function () {

    var nm = $("#update_user_name").val();
    var srnm = $("#update_user_surname").val();
    var mbl = $("#update_user_mobil").val();
    var brthDay = reDeTimeSplit($("#update_user_brthday").val());
    var gndr = $("#update_user_gender").val();
    var cty = $("#update_user_city").val();
    var ctry = $("#update_user_country").val();
    var organ = $("#update_user_orgn").val();
    var fb = $("#update_user_fbLink").val();
    var xng = $("#update_user_xing").val();
    var twt = $("#update_user_twitLink").val();
    var ins = $("#update_user_insLink").val();
    var lnk = $("#update_user_LnLink").val();

    /* var stts = $("#update_user_status").val(); */

    let objectUser1 = {
        "kv": {
            "updatedField": "birthDate,city,country,mobile,name,organization,socialFb,socialInstagram,socialLn,socialTwitter,socialXing,surname",
            "fkUserId": fkUserCode,
            "name": nm,
            "surname": srnm,
            "mobile": mbl,
            "birthDate": brthDay,
            "gender": gndr,
            "city": cty,
            "country": ctry,
            "organization": organ,
            "socialFb": fb,
            "socialInstagram": ins,
            "socialLn": lnk,
            "socialTwitter": twt,
            "socialXing": xng,


        }

    }


    if (brthDay && nm && srnm && mbl.trim().length > 3) {

        $.ajax({
            type: "POST",
            url: UrlQb + "api/post/cl/traininghub/updateActiveUserFullInfo4Web",
            data: JSON.stringify(objectUser1), // now data come in this function
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            dataType: "json",
            success: function (data, status, jqXHR) {

                alertBoxGenerate("Save succesfuly", "success", "Notification")


            },

            error: function (jqXHR, status) {
                // error handler

                alert('fail' + status.code);
            }
        });

    } else {
        alertBoxGenerate('Fill in all the fields!!!', "warning", "Error")

    }

})
//User sign in function
$(document).on("click", '#exit_profile_name', function () {

    localStorage.removeItem('UsId');

    window.location.href = 'index-main.html?&point=profile';


})

function userImageIn(img, name, srnm) {

    $('#user_index_img').attr('src', UrlQb + 'api/get/zdfiles/traininghub/' + img);
    $('#user_index_img_large').attr('src', UrlQb + 'api/get/zdfiles/traininghub/' + img);
    $('#name_index_block').text(name + ' ' + srnm);



}

$(document).on('change', '#profile_change', function (event) {
    var reader = new FileReader();
    reader.onload = function () {
        var output = $('#profile_picture_img');
        output.attr('src', reader.result);
    }
    reader.readAsDataURL(event.target.files[0]);

    uploadFile4Ipo($(this).attr('id'))

});

function uploadFile4Ipo(id) {
    /* var prec = $('.percentTst'); */

    var files = document.getElementById(id).files;
    var file_count = files.length;
    var st = "";
    var trc = 0;
    for (var i = 0, f; f = files[i]; i++) {
        //            var file = files[0];
        var file = f;
        var fileext = file['name'].split('.').pop();
        var fname = file['name'].split('.')[0];

        if (files && file) {
            var reader = new FileReader();
            /* prec.css('width', '0%');
            prec.text('0%'); */
            reader.fileName = fname;
            reader.fileExt = fileext;
            reader.fileNo = i;

            reader.onload = function (readerEvt) {
                trc++;
                var fname1 = readerEvt.target.fileName;
                var fileext1 = readerEvt.target.fileExt;


                var binaryString = readerEvt.target.result;
                var s = uploadFile4IpoCore(fileext1, btoa(binaryString), fname1);

                st += s;
                st += (trc < file_count) ? global_var.vertical_seperator : "";

                if (trc === file_count) {

                    $('#' + id).attr('fname', st);
                }

            };

            reader.readAsBinaryString(file, fname);
        }
    }
}

function uploadFile4IpoCore(fileext, file_base_64, file_name) {

    var d = new Object();
    d.file_base_64 = file_base_64;
    d.file_extension = fileext;
    d.file_type = "general";
    d.file_name = file_name;
    conf = JSON.parse('{"kv":{}}');
    conf['kv'] = d;

    var dat = JSON.stringify(conf);
    var finalname = "";

    $.ajax({
        url: UrlQb + "api/post/zdupload/traininghub",
        type: "POST",
        data: dat,
        contentType: "application/json",
        crossDomain: true,

        async: false,
        success: function (data) {
            finalname = data.kv.uploaded_file_name;
            updateUserImage(finalname);

        },
        error: function () {

        }
    });
    return finalname;
}

function updateUserImage(img) {
    let objectUser1 = {
        "kv": {
            "imgUrl": img,
            "fkUserId": fkUserCode,

        }

    }



    $.ajax({
        type: "POST",
        url: UrlQb + "api/post/cl/traininghub/updateActiveUserImage4Web",
        data: JSON.stringify(objectUser1), // now data come in this function
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        dataType: "json",
        success: function (data, status, jqXHR) {

            alertBoxGenerate('Photo Saved', "success", "Notification")
        },

        error: function (jqXHR, status) {
            // error handler

            alert('fail' + status.code);
        }
    });


}