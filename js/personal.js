
(function($, window, document){

  const personal = {
    init(){
      this.wrap();
      this.header();
      this.section1();
      this.section2();
      this.section4();
      this.section8();
      this.section9();
    },

    wrap(){
      //section2 : 500
      //section3 : 1300
      //section5 : 2100
      //section6 : 3000
      //section8 : 4000
      //section9 : 6200
      //section10 : 7200

      let scrollTop = 0;
      $(window).scroll(function(e){
        scrollTop = $(window).scrollTop();
        // console.log(scrollTop);
        if(scrollTop < 500){
          $('.main-btn').removeClass('on');
        }
        if(500 <= scrollTop && scrollTop < 1300){
          $('.main-btn').removeClass('on');
          $('.main-btn').eq(1).addClass('on');
        }
        if(1300 <= scrollTop && scrollTop < 2100){
          $('.main-btn').removeClass('on');
          $('.main-btn').eq(2).addClass('on');
        }
        if(2100 <= scrollTop && scrollTop < 3000){
          $('.main-btn').removeClass('on');
          $('.main-btn').eq(3).addClass('on');
        }
        if(3000 <= scrollTop && scrollTop < 4000){
          $('.main-btn').removeClass('on');
          $('.main-btn').eq(4).addClass('on');
        }
        if(4000 <= scrollTop && scrollTop < 6200){
          $('.main-btn').removeClass('on');
          $('.main-btn').eq(5).addClass('on');
        }
        if(6200 <= scrollTop && scrollTop < 7200){
          $('.main-btn').removeClass('on');
          $('.main-btn').eq(6).addClass('on');
        }
        if(7200 <= scrollTop){
          $('.main-btn').removeClass('on');
          $('.main-btn').eq(7).addClass('on');
        }
      });
    },

    header(){
      $('.main-btn').on({
        click(){
          let pos = $(this).attr('href');
          $('html, body').animate({scrollTop : $(pos).offset().top},500);
          $('.main-btn').removeClass('on');          
          $(this).toggleClass('on');
        }
      })
      const accordian = $('#header #accordian');
      const li = $('#header li');
      $('.mobile-btn').on({
        click(e){
          e.preventDefault();
          accordian.toggleClass('on');
        }
      })
      li.on({
        click(){
          accordian.removeClass('on');
        }
      })

    },

    section1(){
      let cnt = 0;
      let setId = 0;

      //메인슬라이드
      function mainSlide(){
        $('.slide-wrap').stop().animate({left : `${-100 * cnt}%`}, 1000, function(){
          pageNation();
        });
      }

      function nextCount(){
        if(cnt < 2){
          cnt ++;
          mainSlide();
        }
        if(cnt === 2){
          mainSlide();
        }
      }

      function prevCount(){
        if(cnt > 0){
          cnt --;
          mainSlide();
        }
        if(cnt === 0){
          mainSlide();
        }
      }

      function autoTimer(){
        setId = setInterval(nextCount, 4000);
        console.log('Interval start');
      }

      autoTimer();

      function stopTimer(){
        clearInterval(setId);
      }

      //터치스와이프
      let touchStart = 0;
      let touchEnd = 0;
      let dragStart = 0;
      let dragEnd = 0;
      let mousedown = false;

      //데스크탑용
      $('#section1').on({
        mousedown(e){
          mousedown = true;
          touchStart = e.clientX;
          dragStart = e.clientX - $('.slide-wrap').offset().left + 250;
          console.log(e.clientX, $('.slide-wrap').offset().left);
          stopTimer();
        },
        mouseup(e){
          mousedown = false;
          touchEnd = e.clientX;
          if((touchStart - touchEnd) > 0){
            if(!$('.slide-wrap').is(':animated')){
              nextCount();
            }
          }
          if((touchStart - touchEnd) < 0){
            if(!$('.slide-wrap').is(':animated')){
              prevCount();
            }
          }
          autoTimer();
        },
        mousemove(e){
          if(mousedown === false) return;
          dragEnd = e.clientX;
          // console.log(dragEnd - dragStart);
          if(!$('.slide-wrap').is(':animated') && 0<cnt<2){
            $('.slide-wrap').css({left : dragEnd - dragStart});
          }
        }
      });

      //모바일용
      $('#section1').on({
        touchstart(e){
          mousedown = true;
          touchStart = e.originalEvent.changedTouches[0].clientX;
          dragStart = e.clientX - $('.slide-wrap').offset().left + 250;
          console.log(e.clientX, $('.slide-wrap').offset().left);
          stopTimer();
        },
        touchend(e){
          mousedown = false;
          touchEnd = e.originalEvent.changedTouches[0].clientX;
          if((touchStart - touchEnd) > 0){
            if(!$('.slide-wrap').is(':animated')){
              nextCount();
            }
          }
          if((touchStart - touchEnd) < 0){
            if(!$('.slide-wrap').is(':animated')){
              prevCount();
            }
          }
          autoTimer();
        },
        touchmove(e){
          if(mousedown === false) return;
          dragEnd = e.originalEvent.changedTouches[0].clientX;
          // console.log(dragEnd - dragStart);
          if(!$('.slide-wrap').is(':animated') && 0<cnt<2){
            $('.slide-wrap').css({left : dragEnd - dragStart});
          }
        }
      });

      function pageNation(){
        $('.page-btn').removeClass('on');
        $('.page-btn').eq(cnt).addClass('on');
      }

        $('.page-btn').each(function(idx){
          $(this).on({
            click(e){
              e.preventDefault();
              clearInterval(setId);
              cnt = idx;
              mainSlide();
              autoTimer();
            }
          })
        })


    },

    section2(){
      const downbtn = $('#section2 a');
      downbtn.on({
        click(e){
          e.preventDefault();
        }
      })
    },

    section4(){
      const num = $('#section4 .num');
      let countNum = [2530, 3200, 2830, 1035];
      let countSum = [0,0,0,0];

      let setId = 0;
      let cnt = 0;


      function countFn(){
        cnt++;  //1~1000
        if(cnt > 1000){
          clearInterval(setId);
        }

        for(let i=0; i<=countNum.length; i++){
          countSum[i] += (countNum[i] / 1000);
          if(countSum[i] > countNum[i]){
            countSum[i] = countNum[i];
          }
          num.eq(i).html(Math.round(countSum[i]));
        }
      }

      setId = setInterval(countFn, 10);

    },

    section8(){
      const galleryBtn = $('#section8 .txt_btn');
      const imgBox = $('#section8 .img-box');

      const ul = $('#section8 .response_ul');
      const li = $('#section8 .response_ul li');

      let n = li.length;
      let cols = 2;
      let boxW = ul.width();
      let imgW = (boxW - (22 * cols)) / cols;
      let arr = [1,0,0,1,1,0,0,1,0,0];
      let l_imgH = imgW * 1.032707;
      let s_imgH = imgW * 0.707255756;
      let btnNumber = 0;
      let a = [];

      galleryFn();
      galleryBtn.removeClass('on');
      galleryBtn.eq(btnNumber).addClass('on');


      $(window).resize(function(e){
        galleryFn();
      }) 

      function galleryFn(){
        if($(window).innerWidth() >= 770){
          cols = 2;
        }
        else{
          cols = 1;
        }

        boxW = ul.width();
        imgW = boxW / cols; 
        console.log(imgW);
        l_imgH = imgW * 1.032707;
        s_imgH = imgW * 0.707255756;
        arr = [1,0,0,1,1,0,0,1,0,0];
        l_imgH = imgW * 1.032707;
        s_imgH = imgW * 0.707255756;

        //리스트별 높이 잡기
        li.each(function(idx){
          li.eq(idx).css({
            width : imgW,
            height : arr[idx] === 1 ? l_imgH : s_imgH
          })
        })

        if(btnNumber === 0){
          imgBox.removeClass('addZoom');
          switch(cols){
            case 2:
              li.eq(0).stop().animate({top :l_imgH*0 + s_imgH*0, left :imgW*0}, 300);
              li.eq(1).stop().animate({top :l_imgH*0 + s_imgH*0, left :imgW*1}, 300);
              li.eq(2).stop().animate({top :l_imgH*1 + s_imgH*0, left :imgW*0}, 300);
              li.eq(3).stop().animate({top :l_imgH*0 + s_imgH*1, left :imgW*1}, 300);
              li.eq(4).stop().animate({top :l_imgH*1 + s_imgH*1, left :imgW*0}, 300);
              li.eq(5).stop().animate({top :l_imgH*1 + s_imgH*1, left :imgW*1}, 300);
              li.eq(6).stop().animate({top :l_imgH*2 + s_imgH*1, left :imgW*0}, 300);
              li.eq(7).stop().animate({top :l_imgH*1 + s_imgH*2, left :imgW*1}, 300);
              li.eq(8).stop().animate({top :l_imgH*2 + s_imgH*2, left :imgW*0}, 300);
              li.eq(9).stop().animate({top :l_imgH*2 + s_imgH*2, left :imgW*1}, 300);
              ul.css({
                height : l_imgH*2 + s_imgH*3
              })
              break;
            case 1:
              li.eq(0).stop().animate({top :l_imgH*0 + s_imgH*0, left :imgW*0}, 300);
              li.eq(1).stop().animate({top :l_imgH*1 + s_imgH*0, left :imgW*0}, 300);
              li.eq(2).stop().animate({top :l_imgH*1 + s_imgH*1, left :imgW*0}, 300);
              li.eq(3).stop().animate({top :l_imgH*1 + s_imgH*2, left :imgW*0}, 300);
              li.eq(4).stop().animate({top :l_imgH*2 + s_imgH*2, left :imgW*0}, 300);
              li.eq(5).stop().animate({top :l_imgH*3 + s_imgH*2, left :imgW*0}, 300);
              li.eq(6).stop().animate({top :l_imgH*3 + s_imgH*3, left :imgW*0}, 300);
              li.eq(7).stop().animate({top :l_imgH*3 + s_imgH*4 , left :imgW*0}, 300);
              li.eq(8).stop().animate({top :l_imgH*4 + s_imgH*4, left :imgW*0}, 300);
              li.eq(9).stop().animate({top :l_imgH*4 + s_imgH*5, left :imgW*0}, 300);
              ul.css({
                height : l_imgH*4 + s_imgH*6
              })
              break;
              
          }
          imgBox.addClass('addZoom');
          
        }

        else if(btnNumber === 1){
          a = [2,3,6,7,9,10];
          imgBox.removeClass('addZoom');
          switch(cols){
            case 2:
              li.eq(1).stop().animate({top :l_imgH*0 + s_imgH*0, left :imgW*0}, 300);
              li.eq(2).stop().animate({top :l_imgH*0 + s_imgH*0, left :imgW*1}, 300);
              li.eq(5).stop().animate({top :l_imgH*0 + s_imgH*1, left :imgW*0}, 300);
              li.eq(6).stop().animate({top :l_imgH*0 + s_imgH*1, left :imgW*1}, 300);
              li.eq(8).stop().animate({top :l_imgH*0 + s_imgH*2, left :imgW*0}, 300);
              li.eq(9).stop().animate({top :l_imgH*0 + s_imgH*2, left :imgW*1}, 300);
              ul.css({
                height : l_imgH*0 + s_imgH*3
              })
              break;
            case 1:
              li.eq(1).stop().animate({top :l_imgH*0 + s_imgH*0, left :imgW*0}, 300);
              li.eq(2).stop().animate({top :l_imgH*0 + s_imgH*1, left :imgW*0}, 300);
              li.eq(5).stop().animate({top :l_imgH*0 + s_imgH*2, left :imgW*0}, 300);
              li.eq(6).stop().animate({top :l_imgH*0 + s_imgH*3, left :imgW*0}, 300);
              li.eq(8).stop().animate({top :l_imgH*0 + s_imgH*4, left :imgW*0}, 300);
              li.eq(9).stop().animate({top :l_imgH*0 + s_imgH*5, left :imgW*0}, 300);
              ul.css({
                height : l_imgH*0 + s_imgH*6
              })
              break;
              
          }
          for(let i=0; i<a.length; i++){
            imgBox.eq(a[i]-1).addClass('addZoom');
          }
          
        }

        else if(btnNumber === 2){
          a = [2,4,5,6,8,10];
          imgBox.removeClass('addZoom');
          switch(cols){
            case 2:
              li.eq(1).stop().animate({top :l_imgH*0 + s_imgH*0, left :imgW*0}, 300);
              li.eq(3).stop().animate({top :l_imgH*0 + s_imgH*0, left :imgW*1}, 300);
              li.eq(4).stop().animate({top :l_imgH*0 + s_imgH*1, left :imgW*0}, 300);
              li.eq(5).stop().animate({top :l_imgH*1 + s_imgH*0, left :imgW*1}, 300); 
              li.eq(7).stop().animate({top :l_imgH*1 + s_imgH*1, left :imgW*0}, 300);
              li.eq(9).stop().animate({top :l_imgH*1 + s_imgH*1, left :imgW*1}, 300);
              ul.css({
                height : l_imgH*2 + s_imgH*1
              })
              break;
            case 1:
              li.eq(1).stop().animate({top :l_imgH*0 + s_imgH*0, left :imgW*0}, 300);
              li.eq(3).stop().animate({top :l_imgH*0 + s_imgH*1, left :imgW*0}, 300);
              li.eq(4).stop().animate({top :l_imgH*1 + s_imgH*1, left :imgW*0}, 300);
              li.eq(5).stop().animate({top :l_imgH*2 + s_imgH*1, left :imgW*0}, 300);
              li.eq(7).stop().animate({top :l_imgH*2 + s_imgH*2, left :imgW*0}, 300);
              li.eq(9).stop().animate({top :l_imgH*3 + s_imgH*2, left :imgW*0}, 300);
              ul.css({
                height : l_imgH*3 + s_imgH*3
              })
              break;
              
          }
          for(let i=0; i<a.length; i++){
            imgBox.eq(a[i]-1).addClass('addZoom');
          }
          
        }

        else if(btnNumber === 3){
          a = [1,4,5,6,7,8,9,10];
          imgBox.removeClass('addZoom');
          switch(cols){
            case 2:
              li.eq(0).stop().animate({top :l_imgH*0 + s_imgH*0, left :imgW*0}, 300);
              li.eq(3).stop().animate({top :l_imgH*0 + s_imgH*0, left :imgW*1}, 300);
              li.eq(4).stop().animate({top :l_imgH*1 + s_imgH*0, left :imgW*0}, 300);
              li.eq(5).stop().animate({top :l_imgH*1 + s_imgH*0, left :imgW*1}, 300); 
              li.eq(6).stop().animate({top :l_imgH*2 + s_imgH*0, left :imgW*0}, 300);
              li.eq(7).stop().animate({top :l_imgH*1 + s_imgH*1, left :imgW*1}, 300);
              li.eq(8).stop().animate({top :l_imgH*2 + s_imgH*1, left :imgW*0}, 300);
              li.eq(9).stop().animate({top :l_imgH*2 + s_imgH*1, left :imgW*1}, 300);
              ul.css({
                height : l_imgH*2 + s_imgH*2
              })
              break;
            case 1:
              li.eq(0).stop().animate({top :l_imgH*0 + s_imgH*0, left :imgW*0}, 300);
              li.eq(3).stop().animate({top :l_imgH*1 + s_imgH*0, left :imgW*0}, 300);
              li.eq(4).stop().animate({top :l_imgH*2 + s_imgH*0, left :imgW*0}, 300);
              li.eq(5).stop().animate({top :l_imgH*3 + s_imgH*0, left :imgW*0}, 300); 
              li.eq(6).stop().animate({top :l_imgH*3 + s_imgH*1, left :imgW*0}, 300);
              li.eq(7).stop().animate({top :l_imgH*3 + s_imgH*2, left :imgW*0}, 300);
              li.eq(8).stop().animate({top :l_imgH*4 + s_imgH*2, left :imgW*0}, 300);
              li.eq(9).stop().animate({top :l_imgH*4 + s_imgH*3, left :imgW*0}, 300);
              ul.css({
                height : l_imgH*4 + s_imgH*4
              })
              break;
              
          }
          for(let i=0; i<a.length; i++){
            imgBox.eq(a[i]-1).addClass('addZoom');
          }
          
        }

        else if(btnNumber === 4){
          a = [1,3,7,5,10];
          imgBox.removeClass('addZoom');
          switch(cols){
            case 2:
              li.eq(0).stop().animate({top :l_imgH*0 + s_imgH*0, left :imgW*0}, 300);
              li.eq(2).stop().animate({top :l_imgH*0 + s_imgH*0, left :imgW*1}, 300);
              li.eq(6).stop().animate({top :l_imgH*1 + s_imgH*0, left :imgW*0}, 300);
              li.eq(4).stop().animate({top :l_imgH*0 + s_imgH*1, left :imgW*1}, 300); 
              li.eq(9).stop().animate({top :l_imgH*1   + s_imgH*1, left :imgW*0}, 300);
              ul.css({
                height : l_imgH*1 + s_imgH*2
              })
              break;
            case 1:
              li.eq(0).stop().animate({top :l_imgH*0 + s_imgH*0, left :imgW*0}, 300);
              li.eq(2).stop().animate({top :l_imgH*1 + s_imgH*0, left :imgW*0}, 300);
              li.eq(6).stop().animate({top :l_imgH*1 + s_imgH*1, left :imgW*0}, 300);
              li.eq(4).stop().animate({top :l_imgH*1 + s_imgH*2, left :imgW*0}, 300); 
              li.eq(9).stop().animate({top :l_imgH*2 + s_imgH*2, left :imgW*0}, 300);
              ul.css({
                height : l_imgH*2 + s_imgH*3
              })
              break;
              
          }
          for(let i=0; i<a.length; i++){
            imgBox.eq(a[i]-1).addClass('addZoom');
          }
          
        }
      }

      galleryBtn.each(function(idx){
        $(this).on({
          click(e){
            e.preventDefault();
            galleryBtn.removeClass('on');
            $(this).addClass('on');
            btnNumber = idx;
            galleryFn();
          }
        })
      })

    },

    section9(){
      const ptag = $('#section9 p a');
      ptag.on({
        click(e){
          e.preventDefault();
        }
      })
    }

  }
  personal.init();

})(jQuery, window, document);
