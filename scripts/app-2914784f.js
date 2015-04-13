!function(){"use strict";angular.module("blocks.routes",[])}(),function(){"use strict";function e(e,t){e.otherwise("/"),t.state("dashboard",{url:"/",controller:"DashboardController",templateUrl:"app/dashboard/dashboard.html"}).state("members",{url:"/members",controller:"MemberController",templateUrl:"app/member/member.html"}).state("member",{url:"/members/{memberId}",controller:"MemberController",templateUrl:"app/member/member.html"}).state("item",{params:{itemId:{},memberId:{}},parent:"member",controller:"ItemController",templateUrl:"app/item/show.html"}).state("swap",{url:"/swaps",controller:"SwapController",templateUrl:"app/swap/swap.html"})}var t=angular.module("blocks.routes");t.config(e),e.$inject=["$urlRouterProvider","$stateProvider"]}(),function(){"use strict";angular.module("app.swap",[])}(),function(){"use strict";function e(e,t){function s(){return i().then(function(){console.log("Activated Swap View")})}function i(){return t.newSwap={},t.createSwap=a,e.getSwapCategories().then(function(e){return t.swapCategories=e,t.swapCategories}),e.getSwaps().then(function(e){return t.swaps=e,t.swaps})}function a(s){e.createSwap(s).then(function(e){return t.swaps.push(e),t.newSwap={}})}s()}angular.module("app.swap").controller("SwapController",e),e.$inject=["dataservice","$scope"]}(),function(){"use strict";angular.module("app.member",[])}(),function(){"use strict";function e(e,t,s){function i(e){return a(e).then(function(){console.log("Activated Member View")})}function a(t){return e.getUser(t).then(function(e){return s.member=e,s.member})}s.swapSuggestions=[],i(t.memberId)}angular.module("app.member").controller("MemberController",e),e.$inject=["dataservice","$stateParams","$scope"]}(),function(){"use strict";angular.module("app.layout",[])}(),function(){"use strict";function e(e,t){function s(){i()}function i(){r.navRoutes=n.filter(function(e){return e.settings&&e.settings.nav}).sort(function(e,t){return e.settings.nav-t.settings.nav})}function a(t){if(!t.title||!e.current||!e.current.title)return"";var s=t.title;return e.current.title.substr(0,s.length)===s?"current":""}var r=this,n=t.getRoutes();r.isCurrent=a,s()}angular.module("app.layout").controller("Sidebar",e),e.$inject=["$route","routehelper"]}(),function(){"use strict";angular.module("app.item",[])}(),function(){"use strict";function e(e,t,s){function i(){return a().then(function(){console.log("Activated Item View")})}function a(){return t.swapId=null,t.createSwapSuggestion=r,e.getSwaps().then(function(e){return t.swaps=e,t.swaps}),e.getItem(s.memberId,s.itemId).then(function(e){return t.item=e,t.item})}function r(i){e.createSwapSuggestion(s.memberId,t.item,i).then(function(e){return console.log(e),t.item=e,t.item})}i()}angular.module("app.item").controller("ItemController",e),e.$inject=["dataservice","$scope","$stateParams"]}(),function(){"use strict";angular.module("app.directives",[])}(),function(){"use strict";function e(){var e={restrict:"E",template:"<div></div>",scope:{purchases:"=",suggestions:"="},replace:!0,link:function(e,t){e.$watchGroup(["purchases","suggestions"],function(e,s,i){if(e[0]&&e[1]){var a,r,n,l,o,d,c,u,m,p;for(a=[],m=i.purchases,o=0,c=m.length;c>o;o++){for(n=m[o],l={date:n.purchase_date,dairy:0,vegetables:0,fruit:0,grain:0,protein:0,fat:0,prepared_meals:0,uncategorized:0},p=n.items,d=0,u=p.length;u>d;d++)r=p[d],l[r.filtered_category]+=r.nutritional_data.servings_per_container*r.quantity;a.push(l)}for(var v=[],g=0;g<i.suggestions.length;g++)v.push(i.suggestions[g].created_at);Morris.Area({element:t,data:a,dateFormat:function(e){return new Date(e).toString()},xkey:"date",ykeys:["dairy","vegetables","fruit","grain","protein","fat","uncategorized","prepared_meals"],labels:["Dairy","Vegetables","Fruit","Grain","Protein","Fat","Uncategorized","Prepared Meals"],events:v,eventLineColors:["#ee0c0c"],pointSize:2,hideHover:"auto",resize:!1})}})}};return e}angular.module("app.directives").directive("weeklyPurchaseChart",e)}(),function(){"use strict";function e(){var e={templateUrl:"app/directives/sideNav.html",restrict:"E",scope:{member:"="},link:function(e){e.$watch("member",function(e){})}};return e}angular.module("app.directives").directive("sideNav",e)}(),function(){"use strict";function e(e){var t={templateUrl:"app/directives/memberInvite.html",restrict:"E",link:function(t){t.inviteEmail=null,t.responseMessage=null,t.inviteMember=function(){e.inviteUser(t.inviteEmail).then(function(e){t.inviteEmail=null,t.responseMessage=e})}}};return t}angular.module("app.directives").directive("memberInvite",e),e.$inject=["dataservice"]}(),function(){"use strict";function e(e){var t={templateUrl:"app/directives/itemsList.html",restrict:"E",scope:{itemslist:"=",member:"="},link:function(t){t.updateColorCode=function(s,i,a){e.updateColorCode(s,i).then(function(e){return t.itemslist[a]=e,s})}}};return t}angular.module("app.directives").directive("itemsList",e),e.$inject=["dataservice"]}(),function(){"use strict";angular.module("app.dashboard",[])}(),function(){"use strict";function e(e,t,s){function i(){var e=[r(),a()];return s.all(e).then(function(){console.log("Activated Dashboard View")})}function a(){return t.getUsersCount().then(function(t){return e.membersCount=t,e.membersCount})}function r(){return t.getUsers().then(function(t){for(var s=[],i=0;i<t.length;i++)i%4===0&&s.push([]),s[s.length-1].push(t[i]);return e.members=s,e.members})}i()}angular.module("app.dashboard").controller("DashboardController",e),e.$inject=["$scope","dataservice","$q"]}(),function(){"use strict";angular.module("app.core",["ngStorage","angular.filter","oauth","restangular","ui.router","ui.utils"])}(),function(){"use strict";function e(e,t,s){function i(){p();var t=e.all("users").getList().then(function(e){return e}).catch(function(e){console.log(e)});return s.when(t)}function a(){function e(e){return t=e.length,s.when(t)}var t=0;return i().then(e).catch(function(e){console.log(e)})}function r(t){function i(t){var i=t;return e.service("purchases",e.one("users",i.id)).getList({show_items:!0}).then(function(e){return i.purchases=e,i}).catch(function(e){console.log(e)}),s.when(i)}return p(),e.all("users").get(t).then(i).catch(function(e){console.log(e)})}function n(t){p();var i=e.all("memberships").customPOST({email:t},"invite").then(function(e){return{message:e[0],error:!1}}).catch(function(e){return{message:e.data[0],error:!0}});return s.when(i)}function l(t,i){p();var a=e.one("users",t).one("items",i).get().then(function(e){return e}).catch(function(e){console.log(e)});return s.when(a)}function o(t,i){p();var a=e.one("users",t.user_id).one("items",t.id);return a.color_code=i,a=a.put().then(function(e){return e}).catch(function(e){console.log(e)}),s.when(a)}function d(){p();var t=e.all("swaps").getList().then(function(e){return e}).catch(function(e){console.log(e)});return s.when(t)}function c(t){p();var i=e.all("swaps").post(t).then(function(e){return e}).catch(function(e){console.log(e)});return s.when(i)}function u(){p();var t=e.all("swap_categories").getList().then(function(e){return e}).catch(function(e){console.log(e)});return s.when(t)}function m(t,i,a){p();var i=e.one("users",t).one("items",i.id);i.swap_id=a;var r=i.put().then(function(e){return e}).catch(function(e){console.log(e)});return s.when(r)}function p(){t.token&&e.setDefaultRequestParams({access_token:t.token.access_token})}function v(){function e(){f=!0,console.log("Primed data")}return h?h:h=s.when(!0).then(e)}function g(e){var t=h||v();return t.then(function(){return s.all(e)}).catch(console.log('"ready" function failed'))}var h,f=!1,b={getUsers:i,getUsersCount:a,getUser:r,inviteUser:n,getItem:l,getSwapCategories:u,getSwaps:d,createSwap:c,createSwapSuggestion:m,updateColorCode:o,ready:g};return b}angular.module("app.core").factory("dataservice",e),e.$inject=["Restangular","$sessionStorage","$q"]}(),function(){"use strict";function e(e,t){e.html5Mode(!0).hashPrefix("!"),t.setBaseUrl("http://gopushcart.com/api/v1"),t.setRequestSuffix(".json")}var t=angular.module("app.core"),s={appErrorPrefix:"[Nutritionist Dashboard Error] ",appTitle:"Pushcart Nutritionist Dashboard",version:"0.2.0"};t.value("config",s),t.config(e),e.$inject=["$locationProvider","RestangularProvider"]}(),function(){"use strict";angular.module("pushcartCoach",["app.core","blocks.routes","app.directives","app.dashboard","app.member","app.swap","app.item"])}(),angular.module("pushcartCoach").run(["$templateCache",function(e){e.put("app/dashboard/dashboard.html",'<div class="row" ng-controller="DashboardController"><side-nav></side-nav><div class="large-10 medium-12 small-12 columns light-grey-bg-pattern"><div class="row"><div class="large-10 columns"><div class="page-name"><h3 class="left">Dashboard</h3><div class="clearfix"></div></div></div></div><div id="dashboard"><div class="row"><div class="large-3 medium-6 small-12 columns"><div class="stats border"><div class="left">Members<h3>{{membersCount}}</h3></div><i class="fi-torso right user"></i><div class="clearfix"></div></div></div><div class="large-3 medium-6 small-12 columns"><div class="stats border"><div class="left">New Purchases<h3>{{membersCount}}</h3></div><i class="fi-shopping-cart right orders"></i><div class="clearfix"></div></div></div><div class="large-3 medium-6 small-12 columns"></div></div><br><div class="row"><div class="large-10 columns"><div class="page-name"><h3 class="left">Members</h3><div class="clearfix"></div></div></div></div><div id="staff"><div class="row" ng-repeat="memberRow in members"><div class="large-3 medium-6 small-6 columns" ng-repeat="member in memberRow"><div class="staff-detail staff-hoverable" ui-sref="member({ memberId: member.id })" style="cursor:pointer;"><div class="staff-info"><h2>{{member.name}}</h2><div><b>Last Purchase:</b> {{member.last_purchase_date | date:\'shortDate\' }}</div><div><b>Purchases:</b> {{member.purchases_count}}</div><div><b>Last Activity:</b> {{member.last_activity_date | date:\'shortDate\' }}</div></div></div></div></div></div></div></div></div>'),e.put("app/directives/itemsList.html",'<table><tr ng-repeat="item in itemslist" style="list-style-type:none;"><td style="padding:0;"><div class="stoplight" ng-class="(!item.color_code || item.color_code == \'green\') ? \'stoplight-green\' : \'\'" ng-click="updateColorCode(item, \'green\', $index)"></div></td><td style="padding:0;"><div class="stoplight" ng-class="(!item.color_code || item.color_code == \'yellow\') ? \'stoplight-yellow\' : \'\'" ng-click="updateColorCode(item, \'yellow\', $index)"></div></td><td style="padding:0;"><div class="stoplight" ng-class="(!item.color_code || item.color_code == \'red\') ? \'stoplight-red\' : \'\'" ng-click="updateColorCode(item, \'red\', $index)"></div></td><td><a ui-sref="item({ memberId: member.id, itemId: item.id })">{{item.name}}</a></td></tr></table>'),e.put("app/directives/memberInvite.html",'<form name="member_invite"><input ng-model="inviteEmail" ng-required="true" type="text" placeholder="Enter email" ui-keypress="{ 13: \'inviteMember()\'}"><div style="font-size:10px;" ng-class="responseMessage.error ? \'red\' : \'blue\'">{{responseMessage.message}}</div></form>'),e.put("app/directives/oauth.html",'<a><i class="fi-power power-off" ng-show="show==\'logged-out\'" ng-click="login()"></i></a> <a><i class="fi-x power-off" ng-show="show==\'logged-in\'" ng-click="logout()"></i></a>'),e.put("app/directives/sideNav.html",'<div class="no-padding"><div class="large-2 medium-12 small-12 columns"><ul class="side-nav"><li ng-if="member"><div class="staff-detail"><div class="staff-info"><h2>{{member.name}}</h2><div><b>Household size:</b> {{member.household_size}}</div><div><b>Mission:</b> {{member.mission}}</div></div></div></li><li ng-if="!member"><div class="staff-detail"><div class="staff-info" style="padding-top:0;"><h3>Invite a new member!</h3><member-invite></member-invite></div></div></li><li ui-sref-active="active"><a ui-sref="dashboard"><i class="fi-home" style="font-size:2em;padding:0 15px;"></i> Dashboard</a></li><li ui-sref-active="active"><a ui-sref="swap"><i class="fi-like" style="font-size:2em;padding:0 15px;"></i> Swaps</a></li></ul></div></div>'),e.put("app/item/show.html",'<div class="large-12 columns"><div class="row"><div class="large-11 small-centered columns"><div class="custom-panel blue-bg"><div class="custom-panel-body"><h4>{{item.name}}</h4><table class="width-100 custom-table responsive"><tr><td style="padding:0;">Description</td><td style="padding:0 10px; text-align:left;"><b>{{item.description}}</b></td></tr><tr><td style="padding:0;">Vendor Category</td><td style="padding:0 10px; text-align:left;"><b>{{item.category}}</b></td></tr><tr><td style="padding:0;">Pushcart Category</td><td style="padding:0 10px; text-align:left;"><b>{{item.filtered_category}}</b></td></tr><tr><td style="padding:0;">Unit Price</td><td style="padding:0 10px; text-align:left;"><b>{{item.price_breakdown}}</b></td></tr><tr><td style="padding:0;">Quantity</td><td style="padding:0 10px; text-align:left;"><b>{{item.quantity}}</b></td></tr><tr><td style="padding:0;">Total Price</td><td style="padding:0 10px; text-align:left;"><b>{{item.total_price}}</b></td></tr><tr><td style="padding:0;">Sale?</td><td style="padding:0 10px; text-align:left;"><b>{{item.discounted}}</b></td></tr><tr ng-repeat="(key, value) in item.nutritional_data"><td style="padding:0;">{{key}}</td><td style="padding:0 10px; text-align:left;"><b>{{value}}</b></td></tr></table></div></div><div class="custom-panel"><div class="custom-panel-heading"><h4>Suggest a swap for this item!</h4></div><div class="custom-panel-body"><form name="swapSuggestionForm"><label>Swap</label><select ng-options="swap.id as swap.name for swap in swaps" ng-model="swapId" required=""></select><input type="submit" ng-click="createSwapSuggestion(swapId)" value="Save" class="button tiny radius coral-bg right"></form><div class="clearfix"></div></div></div><div class="large-12 columns" ng-if="item.swap"><h5>Swap Suggested</h5><p>{{item.swap.name}}</p></div></div></div></div>'),e.put("app/layout/sidebar.html",'<div data-cc-sidebar="" when-done-animating="vm.sidebarReady()" data-ng-controller="Sidebar as vm"><div class="sidebar-filler"></div><div class="sidebar-dropdown"><a href="#">Menu</a></div><div class="sidebar-inner"><div class="sidebar-widget"></div><ul class="navi"><li class="nlightblue fade-selection-animation" data-ng-class="vm.isCurrent(r)" data-ng-repeat="r in vm.navRoutes"><a href="#{{r.originalPath}}" data-ng-bind-html="r.settings.content"></a></li></ul></div></div>'),e.put("app/member/member.html",'<div class="row"><side-nav member="member"></side-nav><div class="large-10 columns"><div class="large-12 columns"><div class="custom-panel"><div class="custom-panel-heading"><h4>Weekly Purchases</h4></div><div class="custom-panel-body"><weekly-purchase-chart purchases="member.purchases" suggestions="swapSuggestions"></weekly-purchase-chart></div></div></div></div><div class="large-10 columns"><div class="large-3 medium-6 small-12 columns"><div class="stats border"><div class="left">Purchases<h3>{{member.purchases_count}}</h3></div><i class="fi-shopping-cart right orders"></i><div class="clearfix"></div></div></div><div class="large-3 medium-6 small-12 columns"><div class="stats border"><div class="left">Last Purchase<h3>{{ member.last_purchase_date | date:\'shortDate\' }}</h3></div><i class="fi-calendar right user"></i><div class="clearfix"></div></div></div><div class="large-3 medium-6 small-12 columns"><div class="stats border"><div class="left">Swaps Suggested<h3>{{ member.swaps_count }}</h3></div><i class="fi-like right sales"></i><div class="clearfix"></div></div></div><div class="large-3 medium-6 small-12 columns"></div></div></div><div class="row"><div id="inbox"><div class="row"><div class="large-11 small-centered columns"><div class="custom-panel blue-bg"><div class="custom-panel-heading" style="padding: 10px;"><div class="row"><div class="large-6 columns text-center"><div class="row"><div class="large-3 medium-3 small-3 columns"><span>Purchases</span></div></div></div></div></div><div class="custom-panel-body"><br><table class="width-100 custom-table responsive"><tr ng-repeat-start="purchase in member.purchases"><td>{{ purchase.purchase_date | date:\'medium\' }}</td><td>{{ purchase.vendor }}</td><td>{{ purchase.total_price | currency }}</td><td><a ng-click="purchase.showItems = !purchase.showItems" class="button">{{ purchase.items.length || 0 }} Items</a></td></tr><tr ng-show="purchase.showItems" ng-repeat-end=""><td style="width:35%"><items-list itemslist="purchase.items" member="member"></items-list></td><td style="width:65%" colspan="3"><ui-view></ui-view></td></tr></table></div></div></div></div></div></div>'),e.put("app/swap/swap.html",'<div class="row"><side-nav></side-nav><div class="large-10 columns"><div class="large-6 small-centered columns"><div class="custom-panel"><div class="custom-panel-heading"><h4>Create a new swap item</h4></div><div class="custom-panel-body"><form name="swapForm"><label>Name</label> <input type="text" name="name" ng-model="newSwap.name" required=""> <label>Category</label><select ng-options="category.id as category.name for category in swapCategories" ng-model="newSwap.swap_category_id" required=""></select><input type="submit" ng-click="createSwap(newSwap)" value="Save" class="button tiny radius coral-bg right"></form><div class="clearfix"></div></div></div></div></div><div class="large-10 columns"><div id="inbox"><div class="row"><div class="large-11 small-centered columns"><div class="custom-panel blue-bg"><div class="custom-panel-heading" style="padding: 10px;"><div class="row"><div class="large-6 columns text-center"><div class="row"><div class="large-3 medium-3 small-3 columns"><span>Swaps List</span></div></div></div></div></div><div class="custom-panel-body"><br><table class="width-100 custom-table responsive"><tr ng-repeat="swap in swaps"><td>{{ swap.name }}</td><td>{{ swap.swap_category.name }}</td><td><b>Vendor links:</b> <a href="{{ swap.freshdirect_link }}" target="_blank">FreshDirect</a>, <a href="{{ swap.peapod_link }}" target="_blank">Peapod</a>, <a href="{{ swap.instacart_link }}" target="_blank">Instacart</a></td></tr></table></div></div></div></div></div></div></div>')}]);