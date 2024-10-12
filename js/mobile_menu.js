$(document).ready(function() {
		var click = 'click';
		if ('ontouchstart' in window) { 
			click = 'touchstart'; 
		}
	
		// 햄버거 메뉴 클릭 시
		$('.mobile-header__burger').on(click, function() {
			if (!$(this).hasClass('open')) {
				openMenu(); // 메뉴 열기
			} else {
				closeMenu(); // 메뉴 닫기
			}
		});
	
		// 메뉴 항목 클릭 시 부드럽게 스크롤 및 메뉴 닫기
		$('.mobile-header__menu ul li a').on(click, function(e) {
			e.preventDefault(); // 기본 앵커 동작 방지
			
			// href 속성에서 이동할 대상 섹션의 ID 가져오기
			var targetSection = $(this).attr('href');
	
			// 해당 섹션으로 부드럽게 스크롤
			$('html, body').animate({
				scrollTop: $(targetSection).offset().top
			}, 800); // 800ms 동안 부드럽게 스크롤
	
			closeMenu(); // 클릭 후 메뉴 닫기
		});
	
		// 메뉴 열기 함수
		function openMenu() {
			$('.circle').addClass('expand'); // 원 애니메이션
			$('.mobile-header__burger').addClass('open'); // 햄버거 아이콘 변경
			$('div.x, div.y, div.z').addClass('collapse'); // 햄버거 아이콘에 대한 애니메이션
			$('.mobile-header__menu li').addClass('animate'); // 메뉴 항목 애니메이션
	
			setTimeout(function() {
				$('div.y').hide(); // 가운데 선 숨기기
				$('div.x').addClass('rotate30');
				$('div.z').addClass('rotate150');
			}, 70);
	
			setTimeout(function() {
				$('div.x').addClass('rotate45');
				$('div.z').addClass('rotate135');
			}, 120);
		}
	
		// 메뉴 닫기 함수
		function closeMenu() {
			$('.mobile-header__burger').removeClass('open'); // 햄버거 아이콘 복구
			$('div.x').removeClass('rotate45').addClass('rotate30');
			$('div.z').removeClass('rotate135').addClass('rotate150');
			$('div.circle').removeClass('expand'); // 원 축소
			$('.mobile-header__menu li').removeClass('animate'); // 메뉴 항목 애니메이션 복구
	
			setTimeout(function() {
				$('div.x').removeClass('rotate30'); // x 축 회전 복구
				$('div.z').removeClass('rotate150'); // z 축 회전 복구
			}, 50);
	
			setTimeout(function() {
				$('div.y').show(); // 가운데 선 다시 보이기
				$('div.x, div.y, div.z').removeClass('collapse'); // 햄버거 아이콘 애니메이션 복구
			}, 70);
		}
	});