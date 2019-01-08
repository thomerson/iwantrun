﻿var appIndex = new Vue(
    {
        el: "#container",
        data: {
            loginId: jQuery.cookie('loginId'),
            accessToken: jQuery.cookie('accessToken'),
            account: {
                headimg: 'images/head_img.png',
                nickname: jQuery.cookie('loginId'),
                phone: jQuery.cookie('loginId'),
                company: {
                    //name: '上海沐跑科技有限公司',
                    //licenses: [],
                    //hasCredential: false,
                    //companyTypeId: 0,
                    //companySizeId: 10,
                    //type: '互联网软件',
                    //personNum: 200
                },
                ordersTotal: 0,
                favouriteTotal: 0
            },
        },
        methods: {
            getuser: function () {
                var vm = this, url = requestUrl.findMixedByLoginId, param = {};
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
                                vm.account.company.name = info.companyName;
                                if (companyCredentials) {
                                    vm.account.company.hasCredential = true;
                                }

                            }
                        }
                    })
            },
            getOrders: function () {
                var vm = this, url = requestUrl.getOrderListByLoginId, param = {
                    pageIndex: 0,
                    loginId: vm.loginId
                };
                axios.post(url, param).then(function (response) {
                    console.log(response.data);
                    var data = response.data;
                    if (data && data.pageInfo && data.pageInfo.total) {
                        vm.account.ordersTotal = data.pageInfo.total;
                    }
                });
            },
            getFavourite: function () {
                var vm = this, url = requestUrl.favourite, param = {
                    //type: null
                };
                axios.post(url, param).then(function (response) {
                    console.log(response.data);
                    var data = response.data;
                    if (data && data.pageInfo && data.pageInfo.total) {
                        vm.account.favouriteTotal = data.pageInfo.total;
                    }
                });
            },
            logout: function () {
                var vm = this;
                jQuery.cookie('accessToken', '');
                vm.accessToken = '';
                window.location.href = "index.html";
            }
        },
        created: function () {
            var vm = this;
            pageHandler();
            vm.getuser();
            vm.getOrders();
        }
    });