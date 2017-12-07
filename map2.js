       jQuery(document).ready(function() {

jQuery.getScript("/js/cities.js", function() {
});


           ymaps.ready(init);

           function init() {
               var myMap = new ymaps.Map('map', {
                       center: [53.182762, 50.093797],
                       zoom: 17,
                   //    controls: ['smallMapDefaultSet']
                       //      controls: ['zoomControl', 'searchControl', 'typeSelector',  'fullscreenControl']
                   }, {
                       searchControlProvider: 'yandex#search'
                   }),


                   menu = jQuery('<div class="panel-group" id="accordion"></div>');

               for (var i = 0, l = groups.length; i < l; i++) {
                   createMenuGroup(groups[i],i);
               }


               function createMenuGroup(group,i) {
                   // Пункт меню.

              	   var cn = groups[i].name.split(' ').pop(),
                       BalloonContentLayout = ymaps.templateLayoutFactory.createClass(
                           '<div class="ballon"><img style="background: transparent;  border: none;border-radius: none;padding: 0 0 0 10px; " src="/images/map/logo2.png?v=1" class="ll"/><p style="padding-top: 0;padding-left:10px;margin:7px 0px;">' + group.balloon + '</p><img class="close" id="close" style="background: transparent;  border: none;border-radius: none;padding: 0px;" src="/images/map/close.png"/></div>', {
                               build: function() {
                                   BalloonContentLayout.superclass.build.call(this);
                                   jQuery('#close').bind('click', this.onCounterClick);
                               },
                               clear: function() {
                                   jQuery('#close').unbind('click', this.onCounterClick);
                                   BalloonContentLayout.superclass.clear.call(this);
                               },
                               onCounterClick: function() {
                                   myMap.balloon.close();
                               }
                           }),


                       placemark = new ymaps.Placemark(group.center, {
                           hintContent: group.name
                       }, {
                           balloonContentLayout: BalloonContentLayout,
                           balloonPanelMaxMapArea: 0,
                           iconLayout: 'default#image',
                           iconImageHref: '/images/map/icon22.png',
                           iconImageSize: [50, 50],
                           iconImageOffset: [-32, -50],
                           balloonContentSize: [290, 79],
                           balloonLayout: "default#imageWithContent",
                           balloonImageHref: '/images/map/ballon222.png',
                           balloonImageOffset: [-140, -90],
                           balloonImageSize: [280, 89],
                           balloonShadow: true,
                           balloonAutoPan: true
                       });


                   // Коллекция для геообъектов группы.
                   collection = new ymaps.GeoObjectCollection(null),

                       // Добавляем коллекцию на карту.
                       myMap.geoObjects.add(collection);

                   // Добавляем метку в коллекцию.
                   collection.add(placemark);

		// Устанавливаем заголовок карты с координатами (по городу)
                   if (jQuery("H1:contains('" + cn + "')").length) {
		       myMap.setCenter(group.center,14).then(function () {       placemark.balloon.open(); });
                       document.getElementById("abs").innerHTML = group.descr;
                   var boldMenu = true;
                   }
			//Делаем пункт меню (город) жирным
		var menuItem = boldMenu ? jQuery('<div class="panel panel-default"><div class="panel-heading">  <h4 class="panel-title bold"><a href="">' + group.name + '</a>  </h4>') :
                   jQuery('<div class="panel panel-default"><div class="panel-heading">  <h4 class="panel-title"><a href="">' + group.name + '</a>  </h4>');

                   // Добавляем подменю.
                   menuItem
                       // Добавляем пункт в меню.
                       .appendTo(menu)
                       // По клику удаляем/добавляем коллекцию на карту и скрываем/отображаем подменю.
                       .find('a')
                       .bind('click', function(e) {
                           e.preventDefault();
                           (myMap.getZoom() < 13) ? myMap.setZoom(14, {
                               smooth: true
                           }): false;
                           myMap.panTo(group.center).then(function() {
                               placemark.balloon.open();
                           });
                           document.getElementById("abs").innerHTML = group.descr;
			   jQuery('.wi1').children('a').attr( "href", "tel:"+group.tel+"").find('span').text(group.num);
		           if(jQuery('.wi2 a').attr("onclick")) jQuery('.wi2').children('a').attr( "onclick", "location.href='/mail.ru.php?city="+group.cit+"'").html(group.email);
			   else if(jQuery('.wi2 a').attr("href")) jQuery('.wi2').children('a').attr( "href", "/mail.ru.php?city="+group.cit+"").html(group.email);
			   //(i-1) using cit is better, cause cities would be added by alphabet...

                           // made me bold (menu item)
                           //   jQuery('.panel-title a').css("fontWeight", "normal");
                           //   jQuery(this).css("fontWeight", "bold");

                           /*               if (!placemark.balloon.isOpen()) {
                                               placemark.balloon.open();
                                           } else {
                                               placemark.balloon.close();
                                           }
                           */
                       });
                                                                     
               }
               menu.appendTo(jQuery('.leftmap'));
               myMap.events.add('click', function (e) {
                       if (!myMap.balloon.isOpen()) {
                           var coords = e.get('coords');
                           myMap.balloon.open(coords, {
                               contentHeader:'Учебный центр "АКАДЕМИЯ"',
                               contentBody:'<p style="text-align:center">Тел.: +7 (846) 205-77-66</p>' + [
                                   ].join(', ') ,
                               contentFooter:'<sup style="text-align:center;display:block;">Будем рады видеть вас на наших курсах</sup>'
                           });
                       }
                       else {
                           myMap.balloon.close();
                       }
                   });      

		//растягиваем карту на всю высоту и ширину 
	       myMap.container.fitToViewport();


               //    myMap.setBounds(myMap.geoObjects.getBounds());
               jQuery('.panel-title a').click(function() {
                   jQuery('.panel-heading').removeClass('togglebg');
                   jQuery(this).parent().parent().toggleClass('togglebg');
               });
 
           }
       });

