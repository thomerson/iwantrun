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
    Pwd: function (password) {
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
    SMScode: function (smsCode) {
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
            currentpage: 'login',
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

                }
            },
            show: {
                sildeMenu: false
            },
            mask: false,
            loginId: '17521230795',
            accessToken: null,
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
            setCurrentPage: function (page) {
                var vm = this;
                vm.currentpage = page;
                vm.show.sildeMenu = false;
                window.scrollTo(0, 0);
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
                var vm = this, url = "../" + requestUrl.getSMSCode, param = {
                    'mobile': vm.loginId
                };
                axios.post(url, param).then(function (response) {
                    console.log(response.data);
                });
            }
        },
        components: {
            companyfooter: { template: '#companyfooter' },
            helporder: { template: '#helporder' },
            //indexheader: { template: '#indexheader' }
        },
        //template: {
        //    helporder: '#helporder'
        //},
        created: function () {
            var vm = this;
            vm.getBanner();
            vm.queryCaseByCondition(1);
            vm.queryProdutionByCondition(1);
            vm.queryLocationByCondition(1);
        }
    });