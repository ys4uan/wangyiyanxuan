$(function(){
	// 页面上的头部：logo、导航栏
	// logo右边的nav的点击字体变色事件
	$('.type-list ul').click(function(event){
		if($(event.target).is($('a'))){
			$('.type-list a').each(function(index, item){
				$(item).parent().removeClass('hd-focus');
				if(event.target === item){
					$(item).parent().addClass('hd-focus');		
				}
			});
		}
	});

	// 链家logo下面的搜索框的js代码
	var searchedTigs = [];
	var searchedString = '';
	var noSearchedString = '';
	noSearchedString = $('.searchTigs').html();

	// 当用户点击searchTigs中的li标签时，将其文本储存在searchedTigs中
	// 用户下次访问时，如果searchedTigs有值时，清空tig-content ul下的所有li，插入一个新li上去，并且修改tig-header的文本
	// div.input下的input标签 获取焦点时 div.searchTigs显示
	$('div.input input').focus(function(){
		if(searchedTigs.length !== 0){
			searchedTigs.forEach(function(item){
				searchedString += `<li><span>`+ item +`</span></li>`;
			});
			// 清除searchedTigs中的数据
			searchedTigs = [];
			$('.tig-content ul').html(searchedString);
			$('.tig-header').html(`<span class="floatLeft">搜索历史</span><a href="#" class="floatRight">清除历史记录</a>`);
			// 点击.tig-header中的a标签，清除searchedTigs中的数据
			$('.tig-header>a').click(function(){
				$('.searchTigs').html(noSearchedString);
			});
		}
		// 获取div.searchTigs元素
		$('div.searchTigs').css('display', 'block');
	});
	// div.input下的input标签 失去焦点时 div.searchTigs消失
	$('div.input input').blur(function(){
		setTimeout(function(){
			// 获取div.searchTigs元素
			$('div.searchTigs').css('display', 'none');
		},100);	
	});
	// 点击div.searchTigs中的li时，向searchedTigs中添加数据
	$('.tig-content ul').click(function(event){
		if($(event.target).is($('.tig-content span'))){
			var text = $(event.target).text();
			searchedTigs.push(text);
		}
	});
	

	// 修改dl.change-position位置区域的a链接点击事件
	// 获取用户点击那个a标签，然后修改a标签的颜色，还有i标签的图像，并且把下面的dl.position-content修改
	// 初始化 .close-subway 隐藏
	$('.position-content .close-subway').hide();
	$('dl.change-position').click(function(event){
		if($(event.target).is('dl.change-position a')){
			console.log(123);
			$('dl.change-position a').each(function(index, item){
				$(item).removeClass('selected');
				$(item).find('i').removeClass('arrow-up');
				$(item).find('i').addClass('arrow-down');
				$('.position-content div').hide();
			});
			$(event.target).addClass('selected');
			$(event.target).find('i').removeClass('arrow-down');
			$(event.target).find('i').addClass('arrow-up');
			var content = $(event.target).text();
			if(content === '区域'){
				$('.position-content .position').show();
			}else if(content === '地铁线'){
				$('.position-content .close-subway').show();
			}
		}
	});

	// div.show-more中i标签点击更改background-position的位置
	$('div.show-more a').click(function(event){
		var $getI = $(event.target).find('i');
		if($getI.hasClass('checked')){
			$getI.removeClass('checked');
		}else{
			$getI.addClass('checked');
		}	
	});

	// div.show-more中点击 span.show-more-btn 之后，隐藏span.show-more-btn，并且显示div.show-more-content
	// 初始化隐藏div.show-more-content
	$('.show-more .show-more-content').hide();
	$('div.show-more .show-more-btn').click(function(event){
		// $('.show-more .show-more-btn').hide();
		// $('.show-more .show-more-content').show();
		$(event.target).hide();
		$(event.target).next('.show-more-content').show();
	});

	// div.show-more-content中聚焦input之后，然后监听用户键盘事件，如果用户输入了文本，那么button显示
	// 初始化button隐藏
	$('.show-more-content button').hide();
	$('.show-more-content input').change(function(event){
		console.log(123);
		console.log(event);
		if(event.keyCode){
			console.log(345);
			$('.show-more-content button').show();
		}
	})

	// 点击button.more，修改其内i的class，并且显示隐藏div.even-more
	// 初始化隐藏div.even-more
	$('div.even-more').hide();
	$('button.more').click(function(){
		if($('button.more i').hasClass('arrow-down')){
			$('button.more i').removeClass('arrow-down');
			$('button.more i').addClass('arrow-up');
			$('div.even-more').show();
		}else if($('button.more i').hasClass('arrow-up')){
			$('button.more i').removeClass('arrow-up');
			$('button.more i').addClass('arrow-down');
			$('div.even-more').hide();
		}
	});

	// 页面上详情信息展示
	// 需求1：当点击div.order-tig下面的nav上的按钮时，应该给按钮更换背景颜色和字体颜色
	// 需求2：当点击title="列表模式"的span按钮时，应该判断它当前的显示状态，然后执行下一种显示状态，并且将该标签一下的展示形式更换
	// 		当点击title="大图模式"时，也一样
	$('div.order-tig').click(function(event){
		if($(event.target).is($('div.order-tig a'))){
			// 遍历所有的a节点，将它们的样式改为默认样式
			$('div.order-tig a').each(function(index,item){
				$(item).removeClass('font-selected');
				$(item).parent('li').removeClass('selected');
			});
			// 然后选择当前被点击的li节点，将其赋予被点击的样式	
			$(event.target).addClass('font-selected');
			$(event.target).parent('li').addClass('selected');	
		}
		if($(event.target).is($('div.order-tig div span'))){
			// 遍历所有的span节点，将它们的样式改为默认样式
			$('div.order-tig div span').each(function(index,item){		
				if($(item).attr('title') === '列表模式'){
					$(item).removeClass('table-click');
					$(item).addClass('table-unclick');
				}else if($(item).attr('title') === '大图模式'){
					$(item).removeClass('img-click');
					$(item).addClass('img-unclick');
				}
			});
			// 选择被选中的span节点，然后赋予被选择的样式
			if($(event.target).attr('title') === '列表模式'){
				$(event.target).removeClass('table-unclick');
				$(event.target).addClass('table-click');
			}else{
				$(event.target).removeClass('img-unclick');
				$(event.target).addClass('img-click');
			}
		}
	});
});