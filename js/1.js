if(mobsts === 1) {
    // 자세한 설명은 여기에
    // https://nohack.tistory.com/123
    // 요소 & 사이즈
    const itpg2 = $(".itpg2");
    const scrollWidth = itpg2.scrollWidth;
    const clientWidth = itpg2.clientWidth;
    /* scrollWidth와 clientWidth를 구한 이유는 리스트를 css translate 속성을 이용해 움직일 것이기 때문입니다.
    clientWidth는 가려진 영역은 제외한 현재 화면에 보이는 요소에 대한 가로 사이즈이고,
    scrollWidth는 가려진 영역(스크롤 영역)을 포함한 요소의 가로 사이즈입니다.
    그렇기 때문에 'scrollWidth - clientWidth'의 결과는 translateX로 요소를 이동시킬 수 있는 최대치라 볼 수 있습니다. */

    // 이벤트마다 갱신될 값
    let startX = 0;
    let nowX = 0;
    let endX = 0;
    let i2pgBX = 0;

    const onScrollStart = (e) => {
        startX = getClientX(e);
        $(window).on('mousemove', onScrollMove);
        $(window).on('touchmove', onScrollMove);
        $(window).on('mouseup', onScrollEnd);
        $(window).on('touchend', onScrollEnd);
    };
    const onScrollMove = (e) => {
        nowX = getClientX(e);
        setRotateY(i2pgBX + nowX - startX);
    };
    const onScrollEnd = (e) => {endX = getClientX(e);
        i2pgBX = getTranslateX();
        if (i2pgBX > 0) {
        setTranslateX(0);
        // itpg2.style.transition = `all 0.3s ease`;
        $(itpg2).css({
            transition: "all .3s ease"
        })
        i2pgBX = 0;
        } else if (i2pgBX < clientWidth - scrollWidth) {
        setTranslateX(clientWidth - scrollWidth);
        $(itpg2).css({
            transition: "all .3s ease"
        })
        i2pgBX = clientWidth - scrollWidth;
        }

        $(window).off('mousedown', onScrollStart);
        $(window).off('touchstart', onScrollStart);
        $(window).off('mousemove', onScrollMove);
        $(window).off('touchmove', onScrollMove);
        $(window).off('mouseup', onScrollEnd);
        $(window).off('touchend', onScrollEnd);
        $(window).off('click', onClick);
    
        setTimeout(() => {
        bindEvents();
        $(itpg2).css({
            transition: ""
        })
        }, 300);};
    const onClick = (e) => {
        if (startX - endX !== 0) {
            e.preventDefault();
        }
    };

    const getClientX = (e) => {
        const isTouches = e.touches ? true : false;
        return isTouches ? e.touches[0].clientX : e.clientX;
    };
    
    const getRotateY = () => {
        return parseInt(getComputedStyle(itpg2).transform.split(/[^\-0-9]+/g)[5]);
    };
    
    const setRotateY = (y) => {
        $(itpg2).css({
            transform: `rotateY(${y}deg)`
        })
    };

    const bindEvents = () => {
        $(itpg2).on('mousedown', onScrollStart);
        $(itpg2).on('touchstart', onScrollStart);
        $(itpg2).on('click', onClick);
    };
    bindEvents();


} // if