function initMain() {
    Container.CategorySection.Init();
    Container.ServiceTypeSection.Init();
    Container.ServiceSection.Init();
}

function initMain4Key() {
    var sid = Utility.getParamFromUrl('sid');
    ServiceDetail.ServiceId = sid;
    ServiceDetail.SetStoryCard();
    ServiceDetail.SetTopicList();
}



var SingleCard = {
    Data: {
        SID: "",
        Image: 'img/Azercell-in Biznes modelinin qurulması.png',
        Title: "Bakalavr və Magistr tələbələri üçün Sertifikatlı Junior Agile Business Analysts",
        StartDate: '21/12/2021',
        Category: 'Texniki Tapşırıq',
        Service: 'Praktiki Məşğələ',
        EtrafliLink: '',
        Dil: 'AZE',
        Qiymet: '75',
        QiymetOld: '275',
        UserImage: "img/rufet-image.png",
        UserName: "Anar Rüstəmov, PhD (Mentor)"
    },
    Item: function () {
        return $('<div>').addClass('col-lg-3 col-sm-2 col-md-4')
            .append($("<div>")
                .addClass('card-container')
                .append(SingleCard.Content.Image())
                .append(SingleCard.Content.Category())
                .append(SingleCard.Content.Item()))

    },
    Content: {
        Item: function () {
            return $('<div>').addClass("card-content")
                .append(SingleCard.Content.Header())
                //.append()
                // .append(SingleCard.Content.Service())
                .append(SingleCard.Content.StartDate())
                .append(SingleCard.Content.Language())
                .append(SingleCard.Content.Price())
                .append(SingleCard.Content.Qeydiyyat())
                .append(SingleCard.Content.User())
                ;
        },
        Image: function () {
            return `<div class="card-image">
                        <img class="card-image" src="${SingleCard.Data.Image}">
                    </div>`;
        },
        Header: function () {
            return $('<a href="#">')
                .addClass("card-header-item-link")
                .append($('<h3>')
                    .attr('sid', SingleCard.Data.SID)
                    .addClass("card_header")
                    .text(SingleCard.Data.Title));
        },
        Etrafli: function () {
            return `<div class="card-bottom-etrafli">
                        <a href="#" class="learn-more-link-etrafli">Ətraflı...</a>
                   </div>`
        },
        Category: function () {
            return `<div class="card-catagories">
                        <div class="card-catagories-left">${SingleCard.Data.Category}</div>
                        <div class="card-catagories-right">${SingleCard.Data.Service}</div>
                   </div>`;
        },
        Service: function () {
            return `<p class="card-service">${SingleCard.Data.Service}</b> </p>`;
        },
        StartDate: function () {
            return `<p class="card-dates text-left" title='Təqribi başlağa tarixi'>
                            <i class='fa fa-calendar'></i>
                             <b>${SingleCard.Data.StartDate}</b> </p>`;
        },
        Language: function () {
            return `<p class="language">Dil: ${SingleCard.Data.Dil}</p>`
        },
        Price: function () {
            return `<div class="pricing">
                        <p class="price">Qiymət:</p>
                        <p class="numbers"> ${SingleCard.Data.Qiymet} AZN</p>
                        <p class="numbers-old"> ${SingleCard.Data.QiymetOld} AZN</p>
                    </div>`
        },
        Qeydiyyat: function () {
            return `<div class="card-bottom service-registration-link" pid='${SingleCard.Data.SID}'>
                        <a   class="cta">Qeydiyyat</a>
                    </div>`
        },
        User: function () {
            // return `<div class="hero-box-center">
            //             <img data-toggle="popover" data-placement='bottom' data-content="${SingleCard.Data.UserName}" data-trigger="hover" src="${SingleCard.Data.UserImage}">
            //         </div>`

            return `<div class="hero-box-center">
                        <img data-toggle="popover" data-placement='bottom' src="img/tatbiget-single-logo.png">
                    </div>`
        }
    }
}

var ServceType = {
    project: "Biznes Layihəsi",
    practice: "Praktiki Məşğələ",
    training: "Təlim"
}

function call(apiId, dataCore, isAsync, callback) {
    if (!apiId) {
        Toaster.showError('API ID is not entered');
    }

    var synch = isAsync;
    synch = (synch !== 'undefined') ? synch : true;

    var res1 = '';
    var json = { kv: {} };
    if (dataCore) {
        json.kv = $.extend(json.kv, dataCore);
    }
    json.kv['apiId'] = apiId;
    var that = this;
    var data = JSON.stringify(json);
    $.ajax({
        url: "https://app.sourcedagile.com/api/post/ca/1iperej/" + apiId,
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: synch,
        success: function (res) {
            AJAXCallFeedback(res);
            res1 = res;
            if (callback) {
                callback(res);
            }
        },
        error: function () {
            Toaster.showError(apiId + ' ----> Something went wrong!!!');
        }
    });
    return res1;
}



var Toaster = {
    showGeneralError: function () {
        this.showError("System Error Occured!");
    },
    showError: function (msg) {
        var id = makeId(10);
        var div = $('<div>')
            .attr('id', id)
            .attr("style", "z-index: 50000; background: red!important")
            .addClass('toast ml-auto')
            .addClass('toast-error')
            .attr('role', 'alert')
            .attr('data-delay', '300')
            .attr('data-autohide', false)
            .append($('<div>')
                .addClass('toast-header')
                .append($('<strong>')
                    .addClass('mr-auto text-primary')
                    .append('Error Message')
                )
                .append($('<button>')
                    .addClass('ml-2 mb-1 close')
                    .attr('type', 'button')
                    .attr('data-dismiss', 'toast')
                    .attr('aria-label', 'Close"')
                    .append($('<span>')
                        .attr('aria-hidden', true)
                        .append(('x')))

                )
            )
            .append($('<div>')
                .addClass('toast-body')
                .append(msg)
            )
            ;
        $('#body_of_toaster').prepend(div);
        // initialize and show Bootstrap 4 toast
        $('#' + id).toast('show');
        setTimeout(function () {
            $('#' + id).toast('hide');
        }, 3000);
    }
    ,
    showMessage: function (msg) {
        var id = makeId(10);
        var div = $('<div>')
            .attr('id', id)
            .attr("style", "z-index: 50000; background: #28a64fbd!important")
            .addClass('toast ml-auto')
            .addClass('toast-message')
            .attr('role', 'alert')
            .attr('data-delay', '300')
            .attr('data-autohide', false)
            .append($('<div>')
                .addClass('toast-header')
                .append($('<strong>')
                    .addClass('mr-auto text-primary')
                    .append('Successfull Message')
                )
                .append($('<button>')
                    .addClass('ml-2 mb-1 close')
                    .attr('type', 'button')
                    .attr('data-dismiss', 'toast')
                    .attr('aria-label', 'Close"')
                    .append($('<span>')
                        .attr('aria-hidden', true)
                        .append(('x')))

                )
            )
            .append($('<div>')
                .addClass('toast-body')
                .append(msg)
            )
            ;
        $('#body_of_toaster').prepend(div);
        // initialize and show Bootstrap 4 toast
        $('#' + id).toast('show');
        setTimeout(function () {
            $('#' + id).toast('hide');
        }, 3000);
    }
}

var ServiceDetail = {
    TopicListObject: {},
    ServiceId: "",
    CurrentService: 'practice',
    CurrentCategory: '',
    Registration: {
        GetRoleList: function () {
            var roles = '';
            $('.registration-roles-item').each(function () {
                roles += $(this).is(':checked') ? $(this).attr('pid') + ',' : "";
            })
            return roles;
        },
        GetIKnow: function () {
            var iknow = '';
            $('.registration-i-know-list-item').each(function () {
                iknow += $(this).is(':checked') ? $(this).attr('pid') + ',' : "";
            })
            return iknow;
        },
        Controller: function (data) {
            var f = false;
            if (!data.email) {
                $('#registration-email').after('<p class=\'col apd-form-error-msg\' id="ss1">Məcburi xana</p>');
                setTimeout(function () {
                    $('#ss1').remove();
                }, 1000000);
                f = true;
            }
            if (!data.name) {
                $('#registration-name').after('<p class=\'col  apd-form-error-msg\' id="ss2">Məcburi xana</p>');
                setTimeout(function () {
                    $('#ss2').remove();
                }, 300000);
                f = true;
            }
            if (!data.surname) {
                $('#registration-surname').after('<p class=\'col apd-form-error-msg\' id="ss3">Məcburi xana.</p>');
                setTimeout(function () {
                    $('#ss3').remove();
                }, 300000);
                f = true;
            }
            if (!data.mobile) {
                $('#registration-mobil').after('<p class=\'col apd-form-error-msg\' id="ss4">Məcburi xana.</p>');
                setTimeout(function () {
                    $('#ss4').remove();
                }, 300000);
                f = true;
            }

            if (!data.whatsapp) {
                $('#registration-whatsapp').after('<p class=\'col apd-form-error-msg\' id="ss5">Məcburi xana</p>');
                setTimeout(function () {
                    $('#ss5').remove();
                }, 300000);
                f = true;
            }



            if (f) {
                throw 'Exception'
            }
        },
        Do: function (el) {
            // 21120809433404628273
            var data = {};
            data.email = $('#registration-email').val();
            data.fkServiceId = $('#registration-heading').attr('service-id');
            data.iKnow = ServiceDetail.Registration.GetIKnow();
            data.mobile = $('#registration-mobil').val();
            data.name = $('#registration-name').val();
            data.organization = $('#registration-organization').val();
            data.postion = $('#registration-position').val();
            data.qeyd = $('#registration-qeyd').val();
            data.role = ServiceDetail.Registration.GetRoleList();
            data.surname = $('#registration-surname').val();
            data.whatsapp = $('#registration-whatsapp').val();
            data.serviceName = $('.registration-heading').text();
            data.categoryName = $('.registration-heading-category').text();
            data.serviceTypeName = $('.registration-heading-service-type').text();
            this.Controller(data);
            $(el).removeClass('registration-register');
            $(el).attr('disabled', true);
            $(el).attr('readonly', true);
            call('21120809433404628273', data, true, function (res) {
                $(el).remove();
                $('.registration-row')
                    .html("Qeydiyyat müvəffəqiyyətlə tamamlanmışdır. Bu istiqamət üzrə əməkdaşımız sizinlə əlaqə yaradacaqdır.")
            })
        },
        AddMustKnow: function (mustKnow) {
            var mustKnows = mustKnow.split("\|");
            for (var j in mustKnows) {
                if (mustKnows[j]) {
                    $('.registration-must-know-list-heading').show();
                    $('.registration-must-know-list').append(`<p class='registration-must-know'>${mustKnows[j]}</p> &nbsp;`)
                }
            }
        },
        AddIKnow: function (iKnow) {
            var iKnows = iKnow.split("\|");
            for (var j in iKnows) {
                if (iKnows[j]) {
                    $('.registration-i-know-list-heading').show();
                    $('.registration-i-know-list')
                        .append(` <p class='registration-i-know-list-item-span'>
                                    <input class="form-control1 registration-i-know-list-item" type='checkbox' 
                                    value='${iKnows[j]}'>${iKnows[j]} &nbsp;</p>`)
                }
            }
        },
        AddRole: function (role) {
            var roles = role.split("\|");
            for (var j in roles) {
                if (roles[j]) {
                    $('.registration-muraciet-roles-heading').show();

                    $('.registration-muraciet-roles')
                        .append(` <p class='registration-roles-item-span'>
                                    <input class="form-control1 registration-roles-item" type='checkbox' 
                                    value='${roles[j]}'>${roles[j]} &nbsp;</p>`)
                }
            }
        }
    },
    SetStoryCard: function () {
        var data = {
            serviceId: ServiceDetail.ServiceId
        }

        call('21120615052601471064', data, true,
            function (res) {
                $('.single-card-info').html('<h6>Bu sorğu üzrə heç bir məlumat tapılmadı</h6>');
                var obj = res.tbl[0].r;
                $('.single-card-info').html('');

                for (var i = 0; i < obj.length; i++) {
                    var o = obj[i];
                    SingleCard.Data.SID = o.id;
                    SingleCard.Data.Image = o.logoUrl;
                    SingleCard.Data.Title = o.title;
                    SingleCard.Data.StartDate = Utility.convertDate(o.startDate);
                    SingleCard.Data.Category = o.categoryName;
                    SingleCard.Data.serviceName = o.serviceName;
                    SingleCard.Data.EtrafliLink = '';
                    SingleCard.Data.Dil = o.language;
                    SingleCard.Data.Qiymet = o.finalPrice;
                    SingleCard.Data.QiymetOld = o.price;
                    SingleCard.Data.UserImage = o.logo;
                    SingleCard.Data.UserName = o.fullName;
                    var card = SingleCard.Item();
                    $(card).removeClass('col-lg-3  col-sm-2 col-md-4')
                    $('.single-card-info').append(card);

                    $('.service-details-heading').text(o.title);
                }
            })

    },
    SetTopicList: function () {
        var data = {
            serviceId: ServiceDetail.ServiceId
        }
        call('21120711295804681373', data, true,
            function (res) {
                var tpc = $('.service-details-tabulation-section');
                tpc.html('<h6>Bu sorğu üzrə heç bir məzmun tapılmadı</h6>');
                var idx = getIndexOfTable(res,'Response');
                var obj = res.tbl[idx].r;
                tpc.html('');
                for (var i = 0; i < obj.length; i++) {
                    var o = obj[i];
                    if (o.topicTitle) {
                        ServiceDetail.TopicListObject[o.id] = o;
                        tpc.append(ServiceDetail.TopicItem(o.id, o.topicTitle));
                    }
                }
                $('.service-details-tabulation-item').first().addClass('active').click();
            })
    },
    TopicItem: function (pid, title) {
        return `<p class='service-details-tabulation-item' pid='${pid}'>${title}</p>`
    }
}

var Container = {

    CurrentService: 'practice',
    CurrentCategory: '',

    ServiceSection: {

        Init: function () {
            this.Call();
        },
        Call: function () {
            var data = {
                fkCategoryId: Container.CurrentCategory,
                serviceType: Container.CurrentService
            }

            call('21120615052601471064', data, true,
                function (res) {
                    $('.single-card-section-list').html('<h6>Bu sorğu üzrə heç bir məlumat tapılmadı</h6>');
                    var obj = res.tbl[0].r;
                    $('.single-card-section-list').html('');

                    for (var i = 0; i < obj.length; i++) {
                        var o = obj[i];
                        SingleCard.Data.SID = o.id;
                        SingleCard.Data.Image = o.logoUrl;
                        SingleCard.Data.Title = o.title;
                        SingleCard.Data.StartDate = Utility.convertDate(o.startDate);
                        SingleCard.Data.Category = o.categoryName;
                        SingleCard.Data.Service = ServceType[o.serviceType];
                        SingleCard.Data.EtrafliLink = '';
                        SingleCard.Data.Dil = o.language;
                        SingleCard.Data.Qiymet = o.finalPrice;
                        SingleCard.Data.QiymetOld = o.price;
                        SingleCard.Data.UserImage = o.logo;
                        SingleCard.Data.UserName = o.fullName;
                        var card = SingleCard.Item();
                        $('.single-card-section-list').append(card);
                        $('#single-card-section-list-hidden').focus();
                    }
                    $('[data-toggle="popover"]').popover()
                })
        }
    },

    ServiceTypeSection: {
        Init: function () {
            call('21120611592402095110', {}, true, function (res) {
                var obj = res.tbl[0].r;
                for (var i = 0; i < obj.length; i++) {
                    $('.section-type-count-' + obj[i].serviceType).text(obj[i].rowCount);
                }
            })
        },
        Get: function () {

        }

    },
    CategorySection: {
        CategoryType: "practice",
        Init: function (categoryType) {
            this.CategoryType = (categoryType) ? categoryType : "practice";
            this.Generate();
        },
        Generate: function () {
            call('21120613042605492398', { categoryType: this.CategoryType }, true,
                function (res) {
                    Container.CategorySection.Clear();
                    var idx4 = getIndexOfTable(res, 'Response')
                    var objT = res.tbl[idx4].r;
                    var categoryList = {};
                    for (var i in objT) {
                        var o = objT[i];
                        categoryList[o.categoryCode] = o.rowCount;
                    }

                    var ul = '';
                    var idx = getIndexOfTable(res, 'web_catagory')
                    var obj = res.tbl[idx].r;
                    for (var i in obj) {
                        var o = obj[i];
                        var count = (categoryList[o.categoryCode])
                            ? categoryList[o.categoryCode] : "0";

                        var li = Container.CategorySection.Item(o.categoryName, count, o.categoryCode);
                        Container.CategorySection.Set(li);
                    }
                });
        },
        Item: function (title, count, categoryCode) {
            return $('<li>')
                .addClass('list-group-item d-flex')
                .addClass('category-list-item')
                .addClass('justify-content-between align-items-center')
                .attr('key', categoryCode)
                .text(title)
                .append($('<span>')
                    .addClass('category-list-item-count')
                    .text(count))
        },
        Set: function (obj) {
            $('ul.categories-list-all').append(obj);
        },
        Clear: function (obj) {
            $('ul.categories-list-all').html('');
        }
    }
}

function AJAXCallFeedback(res) {

    var msgError = "";
    var err = res.err;
    if ((err.length) && err.length > 0) {
        //there are/is errors
        for (var i in err) {
            if (err[i].code === 'general') {
                Toaster.showError(err[i].val);

            } else {
                var f = false;
                $('[sa-selectedfield*="' + err[i].code + '"]').each(function () {
                    var fieldList = $(this).attr('sa-selectedfield').split(',');
                    if (fieldList.includes(err[i].code)) {
                        var id = makeId(10);


                        f = true;
                        $(this).closest('div').find('.apd-form-error-msg').remove();
                        $(this).after('<p class=\'apd-form-error-msg\' id="' + id + '">' + err[i].val + '</p>');


                        setTimeout(function () {
                            $('#' + id).remove();
                        }, 3000);


                    }
                })

                //eyni code-lu component vardir;
                if (!f) {
                    Toaster.showError(err[i].val);
                    msgError = err[i].val;
                }
            }
        }
        throw 'There is/are error(s), message:' + msgError;
    }
}


$(document).on('click', '.tab-section-main', function () {
    $('.tab-section-main').removeClass('active');
    $(this).addClass("active");

    var key = $(this).attr("key");
    Container.CurrentCategory = '';
    Container.CurrentService = key;
    Container.CategorySection.Init(key);
    $('#single-card-section-list-hidden').focus();
    Container.ServiceSection.Init();
})

$(document).on('click', '.service-details-tabulation-item', function () {
    $('.service-details-tabulation-item').removeClass('active');
    $(this).addClass("active");
    // alert('zad dana')
    var pid = $(this).attr('pid');
    var body = ServiceDetail.TopicListObject[pid].topicBody;
    $('.service-details-content').html(body);

})



$(document).on('click', '.registration-register', function () {
    ServiceDetail.Registration.Do(this);
})

$(document).on('click', '.service-login-link', function () {
    $('#service-login').remove();
    $('body').append(Content.LoginForm);
    $('#service-login').modal('show');
})
$(document).on('click', '.service-registration-link', function () {
    $('#serviceRegistration').remove();
    $('body').append(Content.RegistrationFrom);
    $('#serviceRegistration').modal('show');


    var serviceName = $(this).closest('div.card-container').find('.card_header').text();
    var serviceTypeName = $(this).closest('div.card-container').find('.card-service').text();
    var categoryName = $(this).closest('div.card-container').find('.card-category').text();
    $('.registration-heading').text(serviceName);
    $('.registration-heading-category').text(categoryName);
    $('.registration-heading-service-type').text(serviceTypeName);
    var sid = $(this).attr('pid');
    $('.registration-heading').attr("service-id", sid);

    call('21120714053600242677', { serviceId: sid }, true,
        function (res) {
            $('.registration-must-know-list').html('');
            var o = res.tbl[0].r[0];
            ServiceDetail.Registration.AddMustKnow(o.mustKnow);
            ServiceDetail.Registration.AddIKnow(o.iKnow);
            ServiceDetail.Registration.AddRole(o.role);
        })
})

function getIndexOfTable(res, tablename) {
    var ind = -1;
    try {
        for (var i = 0; i < res.tbl.length; i++) {
            if (res.tbl[i].tn === tablename) {
                ind = i;
                break;
            }
        }
    } catch (e) {
    }
    return ind;
}

var Utility = {
    convertDate: function (d, seperator) {
        var st = "";
        var sep = (seperator) ? seperator : "-";
        try {
            st = d.substring(6, 8) + sep + d.substring(4, 6) + sep + d.substring(0, 4)
        } catch (e) {
        }
        return st;
    }
    ,
    convertTime: function (d, seperator) {
        var st = "";
        var sep = (seperator) ? seperator : "-";
        try {
            st = d.substring(0, 2) + sep + d.substring(2, 4) + sep + d.substring(4, 6);
        } catch (e) {
        }
        return st;
    },
    focus: function (id) {
        setTimeout(function () {
            $('#' + id).focus();
        }, 600);
    },
    addParamToUrl: function (param, value) {
        var newurl = Utility.replaceUrlParam(document.location.href, param, value);
        window.history.pushState({ path: newurl }, '', newurl);
    },
    replaceUrlParam: function (url, paramName, paramValue) {
        if (paramValue == null) {
            paramValue = '';
        }
        var pattern = new RegExp('\\b(' + paramName + '=).*?(&|#|$)');
        if (url.search(pattern) >= 0) {
            return url.replace(pattern, '$1' + paramValue + '$2');
        }
        url = url.replace(/[?#]$/, '');
        return url + (url.indexOf('?') > 0 ? '&' : '?') + paramName + '=' + paramValue;
    },
    getParamFromUrl: function (param) {
        var parts = document.location.href.split("?");
        var params = parts[parts.length - 1];
        var pairs = params.split("&");
        var res = '';
        for (var i = 0; i < pairs.length; i++) {
            var k = pairs[i].split("=")[0];
            var v = pairs[i].split("=")[1];
            if (k === param) {
                res = v;
                break;
            }
        }
        return res.replace("#", "");
    },
    setParamOnLoad: function () {
        var parts = document.location.href.split("?");
        var params = parts[parts.length - 1];
        var pairs = params.split("&");
        for (var i = 0; i < pairs.length; i++) {
            var k = pairs[i].split("=")[0];
            var v = pairs[i].split("=")[1];
            try {
                v = v.replace(/#/g, '');
            } catch (ee) {
            }
            global_var[k] = v;
            //            if (k === 'current_project_id') {
            ////                $('#projectList option')
            ////                        .removeAttr('selected')
            ////                        .filter('[value='+v+']')
            ////                        .attr('selected', true)
            //                $('#projectList').val(v);
            //            }

        }
    },
    convertStringToCamelStyle: function (arg) {
        var UNDERSCORE = "_";
        var st = arg.split(UNDERSCORE);
        var res = st[0].toLowerCase()
        for (var i = 1; i <= st.length - 1; i++) {
            res = res + st[i].substring(0, 1).toUpperCase() + st[i].substring(1, st[i].length).toLowerCase();
        }
        return res;
    },
    addUnderScoreToCamalStyle: function (arg) {

        arg = arg.replace(/\.?([0-9-A-Z])/g, function (x, y) {
            return "_" + y.toLowerCase()
        }).replace(/^_/, "");

        return arg;

    },
}

$(document).on('click', '.category-list-item', function () {
    $('.category-list-item').removeClass("active");
    $(this).addClass('active')
    var key = $(this).attr('key');
    Container.CurrentCategory = key;
    Container.ServiceSection.Init();
})

var Content = {
    LoginForm: `  <div class="modal fade" id="service-login" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true">
    <div class="modal-dialog modal-lg"  role="document">
    <div class="modal-content">
        <div class="modal-header">
        <h5 class="modal-title" id="">Giriş</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        </div>
        <div class="modal-body" style="font-size: 14px;">
       
          <div class="container">
            <label for="uname"><b>Username</b></label>
            <input type="text" class='form-control' placeholder="Enter Username" name="uname" required>
      
            <label for="psw"><b>Şifrə</b></label>
            <input type="password" class='form-control' placeholder="Enter Password" name="psw" required>
              
            <div>
            Praktiki Məşğələ, Təlim və Biznes Layihələrdə iştirak edən şəxslər daxil ola bilər. İstifadəçi hesabı cari və əvvəlki istifadəçilər üçün hər zaman aktivdir.
          </div>
          </div>
        
      
         
        </div>
        <div class="modal-footer">
        <button type="button" class="btn btn-primary " > Daxil ol </button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Bağla</button>
        </div>
    </div>
    </div>
</div>
`,
    RegistrationFrom: ` <div class="modal fade" id="serviceRegistration" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true">
                            <div class="modal-dialog modal-lg"  role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                <h5 class="modal-title" id="">Qeydiyyat Forması</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                </div>
                                <div class="modal-body" style="font-size: 14px;">
                                <div class="row registration-row">
                                    <div class="col-12  registration-heading" service-id=''></div>
                                    <div class="col-12  registration-heading-category" hidden></div>
                                    <div class="col-12   registration-heading-service-type" hidden></div>
                                    
                                    <div class="col-lg-6">
                                    <span class='reg-span'>Ad</span>
                                    <input class="form-control" id='registration-name'>
                                    </div>
                                    <div class="col-lg-6">
                                    <span class='reg-span'>Soyad</span>
                                    <input class="form-control" id='registration-surname'>
                                    </div>
                                    <div class="col-lg-6">
                                    <span class='reg-span'>Email</span>
                                    <input class="form-control" id='registration-email'>
                                    </div>
                                    <div class="col-lg-3">
                                    <span class='reg-span'>Mobil</span>
                                    <input class="form-control" id='registration-mobil'>
                                    </div>
                                    <div class="col-lg-3">
                                    <span class='reg-span'>WhatsApp nömrə</span>
                                    <input class="form-control" id='registration-whatsapp'>
                                    </div>

                                    <div class="col-lg-6">
                                    <span class='reg-span'>Təşkilat</span>
                                    <input class="form-control" id='registration-organization'>
                                    </div>
                                    <div class="col-lg-6">
                                    <span class='reg-span'>Vəzifə</span>
                                    <input class="form-control" id='registration-position'>
                                    </div>
                                    <div class="col-sm-12">
                                    <span class='reg-span'>Əlavə Qeyd</span>
                                    <textarea class="form-control" id='registration-qeyd'
                                    placeholder="Uyğun günlər və saatları qeyd edə bilərsiz."></textarea>
                                    </div>
                                    
                                    <div class="col-12">
                                    <br>
                                            <b class='reg-span registration-muraciet-roles-heading' style='display: none;' >Müraciət olunan rol</b>
                                    
                                    </div>
                                    <div class="col-12 d-flex flex-wrap registration-muraciet-roles">
                                    
                                    
                                    </div>
                                    <div class="col-12 reg-span registration-must-know-list-heading" style='display: none;'>
                                    <b>Cari praktiki məşğələ (təlim və ya biznes layihəsində) iştirak etmək üçün aşağıdakı bilik və bacarıqlar
                                    zəruridir.</b>
                                    </div>
                                    <div class="col-12 d-flex flex-wrap registration-must-know-list">
                                    
                                    </div>
                                    <div class="col-12 reg-span-ol">
                                    <br>
                                    <b class='reg-span registration-i-know-list-heading' style='display: none;'>Aşağıdakı bilik və bacarıqları artıq mənimsəmişəm.</b>
                                    </div>
                                    <div class='col-12 d-flex flex-wrap registration-i-know-list'>
                                    
                                    </div>
                                    <div class="col-12 registration-heading-qeyd"><br><b>Qeyd:</b>
                                    <span>Qeydiyatdan keçdikdən sonra sizə təsdiqləyici mail gəlməlidir. Növbəti mərhələlər haqqında bizim
                                        əməkdaşımız
                                        sizinlə göstərilən mobil nömrə üzərindən əlaqə saxlayacaqdır. Uyğun rollar qrupa qeydiyyatdan keçdikdən
                                        sonra cədvəl
                                        yenidən tərtib ediləcəkdir.
                                    </span>
                                    </div>
                                </div>
                                </div>
                                <div class="modal-footer">
                                <button type="button" class="btn btn-primary registration-register" > Qeydiyyat </button>
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Bağla</button>
                                </div>
                            </div>
                            </div>
                        </div>`,
    Footer: ` <div class="footer-left">
                <span><i class='fa fa-envelope-o'></i> info@tatbiget.com</span>
                <span><i class='fa fa-mobile'></i> +994 (70) 525 40 39</span>
                <span><i class="fa fa-address-card-o" aria-hidden="true"></i> Yusif Vəzir Çəmənzəminli 73, AZ1069, Bakı, Azərbaycan
                </span>
            </div>`,
    Header: `<div class="container-fluid  d-flex align-items-center justify-content-between">
                <a href="index.html" class="logo d-flex align-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="250" height="45" viewBox="0 0 1200 225" fill="none">
                <rect width="10.3524" height="172.54" rx="5" transform="matrix(-1 0 0 1 779.88 24.1556)" fill="#CF7914"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M251.448 157.124C243.902 166.634 232.024 171.912 219.711 171.912C210.248 171.912 200.895 169.365 193.297 163.604C182.218 155.207 177.654 142.241 177.654 128.706C177.654 115.184 182.304 102.292 193.341 93.901C200.966 88.1031 210.359 85.5007 219.875 85.5007C232.394 85.5007 244.075 90.0972 251.448 99.7879V94.3035C251.435 91.1449 254.013 88.5855 257.18 88.5855C260.344 88.5855 262.925 91.1449 262.909 94.3035V168.775V168.88C262.909 172.035 260.344 174.591 257.18 174.591C254.016 174.591 251.448 172.035 251.448 168.88V157.124ZM220.202 96.7584C213.368 96.7584 206.508 98.4391 200.914 102.461C192.329 108.631 189.113 118.493 189.113 128.706C189.113 138.806 192.354 148.503 200.778 154.654C206.393 158.753 213.304 160.492 220.202 160.492C238.768 160.492 251.287 146.804 251.287 128.544C251.287 110.41 238.574 96.7584 220.202 96.7584ZM446.972 63.9009C446.972 53.0702 463.485 53.0702 463.485 63.9009C463.485 74.7284 446.972 74.7284 446.972 63.9009ZM455.067 83.9183C458.277 83.9183 460.879 86.5115 460.879 89.7346V170.219C460.879 173.418 458.277 176.011 455.067 176.011C451.857 176.011 449.254 173.418 449.254 170.219V89.71C449.254 86.5116 451.857 83.9183 455.067 83.9183ZM330.496 159.195C333.024 157.791 336.234 158.667 337.687 161.171C339.154 163.699 338.282 166.944 335.744 168.403C335.627 168.474 335.506 168.536 335.383 168.594C335.244 168.729 335.084 168.843 334.902 168.932C329.931 171.328 324.538 173.169 318.96 173.169C300.816 173.169 294.495 162.311 294.495 145.547V98.5036H279.209C276.36 98.5036 274.051 96.1992 274.051 93.3602C274.051 90.5212 276.36 88.2199 279.209 88.2199H294.495V66.6754V66.577C294.495 63.4246 297.06 60.8683 300.224 60.8683C302.777 60.8683 304.994 62.5459 305.713 64.9332C305.873 65.2036 305.956 65.5109 305.956 65.8488V88.2199H331.501C334.353 88.2199 336.663 90.5212 336.663 93.3602C336.663 96.2023 334.353 98.5036 331.501 98.5036H305.956V145.547C305.956 155.45 307.575 162.237 318.96 162.237C322.833 162.237 327.027 160.848 330.496 159.195ZM575.944 135.675C578.185 151.403 590.535 161.751 606.65 161.751C615.888 161.751 627.572 158.27 633.641 150.991C633.847 150.675 634.088 150.377 634.359 150.107C636.484 147.99 639.931 147.99 642.056 150.107C643.69 151.735 644.097 154.19 643.144 156.227C643.098 156.513 642.984 156.789 642.796 157.035C634.56 167.81 619.953 173.169 606.65 173.169C596.69 173.169 586.924 170.21 579.113 163.948C568.706 155.6 563.939 143.236 563.939 130.126C563.939 105.896 582.219 86.9202 606.65 86.9202C616.083 86.9202 625.685 89.2553 633.4 94.835C646.191 104.089 649.694 119.025 648.211 134.037C648.118 134.971 647.338 135.675 646.398 135.675H575.944ZM575.95 125.066H637.356C636.444 107.442 624.439 97.8522 606.65 97.8522C600.881 97.8522 595.194 99.2809 590.245 102.264C581.889 107.306 577.273 115.679 575.95 125.066ZM538.395 93.4677L545.154 85.6051C547.026 83.4329 550.717 83.5251 552.724 85.5253C554.531 87.3258 554.849 90.5243 553.134 92.5122L546.347 100.402C553.091 108.274 555.691 117.224 555.691 127.693C555.691 141.301 548.259 154.617 536.541 161.567C548.503 166.969 556.014 176.604 556.014 190.51C556.014 213.852 537.322 224.302 515.912 224.302C503.649 224.302 490.642 220.434 482.723 210.58C478.086 204.804 475.97 197.863 475.97 190.51C475.97 187.312 478.573 184.719 481.783 184.719C484.99 184.719 487.596 187.312 487.596 190.51C487.596 206.472 501.722 212.881 515.912 212.881C530.377 212.881 544.553 206.905 544.553 190.51C544.553 174.459 529.98 168.302 515.912 168.302C492.276 168.302 476.297 150.829 476.297 127.693C476.297 114.533 480.966 102.015 491.916 94.1099C498.897 89.0679 507.343 86.7573 515.912 86.7573C523.627 86.7573 531.864 89.2676 538.395 93.4677ZM515.912 98.3408C509.924 98.3408 503.92 99.7695 498.965 103.217C490.846 108.867 487.919 118.18 487.919 127.693C487.919 143.958 499.174 156.719 515.912 156.719C531.635 156.719 544.229 143.126 544.229 127.693C544.229 118.272 541.117 109.211 533.223 103.536C528.191 99.92 522.067 98.3408 515.912 98.3408ZM359.552 57.7958V101.207C366.922 91.5198 378.606 86.9202 391.125 86.9202C400.641 86.9202 410.034 89.5226 417.66 95.3205C428.696 103.712 433.346 116.604 433.346 130.126C433.346 143.66 428.782 156.626 417.703 165.027C410.105 170.785 400.752 173.332 391.289 173.332C378.976 173.332 367.098 168.053 359.552 158.544V168.858C359.66 169.304 359.713 169.761 359.713 170.219C359.713 173.418 357.11 176.011 353.9 176.011C350.693 176.011 348.091 173.418 348.091 170.219V56.4346C348.091 53.2362 350.693 50.6429 353.9 50.6429C357.11 50.6429 359.552 53.2362 359.552 56.4346C359.552 56.8925 359.552 57.2304 359.552 57.7958ZM390.798 98.1779C372.426 98.1779 359.713 111.832 359.713 129.963C359.713 148.226 372.232 161.914 390.798 161.914C397.696 161.914 404.607 160.175 410.222 156.073C418.646 149.925 421.887 140.225 421.887 130.126C421.887 119.913 418.671 110.053 410.086 103.881C404.49 99.8586 397.632 98.1779 390.798 98.1779ZM709.864 159.195C712.389 157.791 715.603 158.667 717.055 161.171C718.52 163.699 717.647 166.944 715.112 168.403C714.992 168.474 714.872 168.536 714.751 168.594C714.613 168.729 714.452 168.843 714.267 168.932C709.3 171.328 703.903 173.169 698.325 173.169C680.184 173.169 673.86 162.311 673.86 145.547V98.5036H658.578C655.725 98.5036 653.416 96.1992 653.416 93.3602C653.416 90.5212 655.725 88.2199 658.578 88.2199H673.86V66.6754V66.577C673.86 63.4246 676.426 60.8683 679.592 60.8683C682.142 60.8683 684.363 62.5459 685.081 64.9332C685.242 65.2036 685.322 65.5109 685.322 65.8488V88.2199H710.869C713.719 88.2199 716.028 90.5212 716.028 93.3602C716.028 96.2023 713.719 98.5036 710.869 98.5036H685.322V145.547C685.322 155.45 686.941 162.237 698.325 162.237C702.201 162.237 706.392 160.848 709.864 159.195Z" fill="#266A4D"/>
                <path d="M833.661 68.6709H839.672V79.572L849.452 68.6709H856.764L843.126 83.6543L858.154 100.073H850.797L839.672 87.7814V100.073H833.661V68.6709Z" fill="#266A4D"/>
                <path d="M869.101 100.522C865.512 100.522 862.671 99.5199 860.578 97.5161C858.514 95.5123 857.482 92.7908 857.482 89.3515C857.482 87.1085 857.901 85.1197 858.738 83.3851C859.576 81.6505 860.817 80.3047 862.462 79.3477C864.107 78.3607 866.095 77.8673 868.428 77.8673C870.701 77.8673 872.675 78.3458 874.35 79.3028C876.025 80.2299 877.296 81.5159 878.163 83.1608C879.03 84.7758 879.464 86.5851 879.464 88.5889C879.464 89.5758 879.135 90.3384 878.477 90.8768C877.849 91.3852 876.967 91.6394 875.83 91.6394H863.359C863.359 92.8656 863.882 93.8525 864.929 94.6002C866.006 95.3479 867.396 95.7217 869.101 95.7217C870.507 95.7217 871.688 95.5273 872.645 95.1385C873.632 94.7198 874.499 94.1366 875.247 93.389L878.208 96.5292C877.221 97.7853 875.95 98.7722 874.395 99.49C872.839 100.178 871.075 100.522 869.101 100.522ZM873.587 87.0188C873.587 85.7029 873.094 84.6412 872.107 83.8337C871.15 82.9963 869.924 82.5776 868.428 82.5776C866.993 82.5776 865.781 82.9963 864.794 83.8337C863.837 84.6412 863.359 85.7029 863.359 87.0188H873.587Z" fill="#266A4D"/>
                <path d="M893.065 100.522C889.476 100.522 886.635 99.5199 884.541 97.5161C882.478 95.5123 881.446 92.7908 881.446 89.3515C881.446 87.1085 881.864 85.1197 882.702 83.3851C883.539 81.6505 884.78 80.3047 886.425 79.3477C888.07 78.3607 890.059 77.8673 892.392 77.8673C894.665 77.8673 896.638 78.3458 898.313 79.3028C899.988 80.2299 901.259 81.5159 902.126 83.1608C902.994 84.7758 903.427 86.5851 903.427 88.5889C903.427 89.5758 903.098 90.3384 902.44 90.8768C901.812 91.3852 900.93 91.6394 899.794 91.6394H887.322C887.322 92.8656 887.846 93.8525 888.893 94.6002C889.969 95.3479 891.36 95.7217 893.065 95.7217C894.47 95.7217 895.652 95.5273 896.609 95.1385C897.595 94.7198 898.463 94.1366 899.21 93.389L902.171 96.5292C901.184 97.7853 899.913 98.7722 898.358 99.49C896.803 100.178 895.038 100.522 893.065 100.522ZM897.551 87.0188C897.551 85.7029 897.057 84.6412 896.07 83.8337C895.113 82.9963 893.887 82.5776 892.392 82.5776C890.956 82.5776 889.745 82.9963 888.758 83.8337C887.801 84.6412 887.322 85.7029 887.322 87.0188H897.551Z" fill="#266A4D"/>
                <path d="M907.67 84.3272C907.67 83.2505 907.58 82.3683 907.401 81.6804C907.221 80.9925 906.937 80.3047 906.548 79.6168L911.348 77.7327C912.216 78.6897 912.724 79.8262 912.874 81.1421C914.818 78.8991 917.225 77.7775 920.096 77.7775C921.98 77.7775 923.655 78.2262 925.12 79.1234C926.616 80.0206 927.782 81.3215 928.62 83.0262C929.457 84.7309 929.876 86.7646 929.876 89.1272C929.876 91.4899 929.442 93.5235 928.575 95.2282C927.737 96.9329 926.556 98.2339 925.031 99.1311C923.505 99.9984 921.741 100.432 919.737 100.432C918.481 100.432 917.33 100.208 916.283 99.7591C915.236 99.2806 914.339 98.6376 913.591 97.8301V109.898H907.67V84.3272ZM918.705 95.7217C922.205 95.7217 923.954 93.5235 923.954 89.1272C923.954 87.0038 923.52 85.3739 922.653 84.2374C921.786 83.0711 920.53 82.4879 918.885 82.4879C917.12 82.4879 915.775 83.0561 914.847 84.1926C913.95 85.2991 913.502 86.7945 913.502 88.6786V89.4861C913.502 91.2207 913.95 92.7011 914.847 93.9273C915.745 95.1236 917.031 95.7217 918.705 95.7217Z" fill="#266A4D"/>
                <path d="M945.696 84.3272C945.696 83.2505 945.606 82.3683 945.427 81.6804C945.247 80.9925 944.963 80.3047 944.574 79.6168L949.374 77.7327C950.242 78.6897 950.75 79.8262 950.9 81.1421C952.844 78.8991 955.251 77.7775 958.122 77.7775C960.006 77.7775 961.681 78.2262 963.147 79.1234C964.642 80.0206 965.808 81.3215 966.646 83.0262C967.483 84.7309 967.902 86.7646 967.902 89.1272C967.902 91.4899 967.468 93.5235 966.601 95.2282C965.763 96.9329 964.582 98.2339 963.057 99.1311C961.532 99.9984 959.767 100.432 957.763 100.432C956.507 100.432 955.356 100.208 954.309 99.7591C953.262 99.2806 952.365 98.6376 951.617 97.8301V109.898H945.696V84.3272ZM956.732 95.7217C960.231 95.7217 961.98 93.5235 961.98 89.1272C961.98 87.0038 961.547 85.3739 960.679 84.2374C959.812 83.0711 958.556 82.4879 956.911 82.4879C955.147 82.4879 953.801 83.0561 952.874 84.1926C951.976 85.2991 951.528 86.7945 951.528 88.6786V89.4861C951.528 91.2207 951.976 92.7011 952.874 93.9273C953.771 95.1236 955.057 95.7217 956.732 95.7217Z" fill="#266A4D"/>
                <path d="M972.022 84.4169C972.022 83.5197 971.947 82.7421 971.798 82.0841C971.678 81.4262 971.424 80.6935 971.035 79.886L976.284 77.8673C976.553 78.3458 976.792 78.914 977.001 79.572C977.241 80.2299 977.375 80.7981 977.405 81.2767C978.213 80.1402 979.05 79.2878 979.917 78.7196C980.815 78.1514 981.831 77.8673 982.968 77.8673C983.865 77.8673 984.643 77.9869 985.301 78.2262C985.988 78.4654 986.706 78.8691 987.454 79.4374L985.256 83.5197C984.747 83.2206 984.284 83.0113 983.865 82.8916C983.446 82.7421 982.983 82.6673 982.474 82.6673C980.919 82.6673 979.768 83.1458 979.02 84.1029C978.302 85.0599 977.944 86.5104 977.944 88.4543V100.073H972.022V84.4169Z" fill="#266A4D"/>
                <path d="M996.452 100.522C994.598 100.522 992.938 100.088 991.473 99.2208C990.007 98.3535 988.856 97.0974 988.019 95.4525C987.181 93.8077 986.762 91.8487 986.762 89.5758C986.762 87.1534 987.181 85.0599 988.019 83.2954C988.886 81.5309 990.082 80.1851 991.607 79.2579C993.163 78.3308 994.972 77.8673 997.035 77.8673C999.458 77.8673 1001.48 78.7794 1003.09 80.6038V78.3159H1008.79V93.9721C1008.79 95.0189 1008.88 95.8862 1009.06 96.574C1009.24 97.2619 1009.52 97.9498 1009.91 98.6376L1005.11 100.522C1004.21 99.5348 1003.7 98.4133 1003.59 97.1572H1003.5C1002.66 98.2339 1001.63 99.0713 1000.4 99.6694C999.204 100.238 997.888 100.522 996.452 100.522ZM997.664 95.8114C999.398 95.8114 1000.71 95.2581 1001.61 94.1516C1002.51 93.0151 1002.96 91.5048 1002.96 89.6207V88.8132C1002.96 87.0786 1002.51 85.6132 1001.61 84.4169C1000.74 83.1907 999.488 82.5776 997.843 82.5776C996.168 82.5776 994.882 83.1757 993.985 84.372C993.118 85.5683 992.684 87.3029 992.684 89.5758C992.684 91.6095 993.103 93.1646 993.94 94.2413C994.807 95.288 996.049 95.8114 997.664 95.8114Z" fill="#266A4D"/>
                <path d="M1025.07 100.522C1021.3 100.522 1018.36 99.5199 1016.23 97.5161C1014.11 95.5123 1013.05 92.746 1013.05 89.2169C1013.05 85.658 1014.09 82.8767 1016.19 80.8729C1018.28 78.8691 1021.17 77.8673 1024.85 77.8673C1026.55 77.8673 1028.14 78.1514 1029.6 78.7196C1031.07 79.2579 1032.25 79.9757 1033.15 80.8729L1031.13 84.7758C1029.39 83.3701 1027.39 82.6673 1025.12 82.6673C1023.23 82.6673 1021.75 83.2057 1020.67 84.2823C1019.6 85.3589 1019.06 87.0038 1019.06 89.2169C1019.06 91.4001 1019.6 93.0301 1020.67 94.1067C1021.78 95.1834 1023.31 95.7217 1025.25 95.7217C1026.36 95.7217 1027.34 95.5572 1028.21 95.2282C1029.11 94.8693 1029.96 94.3011 1030.77 93.5235L1033.86 96.7535C1032.88 97.9198 1031.61 98.847 1030.05 99.5348C1028.49 100.193 1026.83 100.522 1025.07 100.522Z" fill="#266A4D"/>
                <path d="M1045.97 100.477C1043.84 100.477 1042.21 99.8937 1041.08 98.7273C1039.97 97.561 1039.42 95.8862 1039.42 93.703V83.0711H1035.42L1036.68 78.3159H1039.51V73.785L1045.25 71.1382V78.3159H1051.08L1049.91 83.0711H1045.34V93.8376C1045.34 94.5254 1045.49 95.0189 1045.79 95.3179C1046.09 95.617 1046.55 95.7666 1047.18 95.7666C1047.92 95.7666 1048.6 95.617 1049.2 95.3179L1050.59 99.5797C1050.08 99.8189 1049.38 100.028 1048.48 100.208C1047.61 100.387 1046.77 100.477 1045.97 100.477Z" fill="#266A4D"/>
                <path d="M1058.5 75.8486C1057.33 75.8486 1056.36 75.4897 1055.58 74.7719C1054.84 74.0541 1054.46 73.142 1054.46 72.0354C1054.46 70.9289 1054.84 70.0167 1055.58 69.2989C1056.36 68.5812 1057.33 68.2223 1058.5 68.2223C1059.67 68.2223 1060.62 68.5812 1061.37 69.2989C1062.15 70.0167 1062.54 70.9289 1062.54 72.0354C1062.54 73.142 1062.15 74.0541 1061.37 74.7719C1060.62 75.4897 1059.67 75.8486 1058.5 75.8486ZM1055.54 78.3159H1061.46V100.073H1055.54V78.3159Z" fill="#266A4D"/>
                <path d="M1078.39 100.522C1074.62 100.522 1071.67 99.5199 1069.55 97.5161C1067.42 95.5123 1066.36 92.746 1066.36 89.2169C1066.36 85.658 1067.41 82.8767 1069.5 80.8729C1071.6 78.8691 1074.48 77.8673 1078.16 77.8673C1079.87 77.8673 1081.45 78.1514 1082.92 78.7196C1084.38 79.2579 1085.56 79.9757 1086.46 80.8729L1084.44 84.7758C1082.71 83.3701 1080.7 82.6673 1078.43 82.6673C1076.55 82.6673 1075.07 83.2057 1073.99 84.2823C1072.91 85.3589 1072.37 87.0038 1072.37 89.2169C1072.37 91.4001 1072.91 93.0301 1073.99 94.1067C1075.1 95.1834 1076.62 95.7217 1078.57 95.7217C1079.67 95.7217 1080.66 95.5572 1081.53 95.2282C1082.42 94.8693 1083.28 94.3011 1084.08 93.5235L1087.18 96.7535C1086.19 97.9198 1084.92 98.847 1083.37 99.5348C1081.81 100.193 1080.15 100.522 1078.39 100.522Z" fill="#266A4D"/>
                <path d="M1095.04 75.8486C1093.87 75.8486 1092.9 75.4897 1092.12 74.7719C1091.37 74.0541 1091 73.142 1091 72.0354C1091 70.9289 1091.37 70.0167 1092.12 69.2989C1092.9 68.5812 1093.87 68.2223 1095.04 68.2223C1096.2 68.2223 1097.16 68.5812 1097.91 69.2989C1098.69 70.0167 1099.07 70.9289 1099.07 72.0354C1099.07 73.142 1098.69 74.0541 1097.91 74.7719C1097.16 75.4897 1096.2 75.8486 1095.04 75.8486ZM1092.08 78.3159H1098V100.073H1092.08V78.3159Z" fill="#266A4D"/>
                <path d="M1119.99 100.522C1119.48 99.6245 1119.11 98.6974 1118.87 97.7404C1118.66 96.7535 1118.56 95.6469 1118.56 94.4207V87.1982C1118.56 84.1776 1117.3 82.6673 1114.79 82.6673C1113.29 82.6673 1112.08 83.2505 1111.15 84.4169C1110.26 85.5833 1109.81 87.0636 1109.81 88.8581V100.073H1103.89V84.4169C1103.89 83.5197 1103.81 82.7421 1103.66 82.0841C1103.54 81.4262 1103.29 80.6935 1102.9 79.886L1108.15 77.8673C1108.42 78.3458 1108.66 78.914 1108.87 79.572C1109.11 80.2299 1109.24 80.7981 1109.27 81.2767C1110.14 80.2598 1111.2 79.4374 1112.46 78.8093C1113.74 78.1813 1115.1 77.8673 1116.54 77.8673C1119.32 77.8673 1121.34 78.6748 1122.59 80.2897C1123.85 81.8748 1124.48 84.1776 1124.48 87.1982V94.2862C1124.48 95.931 1124.78 97.3516 1125.37 98.5479L1119.99 100.522Z" fill="#266A4D"/>
                <path d="M1138.76 109.853C1136.06 109.853 1133.43 109.195 1130.86 107.879L1132.61 103.617C1134.43 104.574 1136.48 105.053 1138.76 105.053C1141 105.053 1142.57 104.499 1143.47 103.393C1144.36 102.286 1144.81 100.716 1144.81 98.6825V97.4712C1144.06 98.2787 1143.17 98.9217 1142.12 99.4002C1141.07 99.8488 1139.92 100.073 1138.67 100.073C1135.62 100.073 1133.16 99.1161 1131.31 97.2021C1129.46 95.2581 1128.53 92.5067 1128.53 88.9478C1128.53 86.5851 1128.95 84.5664 1129.78 82.8916C1130.62 81.2168 1131.77 79.9458 1133.24 79.0785C1134.7 78.2112 1136.39 77.7775 1138.31 77.7775C1141.18 77.7775 1143.59 78.8991 1145.53 81.1421C1145.68 79.8262 1146.19 78.6897 1147.06 77.7327L1151.86 79.6168C1151.47 80.3047 1151.18 80.9925 1151 81.6804C1150.82 82.3683 1150.73 83.2505 1150.73 84.3272V98.1442C1150.73 101.972 1149.7 104.873 1147.64 106.847C1145.61 108.851 1142.64 109.853 1138.76 109.853ZM1139.7 95.3628C1141.37 95.3628 1142.66 94.7647 1143.56 93.5684C1144.45 92.3422 1144.9 90.8618 1144.9 89.1272V88.6786C1144.9 86.7945 1144.44 85.2991 1143.51 84.1926C1142.61 83.0561 1141.28 82.4879 1139.52 82.4879C1137.87 82.4879 1136.62 83.0412 1135.75 84.1477C1134.88 85.2244 1134.45 86.8244 1134.45 88.9478C1134.45 91.1609 1134.88 92.7908 1135.75 93.8376C1136.65 94.8544 1137.96 95.3628 1139.7 95.3628Z" fill="#266A4D"/>
                <path d="M1154.99 102.585C1155.65 102.316 1156.27 101.927 1156.87 101.419C1157.5 100.911 1157.93 100.387 1158.17 99.8488C1157.37 99.8189 1156.69 99.5049 1156.16 98.9068C1155.62 98.3086 1155.35 97.6357 1155.35 96.8881C1155.35 95.8413 1155.69 95.0039 1156.38 94.3759C1157.07 93.7478 1157.96 93.4338 1159.07 93.4338C1160.27 93.4338 1161.19 93.7927 1161.85 94.5105C1162.54 95.1983 1162.88 96.1404 1162.88 97.3367C1162.88 99.0115 1162.35 100.567 1161.27 102.002C1160.19 103.438 1158.62 104.619 1156.56 105.546L1154.99 102.585Z" fill="#266A4D"/>
                <path d="M833.212 157.346C833.601 156.658 833.885 155.97 834.064 155.282C834.244 154.565 834.334 153.682 834.334 152.636V125.809H840.255V139.133C841.063 138.355 842.035 137.727 843.171 137.249C844.308 136.77 845.519 136.531 846.805 136.531C849.766 136.531 852.128 137.518 853.893 139.492C855.657 141.465 856.539 144.247 856.539 147.836C856.539 150.079 856.091 152.067 855.194 153.802C854.326 155.507 853.115 156.838 851.56 157.795C850.035 158.722 848.345 159.185 846.491 159.185C843.59 159.185 841.272 158.064 839.537 155.821C839.388 157.137 838.879 158.273 838.012 159.23L833.212 157.346ZM845.549 154.475C847.194 154.475 848.45 153.907 849.317 152.77C850.184 151.604 850.618 149.959 850.618 147.836C850.618 143.439 848.868 141.241 845.369 141.241C843.694 141.241 842.408 141.854 841.511 143.08C840.614 144.277 840.165 145.742 840.165 147.477V148.284C840.165 150.168 840.614 151.679 841.511 152.815C842.438 153.922 843.784 154.475 845.549 154.475Z" fill="#266A4D"/>
                <path d="M871.292 159.185C867.703 159.185 864.862 158.183 862.768 156.18C860.704 154.176 859.673 151.454 859.673 148.015C859.673 145.772 860.091 143.783 860.929 142.049C861.766 140.314 863.007 138.968 864.652 138.011C866.297 137.024 868.286 136.531 870.619 136.531C872.892 136.531 874.865 137.009 876.54 137.966C878.215 138.893 879.486 140.179 880.353 141.824C881.221 143.439 881.654 145.249 881.654 147.252C881.654 148.239 881.325 149.002 880.667 149.54C880.039 150.049 879.157 150.303 878.021 150.303H865.549C865.549 151.529 866.073 152.516 867.12 153.264C868.196 154.011 869.587 154.385 871.292 154.385C872.697 154.385 873.878 154.191 874.836 153.802C875.822 153.383 876.69 152.8 877.437 152.052L880.398 155.193C879.411 156.449 878.14 157.436 876.585 158.154C875.03 158.841 873.265 159.185 871.292 159.185ZM875.778 145.682C875.778 144.366 875.284 143.305 874.297 142.497C873.34 141.66 872.114 141.241 870.619 141.241C869.183 141.241 867.972 141.66 866.985 142.497C866.028 143.305 865.549 144.366 865.549 145.682H875.778Z" fill="#266A4D"/>
                <path d="M895.659 159.185C891.89 159.185 888.945 158.183 886.821 156.18C884.698 154.176 883.636 151.409 883.636 147.88C883.636 144.322 884.683 141.54 886.776 139.536C888.87 137.533 891.756 136.531 895.434 136.531C897.139 136.531 898.724 136.815 900.19 137.383C901.655 137.921 902.836 138.639 903.734 139.536L901.715 143.439C899.98 142.034 897.977 141.331 895.704 141.331C893.819 141.331 892.339 141.869 891.262 142.946C890.186 144.022 889.647 145.667 889.647 147.88C889.647 150.064 890.186 151.694 891.262 152.77C892.369 153.847 893.894 154.385 895.838 154.385C896.945 154.385 897.932 154.221 898.799 153.892C899.696 153.533 900.549 152.965 901.356 152.187L904.451 155.417C903.464 156.583 902.193 157.511 900.638 158.198C899.083 158.856 897.423 159.185 895.659 159.185Z" fill="#266A4D"/>
                <path d="M917.631 159.23C915.388 159.23 913.414 158.767 911.709 157.839C910.035 156.882 908.734 155.552 907.806 153.847C906.909 152.112 906.461 150.124 906.461 147.88C906.461 145.637 906.909 143.664 907.806 141.959C908.734 140.224 910.035 138.893 911.709 137.966C913.414 137.009 915.388 136.531 917.631 136.531C919.874 136.531 921.833 137.009 923.508 137.966C925.212 138.893 926.513 140.224 927.41 141.959C928.338 143.664 928.801 145.637 928.801 147.88C928.801 150.124 928.338 152.112 927.41 153.847C926.513 155.552 925.212 156.882 923.508 157.839C921.833 158.767 919.874 159.23 917.631 159.23ZM917.631 154.43C919.336 154.43 920.622 153.862 921.489 152.725C922.356 151.559 922.79 149.944 922.79 147.88C922.79 145.817 922.356 144.217 921.489 143.08C920.622 141.914 919.336 141.331 917.631 141.331C915.926 141.331 914.64 141.914 913.773 143.08C912.906 144.217 912.472 145.817 912.472 147.88C912.472 149.944 912.906 151.559 913.773 152.725C914.64 153.862 915.926 154.43 917.631 154.43Z" fill="#266A4D"/>
                <path d="M959.367 159.185C958.859 158.288 958.485 157.361 958.246 156.404C958.036 155.417 957.932 154.31 957.932 153.084V145.772C957.932 144.247 957.677 143.125 957.169 142.408C956.661 141.69 955.898 141.331 954.881 141.331C952.518 141.331 951.337 142.811 951.337 145.772V158.737H945.505V145.727C945.505 144.142 945.266 143.021 944.788 142.363C944.339 141.675 943.606 141.331 942.589 141.331C941.303 141.331 940.361 141.794 939.763 142.722C939.165 143.619 938.866 144.98 938.866 146.804V158.737H932.944V143.08C932.944 142.183 932.87 141.406 932.72 140.748C932.6 140.09 932.346 139.357 931.957 138.55L936.892 136.531C937.161 137.009 937.401 137.578 937.61 138.236C937.849 138.893 937.984 139.462 938.014 139.94C938.642 138.834 939.479 137.996 940.526 137.428C941.573 136.83 942.694 136.531 943.89 136.531C946.253 136.531 948.003 137.637 949.139 139.85C950.096 138.684 951.128 137.847 952.234 137.338C953.341 136.8 954.657 136.531 956.182 136.531C958.634 136.531 960.519 137.249 961.834 138.684C963.18 140.12 963.853 142.004 963.853 144.337V152.95C963.853 154.595 964.152 156.015 964.75 157.211L959.367 159.185Z" fill="#266A4D"/>
                <path d="M979.5 159.185C975.911 159.185 973.07 158.183 970.976 156.18C968.913 154.176 967.881 151.454 967.881 148.015C967.881 145.772 968.299 143.783 969.137 142.049C969.974 140.314 971.215 138.968 972.86 138.011C974.505 137.024 976.494 136.531 978.827 136.531C981.1 136.531 983.073 137.009 984.748 137.966C986.423 138.893 987.694 140.179 988.561 141.824C989.429 143.439 989.862 145.249 989.862 147.252C989.862 148.239 989.533 149.002 988.875 149.54C988.247 150.049 987.365 150.303 986.229 150.303H973.757C973.757 151.529 974.281 152.516 975.328 153.264C976.404 154.011 977.795 154.385 979.5 154.385C980.905 154.385 982.087 154.191 983.044 153.802C984.031 153.383 984.898 152.8 985.645 152.052L988.606 155.193C987.619 156.449 986.348 157.436 984.793 158.154C983.238 158.841 981.473 159.185 979.5 159.185ZM983.986 145.682C983.986 144.366 983.492 143.305 982.505 142.497C981.548 141.66 980.322 141.241 978.827 141.241C977.391 141.241 976.18 141.66 975.193 142.497C974.236 143.305 973.757 144.366 973.757 145.682H983.986Z" fill="#266A4D"/>
                <path d="M1014.24 159.185C1012.38 159.185 1010.72 158.752 1009.26 157.884C1007.79 157.017 1006.64 155.761 1005.8 154.116C1004.97 152.471 1004.55 150.512 1004.55 148.239C1004.55 145.817 1004.97 143.723 1005.8 141.959C1006.67 140.194 1007.87 138.849 1009.39 137.921C1010.95 136.994 1012.76 136.531 1014.82 136.531C1017.24 136.531 1019.26 137.443 1020.88 139.267V136.979H1026.58V152.636C1026.58 153.682 1026.67 154.55 1026.84 155.238C1027.02 155.925 1027.31 156.613 1027.7 157.301L1022.9 159.185C1022 158.198 1021.49 157.077 1021.37 155.821H1021.28C1020.44 156.897 1019.41 157.735 1018.19 158.333C1016.99 158.901 1015.67 159.185 1014.24 159.185ZM1015.45 154.475C1017.18 154.475 1018.5 153.922 1019.4 152.815C1020.29 151.679 1020.74 150.168 1020.74 148.284V147.477C1020.74 145.742 1020.29 144.277 1019.4 143.08C1018.53 141.854 1017.27 141.241 1015.63 141.241C1013.95 141.241 1012.67 141.839 1011.77 143.036C1010.9 144.232 1010.47 145.966 1010.47 148.239C1010.47 150.273 1010.89 151.828 1011.73 152.905C1012.59 153.952 1013.83 154.475 1015.45 154.475Z" fill="#266A4D"/>
                <path d="M1047.93 159.185C1047.42 158.288 1047.04 157.361 1046.8 156.404C1046.6 155.417 1046.49 154.31 1046.49 153.084V145.862C1046.49 142.841 1045.23 141.331 1042.72 141.331C1041.23 141.331 1040.02 141.914 1039.09 143.08C1038.19 144.247 1037.74 145.727 1037.74 147.522V158.737H1031.82V143.08C1031.82 142.183 1031.75 141.406 1031.6 140.748C1031.48 140.09 1031.22 139.357 1030.83 138.55L1036.08 136.531C1036.35 137.009 1036.59 137.578 1036.8 138.236C1037.04 138.893 1037.17 139.462 1037.2 139.94C1038.07 138.923 1039.13 138.101 1040.39 137.473C1041.68 136.845 1043.04 136.531 1044.47 136.531C1047.25 136.531 1049.27 137.338 1050.53 138.953C1051.78 140.538 1052.41 142.841 1052.41 145.862V152.95C1052.41 154.595 1052.71 156.015 1053.31 157.211L1047.93 159.185Z" fill="#266A4D"/>
                <path d="M1079.49 159.185C1075.9 159.185 1073.06 158.183 1070.96 156.18C1068.9 154.176 1067.87 151.454 1067.87 148.015C1067.87 145.772 1068.28 143.783 1069.12 142.049C1069.96 140.314 1071.2 138.968 1072.85 138.011C1074.49 137.024 1076.48 136.531 1078.81 136.531C1081.09 136.531 1083.06 137.009 1084.73 137.966C1086.41 138.893 1087.68 140.179 1088.55 141.824C1089.41 143.439 1089.85 145.249 1089.85 147.252C1089.85 148.239 1089.52 149.002 1088.86 149.54C1088.23 150.049 1087.35 150.303 1086.21 150.303H1073.74C1073.74 151.529 1074.27 152.516 1075.31 153.264C1076.39 154.011 1077.78 154.385 1079.49 154.385C1080.89 154.385 1082.07 154.191 1083.03 153.802C1084.02 153.383 1084.88 152.8 1085.63 152.052L1088.59 155.193C1087.6 156.449 1086.33 157.436 1084.78 158.153C1083.22 158.841 1081.46 159.185 1079.49 159.185ZM1083.97 145.682C1083.97 144.366 1083.48 143.305 1082.49 142.497C1081.53 141.66 1080.31 141.241 1078.81 141.241C1077.38 141.241 1076.17 141.66 1075.18 142.497C1074.22 143.305 1073.74 144.366 1073.74 145.682H1083.97Z" fill="#CF7914"/>
                <path d="M1097.86 147.477L1090.95 136.979H1097.59L1101.76 143.888L1105.94 136.979H1112.58L1105.67 147.477L1112.58 158.737H1105.85L1101.76 151.335L1097.68 158.737H1090.95L1097.86 147.477Z" fill="#CF7914"/>
                <path d="M1116.83 142.991C1116.83 141.914 1116.74 141.032 1116.56 140.344C1116.38 139.656 1116.09 138.968 1115.71 138.28L1120.51 136.396C1121.37 137.353 1121.88 138.49 1122.03 139.806C1123.97 137.563 1126.38 136.441 1129.25 136.441C1131.14 136.441 1132.81 136.89 1134.28 137.787C1135.77 138.684 1136.94 139.985 1137.78 141.69C1138.61 143.394 1139.03 145.428 1139.03 147.791C1139.03 150.153 1138.6 152.187 1137.73 153.892C1136.89 155.596 1135.71 156.897 1134.19 157.795C1132.66 158.662 1130.9 159.096 1128.89 159.096C1127.64 159.096 1126.49 158.871 1125.44 158.423C1124.39 157.944 1123.5 157.301 1122.75 156.494V168.561H1116.83V142.991ZM1127.86 154.385C1131.36 154.385 1133.11 152.187 1133.11 147.791C1133.11 145.667 1132.68 144.037 1131.81 142.901C1130.94 141.735 1129.69 141.151 1128.04 141.151C1126.28 141.151 1124.93 141.72 1124 142.856C1123.11 143.963 1122.66 145.458 1122.66 147.342V148.15C1122.66 149.884 1123.11 151.365 1124 152.591C1124.9 153.787 1126.19 154.385 1127.86 154.385Z" fill="#CF7914"/>
                <path d="M1153.79 159.185C1150.2 159.185 1147.36 158.183 1145.26 156.18C1143.2 154.176 1142.17 151.454 1142.17 148.015C1142.17 145.772 1142.58 143.783 1143.42 142.049C1144.26 140.314 1145.5 138.968 1147.15 138.011C1148.79 137.024 1150.78 136.531 1153.11 136.531C1155.39 136.531 1157.36 137.009 1159.03 137.966C1160.71 138.893 1161.98 140.179 1162.85 141.824C1163.71 143.439 1164.15 145.249 1164.15 147.252C1164.15 148.239 1163.82 149.002 1163.16 149.54C1162.53 150.049 1161.65 150.303 1160.51 150.303H1148.04C1148.04 151.529 1148.57 152.516 1149.61 153.264C1150.69 154.011 1152.08 154.385 1153.79 154.385C1155.19 154.385 1156.37 154.191 1157.33 153.802C1158.32 153.383 1159.18 152.8 1159.93 152.052L1162.89 155.193C1161.9 156.449 1160.63 157.436 1159.08 158.153C1157.52 158.841 1155.76 159.185 1153.79 159.185ZM1158.27 145.682C1158.27 144.366 1157.78 143.305 1156.79 142.497C1155.83 141.66 1154.61 141.241 1153.11 141.241C1151.68 141.241 1150.47 141.66 1149.48 142.497C1148.52 143.305 1148.04 144.366 1148.04 145.682H1158.27Z" fill="#CF7914"/>
                <path d="M1168.26 143.08C1168.26 142.183 1168.18 141.406 1168.03 140.748C1167.91 140.09 1167.66 139.357 1167.27 138.549L1172.52 136.531C1172.79 137.009 1173.03 137.577 1173.24 138.235C1173.47 138.893 1173.61 139.462 1173.64 139.94C1174.45 138.804 1175.28 137.951 1176.15 137.383C1177.05 136.815 1178.07 136.531 1179.2 136.531C1180.1 136.531 1180.88 136.65 1181.53 136.89C1182.22 137.129 1182.94 137.533 1183.69 138.101L1181.49 142.183C1180.98 141.884 1180.52 141.675 1180.1 141.555C1179.68 141.406 1179.22 141.331 1178.71 141.331C1177.15 141.331 1176 141.809 1175.25 142.766C1174.54 143.723 1174.18 145.174 1174.18 147.118V158.737H1168.26V143.08Z" fill="#CF7914"/>
                <path d="M1194.89 159.14C1192.76 159.14 1191.13 158.557 1190 157.391C1188.89 156.224 1188.34 154.55 1188.34 152.366V141.735H1184.34L1185.6 136.979H1188.43V132.448L1194.17 129.802V136.979H1200L1198.83 141.735H1194.26V152.501C1194.26 153.189 1194.41 153.682 1194.71 153.981C1195.01 154.28 1195.47 154.43 1196.1 154.43C1196.84 154.43 1197.52 154.28 1198.12 153.981L1199.51 158.243C1199 158.482 1198.3 158.692 1197.4 158.871C1196.53 159.051 1195.69 159.14 1194.89 159.14Z" fill="#CF7914"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M98.0174 190.538C97.8386 208.315 111.727 224.108 130.688 224.299C151.24 224.508 163.874 207.471 164.04 191.205C164.124 182.992 161.154 174.26 156.103 166.883C135.687 137.067 139.196 104.295 156.963 81.6293C169.622 65.4771 192.181 49.1773 223.282 48.4922C236.597 48.2003 247.513 38.3037 247.655 24.3083C247.8 10.0088 236.298 0.130677 223.776 0.00163113C211.759 -0.118197 206.671 6.37711 200.945 15.2229C175.363 54.7509 116.627 66.3957 89.2631 32.4935C72.809 12.1074 59.3862 2.20156 42.3308 2.0295C15.0225 1.75297 0.199668 24.5511 0.00231758 44.037C-0.24437 68.2116 19.2378 86.6621 41.4674 86.8864C73.9623 87.2151 82.0136 54.5635 111.968 74.0586C134.832 88.9388 125.961 137.435 113.713 156.54C104.104 171.528 98.1438 178.088 98.0174 190.538Z" fill="#CF7914"/>
                </svg>
                </a>
                <nav id="navbar" class="navbar">
                <button data-toggle="modal" data-target="#service-login" class="btn service-login-link bg-color-green">Daxil ol <i
                        class="bi bi-chevron-down"></i></button>

                <div class="navbar-custom-menu" style="display: none;">
                    <ul class="nav navbar-nav">
                        <li class="dropdown user user-menu show">
                            <!-- Menu Toggle Button -->
                            <a href="#" class="" data-toggle="dropdown" aria-expanded="true">
                            <!-- The user image in the navbar-->
                            <img src="img/userprofile.png" id="user_index_img" class="user-image" alt="User Image">
                            <!-- hidden-xs hides the username on small devices so only the image appears. -->
                            <!-- <span class="hidden-xs">John Abia</span> -->
                            </a>
                            <ul class="dropdown-menu show">
                            <!-- The user image in the menu -->
                            <li href="index-main.html?&point=profile" class="user-header">
                                <img src="img/userprofile.png" class="img-circle" id="user_index_img_large" alt="User Image">
                                <p id="name_index_block"> </p>
                            </li>
                            <!-- Menu Footer-->
                            <li class="user-footer">
                                <div class="pull-left">
                                    <a href="index-main.html?&point=profile" class="btn btn-default btn-flat">Profile</a>
                                </div>
                                <div class="pull-right">
                                    <a href="#" id="exit_profile_name" class="btn btn-default btn-flat">Log out</a>
                                </div>
                            </li>
                            </ul>
                        </li>
                        <!-- Control Sidebar Toggle Button -->
                    </ul>
                </div>
                <i class="bi bi-list mobile-nav-toggle"></i>
                </nav>
                <!-- .navbar -->
            </div>`,
    Couresel: `<div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
                        <ol class="carousel-indicators">
                        <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
                        <li data-target="#carouselExampleCaptions" data-slide-to="1" class=""></li>
                        

                        </ol>
                        <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img class="d-block w-100" src="img/sliderimg/2.png" />
                        </div>
                        <div class="carousel-item"><img class="d-block w-100" src="img/sliderimg/1.png" /></div>
                        <div class="carousel-item"><img class="d-block w-100" src="img/sliderimg/2.png" /></div>
                        
                        <!-- <img class="d-block w-100" data-src="holder.js/800x400?auto=yes&amp;bg=666&amp;fg=444&amp;text=Second slide" alt="Second slide [800x400]" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_17d669affe5%20text%20%7B%20fill%3A%23444%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_17d669affe5%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23666%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22247.31874084472656%22%20y%3D%22217.76000022888184%22%3ESecond%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" data-holder-rendered="true">
                            <div class="carousel-caption d-none d-md-block">
                                <h5>Second slide label</h5>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </div> -->
                        <!-- <div class="carousel-item ">
                            </div> -->
                        </div>
                        <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                        </a>
                        <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                        </a>
                    </div>`,
    ServiceTab: `<div class="row gy-4">
                    <div class="cstmtab  right-side col-md-12 col-sm-12 col-lg-12">
                       <div class="nav nav_custom_profile">
                          <ul>
                             <li value="0" key='practice' class="tab-section-main train-desct1 user-setting1 active">
                                <h3 class="tab-heading">Praktiki Məşğələlər</h3>
                                <span class="project-number">Ümumi Praktiki Məşğələlər -</span>
                                <span class="section-type-count-practice"></span>
                             </li>
                             <li value="1" key='training' class="tab-section-main  apply-cert1 user-setting1 ">
                                <h3 class="tab-heading">Təlimlər</h3>
                                <span class="project-number">Ümumi Təlimlər -</span>
                                <span class="section-type-count-training"></span>
                                <!-- <p class="tab-description">Real lahəyeler esasinda ve simulasiya sisteminde telimler daha effektiv olur.</p> -->
                             </li>
                             <li value="2" key='project' class="tab-section-main cert-desct1 ">
                                <h3 class="tab-heading">Biznes Layihələri</h3>
                                <span class="project-number">Ümumi Biznes Layihələri -</span>
                                <span class="section-type-count-project"></span>
                                <!-- <p class="tab-description">Real layihələrə qoşulun Təcrübə əldə edin CV-nizi iş təcrübəsi ilə zənginləşdirin.</p> -->
                             </li>
                          </ul>
                       </div>
                       <div class="d-flex flex-wrap w-100 " >
                          <div class=" col-md-2 col-sm-12 col-lg-2 text-center catagory-selector">
                             <p class="catagory-headline">Kateqoriyalar</p>
                             <ul class="list-group categories-list-all ">
                             </ul>
                          </div>
                          <div class="profile-body p-0 col-md-10 col-sm-12 col-lg-10">
                             <div class="profile-history tab" style="display: block;">
                             <a href='#' type='text' style="width:0px;height:0px;opacity:0;" 
                              id='single-card-section-list-hidden'>_</a>
                                <div class="d-flex flex-wrap single-card-section-list">
                                
                                </div>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>`


}

$(document).on('click', '.card_header', function (ev) {
    var sid = $(this).attr('sid');
    window.open('key.html?sid=' + sid, '_blank');
})


function makeId(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}