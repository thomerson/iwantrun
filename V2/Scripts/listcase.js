
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
            currentcity: '上海'
        },
        methods: {
            queryCaseByCondition: function (pageIndex) {
                var vm = this, url = requestUrl.queryCaseByCondition, param = {};
                param.pageIndex = pageIndex - 1;
                axios.post(url, param).then(
                    function (response) {
                        //console.log(response.data);
                        vm.model.index.list = response.data.content;
                    })
            },
            getcaseSearchList: function () {
                var vm = this, url = requestUrl.caseSearchList, param = { name: 'common' };
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
            companyfooter: companyfooter,
            helporder: helporder
        },
        created: function () {
            var vm = this;
            vm.resetCase();
            vm.getcaseSearchList();
            vm.queryCase();
            setCurrentCity(function (city) {
                vm.currentcity = city;
            });
        }
    });