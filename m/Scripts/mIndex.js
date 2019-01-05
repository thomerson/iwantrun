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
    verify: 'Json/verify.json'
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
            model: {
                index: {
                    bannerList: [],
                    currentmenu: 'prodution',
                    cases: [],
                    productions: [],
                    locations:[]
                },
                order: {
                    isshowall: false
                }
            },
            show: {
                sildeMenu: false
            },
            mask: false,
            loginId: '18018336171',
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
        created: function () {
            var vm = this;
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
                        console.log(response.data);
                        vm.model.index.productions = response.data.content;
                    })
            },
            queryLocationByCondition: function (pageIndex) {
                var vm = this, url = "../" + requestUrl.querylocationByCondition, param = {};
                param.pageIndex = pageIndex - 1;
                axios.post(url, param).then(
                    function (response) {
                        console.log(response.data);
                        var list = response.data;
                        //if (list != '') {
                        //	vm.List = list.content;
                        //	vm.locationIndexList = list.content;
                        //}
                    })
            },
            showOrder: function () {
                //window.location.href = '../m/ordersubmit.html';
                var vm = this;
                vm.currentpage = 'order';
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