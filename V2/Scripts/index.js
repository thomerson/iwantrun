
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


var appIndex = new Vue(
    {
        el: "#container",
        data: {
            loginId: jQuery.cookie('loginId'),
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
                    list: [],
                    showbtnmore: true
                },
                listproduction: {
                    searchlist: {},
                    param: {
                        pageIndex: 1,
                        pageSize: 10,
                        duration: [],
                        activitytype: [],
                        personNum: []
                    },
                    list: [],
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
            showSlidemenu: function () {
                sildemenu.show = true;
            },
            showSearch: function () {
                search.show = true;
            },
            getBanner: function () {
                var vm = this, url = requestUrl.castposition, param = {};
                axios.post(url, param).then(
                    function (response) {
                        //console.log(response.data);
                        var data = response.data;
                        vm.model.index.bannerList = $.parseJSON(data.list);
                    })
            },
            queryCaseByCondition: function (pageIndex) {
                var vm = this, url = requestUrl.queryCaseByCondition, param = {};
                param.pageIndex = pageIndex - 1;
                axios.post(url, param).then(
                    function (response) {
                        //console.log(response.data);
                        vm.model.index.list = response.data.content;
                    })
            },
            queryProdutionByCondition: function (pageIndex) {
                var vm = this, url = requestUrl.queryProdutionByCondition, param = {};
                param.pageIndex = pageIndex - 1;
                axios.post(url, param).then(
                    function (response) {
                        //console.log(response.data);
                        vm.model.index.productions = response.data.content;
                    })
            },
            queryLocationByCondition: function (pageIndex) {
                var vm = this, url = requestUrl.querylocationByCondition, param = {};
                param.pageIndex = pageIndex - 1;
                axios.post(url, param).then(
                    function (response) {
                        //console.log(response.data.content);
                        vm.model.index.locations = response.data.content;
                    })
            },
        },
        components: {
            companyfooter: companyfooter,
            helporder: helporder,
            login: login,
            sildemenu: sildemenu,
            search: search
        },
        created: function () {
            var vm = this;
            setCurrentCity(function (city) {
                vm.currentcity = city;
            });

            vm.getBanner();
            vm.queryCaseByCondition(1);
            vm.queryProdutionByCondition(1);
            vm.queryLocationByCondition(1);

            //vm.setCurrentPage('listcase');
        }
    });