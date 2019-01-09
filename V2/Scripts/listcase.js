
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
            currentcity: '上海'
        },
        methods: {
            showSlidemenu: function () {
                sildemenu.show = true;
            },
            showSearch: function () {
                search.show = true;
            },
            showFilter: function () {
                filter.show = true;
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
            queryCase: function (pageIndex) {
                var vm = this, url = requestUrl.queryCaseByCondition, param = vm.model.listcase.param;
                //param.pageIndex = pageIndex - 1;
                axios.post(url, param).then(
                    function (response) {
                        //console.log(response.data);
                        vm.model.listcase.list = response.data.content;
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
        },
        components: {
            companyfooter: companyfooter,
            helporder: helporder,
            login: login,
            sildemenu: sildemenu,
            filter: filter,
            search: search
        },
        created: function () {
            var vm = this;
            vm.queryCase();
            setCurrentCity(function (city) {
                vm.currentcity = city;
            });

            login.callback = function () {
                vm.loginId = jQuery.cookie('loginId');
                vm.accessToken = jQuery.cookie('accessToken');
                sildemenu.loginId = jQuery.cookie('loginId');
                sildemenu.accessToken = jQuery.cookie('accessToken');
                console.log(vm.accessToken);
            };

            filter.callback = function (data) {
                console.log(data);
            }
        }
    });