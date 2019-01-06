var validate = {
    isMobile: function (mobile) {
        if (!mobile) {
            return '请输入手机号';
        }
        var regex = new RegExp('[1][3578]\\d{9}', 'gim');
        var is = regex.test(mobile);
        if (!is) {
            return '手机号无效，请重新输入';
        }
        return null;
    },
    validatePwd: function (password) {
        if (!password) {
            return "请输入密码";
        }

        var length = password.length;
        if (length < 8 || length > 16) {
            return "密码长度必须大于等于8位，小于等于16位";
        }

        //	var regex = new RegExp('(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}', 'g');
        //	var regex = new RegExp('^([a-zA-Z]+.*[0-9]+.*[!@#$%^&*]+)|([a-zA-Z]+.*[!@#$%^&*]+.*[0-9]+)|([0-9]+.*[!@#$%^&*]+.*[a-zA-Z]+)|([0-9]+.*[a-zA-Z]+.*[!@#$%^&*]+)|([!@#$%^&*]+.*[a-zA-Z]+.*[0-9]+)|([!@#$%^&*]+.*[0-9]+.*[a-zA-Z]+)$', 'g');
        var regex = new RegExp('^([a-zA-Z]+.*[0-9]+.*[~`@#$%^&*\\-_=+|\?/()<>\\[\\]{}\",.;\'!]+)' +
            '|([a-zA-Z]+.*[~`@#$%^&*\\-_=+|\?/()<>\\[\\]{}\",.;\'!]+.*[0-9]+)' +
            '|([0-9]+.*[~`@#$%^&*\\-_=+|\?/()<>\\[\\]{}\",.;\'!]+.*[a-zA-Z]+)' +
            '|([0-9]+.*[a-zA-Z]+.*[~`@#$%^&*\\-_=+|\?/()<>\\[\\]{}\",.;\'!]+)' +
            '|([~`@#$%^&*\\-_=+|\?/()<>\\[\\]{}\",.;\'!]+.*[a-zA-Z]+.*[0-9]+)' +
            '|([~`@#$%^&*\\-_=+|\?/()<>\\[\\]{}\",.;\'!]+.*[0-9]+.*[a-zA-Z]+)$', 'g');
        var correct = regex.test(password);
        if (!correct) {
            return '密码格式不正确，请重新输入';
        }
    },
    validateSMScode: function (smsCode) {
        if (!smsCode) {
            return '请输入短信验证码';
        }
        var regex = new RegExp('\\d{6}', 'g');
        var correct = regex.test(smsCode);
        if (!correct) {
            return '短信验证码格式不正确，请重新输入';
        }
    }
};

window.onload = function () {
    var swiper = new Swiper('.swiper-container', {
        autoplay: true,
        speed: 2000,
        autoplayDisableOnInteraction: false,
        loop: true,
        centeredSlides: true,
        slidesPerView: 3,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        //onInit: function (swiper) {
        //    swiper.slides[1].className = "swiper-slide swiper-slide-active";
        //},
        breakpoints: {
            668: {
                slidesPerView: 1,
            }
        }
    });
}

//-------------------------------------------------------------------request url ---------------------------------------------
var requestUrl = {
    //Release
    //queryProdutionByCondition: 'production/queryProdutionByCondition',
    //querylocationByCondition:'location/querylocationByCondition',
    //queryCaseByCondition:'case/queryCaseByCondition',
    //trade_status:'trade_status/query',
    //webSiteCooperativeLogo:'webSiteCooperativeLogo/query',
    //websiteNews:'websiteNews/query',
    //castposition:'castposition/findAll',
    //produtionSearchList:'production/produtionSearchList',
    //locationSearchList:'location/locationSearchList',
    //caseSearchList:'case/caseSearchList',
    //login: 'purchaserAccount/login',
    //register: 'purchaserAccount/register',
    //logout:'purchaserAccount/logout',
    //findMixedByLoginId:'purchaserAccount/findMixedByLoginId',
    //verify:'token/verify',
    //getSMSCode:'smsCode/getSMSCode'

    //DEV
    queryProdutionByCondition: 'Json/queryProdutionByCondition.json',
    querylocationByCondition: 'Json/querylocationByCondition.json',
    queryCaseByCondition: 'Json/queryCaseByCondition.json',
    trade_status: 'Json/trade_status.json',
    webSiteCooperativeLogo: 'Json/webSiteCooperativeLogo.json',
    websiteNews: 'Json/websiteNews.json',
    castposition: 'Json/castposition.json',
    produtionSearchList: 'Json/produtionSearchList.json',
    locationSearchList: 'Json/locationSearchList.json',
    caseSearchList: 'Json/caseSearchList.json',
    login: 'Json/login.json',
    register: 'Json/register.json',
    logout: 'Json/logout.json',
    findMixedByLoginId: 'Json/findMixedByLoginId.json',
    verify: 'Json/verify.json',
    getSMSCode: 'Json/getSMSCode.json'
};

//dev
axios.post = axios.get;

Vue.component('indexheader', {
    template: '#indexheader'
});

var appIndex = new Vue(
    {
        el: "#container",
        data: {
            currentpage: 'index',
            //loginId: '17521230795',
            loginId: jQuery.cookie('loginId'),
            //accessToken: null,
            accessToken: jQuery.cookie('accessToken'),
            model: {
                index: {
                    bannerList: [],
                    currentmenu: 'prodution',
                    cases: [],
                    productions: [],
                    locations: []
                },
                order: {
                    isshowall: false
                },
                login: {
                    isshowregister: false,
                    isbymess: false, //动态码登录，
                    smsCode: '',//短信验证码
                    errMsg: null,
                    autoLogin: false,
                    password: null
                },
                listcase: {
                    searchlist: {},
                    param: {
                        pageIndex: 1,
                        pageSize: 10,
                        duration: [],
                        activitytype: [],
                        personNum: []
                    },
                    cases: [],
                    showbtnmore: true
                }
            },
            show: {
                sildeMenu: false,
                search: false,
                filter: false
            },
            SMS: {
                timer: null,
                disabled: false,
                count: 0,
                btnText: '发送验证码'
            },
            account: {
                headimg: 'images/head_img.png',
                nickname: jQuery.cookie('loginId'),
                phone: jQuery.cookie('loginId'),
                company: {
                    name: '上海沐跑科技有限公司',
                    licenses: [],
                    hasCredential: false,
                    companyTypeId: 0,
                    companySizeId: 10,
                    type: '互联网软件',
                    personNum: 200
                }
            },
            currentcity: '上海',//当前定位城市
            mask: false,
            loginBtnUl: true,
            loginIdUl: false,
            productIndexList: [],
            locationIndexList: [],
            caseIndexList: [],
            news: [],
            newsIndex: 0,
            trades: [],
            tradeIndex: 0,
            partners: [],
            tailWeixinIcon: false
        },
        methods: {
            setCurrentPage: function (page, login) {
                var vm = this;
                if (login && (!vm.loginId || !vm.accessToken)) {
                    page = 'login'; //先登录
                }
                vm.currentpage = page;
                vm.show.sildeMenu = false;
                window.scrollTo(0, 0);

                var init = {
                    listcase: function () {
                        //if (!vm.model.listcase.searchlist) {
                        vm.getcaseSearchList();
                        vm.queryCase();
                        //}
                    }
                };
                if (typeof init[page] === 'function') {
                    init[page]();
                }
            },
            setCurrencity: function () {
                var vm = this, city = jQuery.cookie('currentcity');
                if (!city) {
                    //获取当前位置信息
                }
                vm.currentcity = city;
            },
            getBanner: function () {
                var vm = this, url = "../" + requestUrl.castposition, param = {};
                axios.post(url, param).then(
                    function (response) {
                        //console.log(response.data);
                        var data = response.data;
                        vm.model.index.bannerList = $.parseJSON(data.list);
                    })
            },
            queryCaseByCondition: function (pageIndex) {
                var vm = this, url = "../" + requestUrl.queryCaseByCondition, param = {};
                param.pageIndex = pageIndex - 1;
                axios.post(url, param).then(
                    function (response) {
                        //console.log(response.data);
                        vm.model.index.cases = response.data.content;
                    })
            },
            queryProdutionByCondition: function (pageIndex) {
                var vm = this, url = "../" + requestUrl.queryProdutionByCondition, param = {};
                param.pageIndex = pageIndex - 1;
                axios.post(url, param).then(
                    function (response) {
                        //console.log(response.data);
                        vm.model.index.productions = response.data.content;
                    })
            },
            queryLocationByCondition: function (pageIndex) {
                var vm = this, url = "../" + requestUrl.querylocationByCondition, param = {};
                param.pageIndex = pageIndex - 1;
                axios.post(url, param).then(
                    function (response) {
                        //console.log(response.data.content);
                        vm.model.index.locations = response.data.content;
                    })
            },
            switchLogin: function (isshowregister) {
                var vm = this;
                vm.model.login.isshowregister = !!isshowregister;
            },
            switchLogintype: function (isbymess) {
                var vm = this;
                vm.model.login.isbymess = !!isbymess;
            },
            sendVerifyCode: function () {
                var TIME_COUNT = 60, vm = this, url = "../" + requestUrl.getSMSCode, param = {
                    'mobile': vm.loginId
                };
                if (!vm.SMS.timer) {
                    vm.SMS.count = TIME_COUNT;
                    vm.SMS.disabled = true;
                    vm.SMS.timer = setInterval(() => {
                        if (vm.SMS.count > 0 && vm.SMS.count <= TIME_COUNT) {
                            console.log(vm.SMS.count);
                            vm.SMS.btnText = vm.SMS.count + 's后重发';
                            vm.SMS.count--;
                        } else {
                            vm.SMS.disabled = false;
                            clearInterval(vm.SMS.timer);
                            vm.SMS.timer = null;
                            vm.SMS.btnText = '发送验证码';
                            vm.model.login.errMsg = null;
                        }
                    }, 1000);
                }


                axios.post(url, param).then(function (response) {
                    //console.log(response.data);
                    var data = response.data;
                    var encryptedSMSCode = $.cookie('encryptedSMSCode');
                    if (data) {
                        var returnstatus = data.returnstatus;
                        var message = data.message;

                        if (returnstatus == 'Success') {
                            vm.model.login.errMsg = '短信已发送';
                        } else if (returnstatus == 'Faild') {
                            console.log(message);
                            vm.model.login.errMsg = '短信获取失败，请联系管理员';
                        } else {
                            if (message) {
                                vm.model.login.errMsg = message;
                            } else {
                                vm.model.login.errMsg = '短信获取失败，请重新获取';
                            }
                        }
                    } else {
                        vm.model.login.errMsg = '短信获取失败，请重新获取';
                    }
                });
            },
            login: function () {
                var vm = this, url = "../" + requestUrl.login, param = {
                    smsCode: vm.model.login.smsCode,
                    messageLogin: vm.model.login.isbymess,
                    autoLogin: vm.model.login.autoLogin,
                    account: {
                        loginId: vm.loginId,
                        smsCode: vm.model.login.smsCode,
                        password: vm.model.login.password,
                        mobileNumber: vm.loginId
                    }
                };

                vm.model.login.errMsg = null;
                // 先校验手机号
                vm.model.login.errMsg = validate.isMobile(vm.loginId);
                if (vm.model.login.errMsg) {
                    return false;
                }


                if (vm.login.isbymess) {
                    //验证码
                    vm.model.login.errMsg = validate.validateSMScode(vm.model.login.smsCode);
                } else {
                    //密码
                    vm.model.login.errMsg = validate.validatePwd(vm.model.login.password);
                }
                if (vm.model.login.errMsg) {
                    return false;
                }

                axios.post(url, param).then(function (response) {
                    console.log(response.data);
                    var data = response.data;
                    var messageBody = data.messageBody;
                    if (messageBody) {
                        var message = JSON.parse(messageBody);
                        vm.model.login.errMsg = message.errorMsg;
                        if (vm.model.login.errMsg) {
                            return;
                        }
                    }
                    vm.accessToken = data.accessToken;
                    jQuery.cookie('loginId', vm.loginId);
                    jQuery.cookie('accessToken', vm.accessToken);
                    vm.currentpage = 'index';
                });
            },
            logout: function () {
                var vm = this;
                jQuery.cookie('loginId', '');
                jQuery.cookie('accessToken', '');
                vm.loginId = '';
                vm.accessToken = '';
                vm.setCurrentPage('index');
            },
            register: function () {
                var vm = this, url = "../" + requestUrl.register, param = {
                    smsCode: vm.model.login.smsCode,
                    account: {
                        loginId: vm.loginId,
                        smsCode: vm.model.login.smsCode,
                        password: vm.model.login.password,
                        rePassword: vm.model.login.password,
                        mobileNumber: vm.loginId
                    }
                };

                vm.model.login.errMsg = null;
                // 先校验手机号
                vm.model.login.errMsg = validate.isMobile(vm.loginId);
                if (vm.model.login.errMsg) {
                    return false;
                }


                //验证码
                vm.model.login.errMsg = validate.validateSMScode(vm.model.login.smsCode);
                if (vm.model.login.errMsg) {
                    return false;
                }
                //密码
                vm.model.login.errMsg = validate.validatePwd(vm.model.login.password);

                if (vm.model.login.errMsg) {
                    return false;
                }

                axios.post(url, param).then(function (response) {
                    console.log(response.data);
                    var data = response.data;
                    var messageBody = data.messageBody;
                    if (messageBody) {
                        var message = JSON.parse(messageBody);
                        vm.model.login.errMsg = message.errorMsg;
                        if (vm.model.login.errMsg) {
                            return;
                        }
                    }
                    vm.accessToken = data.accessToken;
                    jQuery.cookie('loginId', vm.loginId);
                    jQuery.cookie('accessToken', vm.accessToken);
                    vm.currentpage = 'index';
                });
            },
            getuser: function () {
                var vm = this, url = "../" + requestUrl.findMixedByLoginId, param = {};
                axios.post(url, param).then(
                    function (response) {
                        console.log(response.data);
                        var data = response.data;
                        if (data) {
                            var errMsg = data.errMsg;
                            if (errMsg) {
                                vm.setCurrentPage('login');
                            }
                            var info = data.userInfo;
                            var headImgs = data.headImgs;
                            var companyCredentials = data.companyCredentials;
                            var loginInfo = data.loginInfo;
                            if (info) {
                                if (headImgs && headImgs.length > 0) {
                                    vm.account.headimg = headImgs[0].filePath;
                                }
                                vm.account.nickname = info.name;
                                if (loginInfo) {
                                    vm.account.phone = loginInfo.mobileNumber;
                                }
                                vm.account.securityanswer.question = info.question;
                                vm.account.securityanswer.answer = info.answer;
                                vm.account.company.name = info.companyName;
                                if (companyCredentials) {
                                    for (var i = 0; i < companyCredentials.length; i++) {
                                        vm.account.company.licenses.push(companyCredentials[i].filePath);
                                    }
                                    vm.account.company.hasCredential = true;
                                    //vm.nextCompanyCredential();
                                }

                                var company = vm.account.company;

                                company.companyTypeId = info.companyTypeId;
                                company.companySizeId = info.companySizeId;
                                company.type = company.types[info.companyTypeId];
                                company.personNum = company.personNums[info.companySizeId];

                                //setCompanyOption();
                            }
                        }
                    })
            },
            submitOrder: function () { }, //提交需求 TODO,
            getcaseSearchList: function () {
                var vm = this, url = "../" + requestUrl.caseSearchList, param = { name: 'common' };
                axios.post(url, param).then(
                    function (response) {
                        console.log(response.data);
                        vm.model.listcase.searchlist = response.data;
                    })
            },
            resetCase: function () {
                var vm = this;
                vm.model.listcase.param = {
                    pageIndex: 0,
                    pageSize: 10,
                    duration: [],
                    activitytype: [],
                    personNum: []
                };
                $('.icon-checkbox-blank').removeClass('icon-checkbox-blank');
            },
            queryCase: function (pageIndex) {
                var vm = this, url = "../" + requestUrl.queryCaseByCondition, param = vm.model.listcase.param;
                //param.pageIndex = pageIndex - 1;
                axios.post(url, param).then(
                    function (response) {
                        //console.log(response.data);
                        vm.model.listcase.cases = response.data.content;
                        vm.model.listcase.showbtnmore = response.data.content.length == vm.model.listcase.param.pageSize;
                    })
            },
            getMoreCase: function () {
                var vm = this;
                vm.model.listcase.param.pageIndex += 1;
                vm.queryCase();
            },
            activitytypechange: function ($event, id) {
                //console.log($event.target);
                //console.log(id);
                var vm = this, $dom = $($event.target);
                console.log($dom);
                if ($dom.hasClass('icon-checkbox-blank')) {
                    $dom.removeClass('icon-checkbox-blank');
                    var index = vm.model.listcase.param.activitytype.indexOf(id);
                    vm.model.listcase.param.activitytype.splice(index, 1);
                } else {
                    $dom.addClass('icon-checkbox-blank');
                    vm.model.listcase.param.activitytype.push(id);
                }
                //console.log(vm.model.listcase.param.activitytype);
                vm.queryCase("1");

            },
            durationchange: function ($event, id) {
                var vm = this, $dom = $($event.target);
                console.log($dom);
                if ($dom.hasClass('icon-checkbox-blank')) {
                    $dom.removeClass('icon-checkbox-blank');
                    var index = vm.model.listcase.param.duration.indexOf(id);
                    vm.model.listcase.param.duration.splice(index, 1);
                } else {
                    $dom.addClass('icon-checkbox-blank');
                    vm.model.listcase.param.duration.push(id);
                }
                vm.queryCase("1");
            },
            personNumchange: function ($event, id) {
                var vm = this, $dom = $($event.target);
                console.log($dom);
                if ($dom.hasClass('icon-checkbox-blank')) {
                    $dom.removeClass('icon-checkbox-blank');
                    var index = vm.model.listcase.param.personNum.indexOf(id);
                    vm.model.listcase.param.personNum.splice(index, 1);
                } else {
                    $dom.addClass('icon-checkbox-blank');
                    vm.model.listcase.param.personNum.push(id);
                }
                vm.queryCase("1");
            },
        },
        components: {
            companyfooter: { template: '#companyfooter' }
        },
        created: function () {
            var vm = this;
            vm.setCurrencity();
            vm.getBanner();
            vm.queryCaseByCondition(1);
            vm.queryProdutionByCondition(1);
            vm.queryLocationByCondition(1);

            //vm.setCurrentPage('listcase');
        }
    });