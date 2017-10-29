import { Component, OnInit } from '@angular/core';
import * as mojs from "mo-js";

declare var $: any;
declare var Library: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app';

  constructor() {



  }

  ngOnInit(): void {

    var TxtType = function (el, toRotate, period) {
      this.toRotate = toRotate;
      this.el = el;
      this.loopNum = 0;
      this.period = parseInt(period, 10) || 2000;
      this.txt = '';
      this.tick();
      this.isDeleting = false;
    };

    TxtType.prototype.tick = function () {
      var i = this.loopNum % this.toRotate.length;
      var fullTxt = this.toRotate[i];

      if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }

      this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

      var that = this;
      var delta = 200 - Math.random() * 100;

      if (this.isDeleting) { delta /= 2; }

      if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
      }

      setTimeout(function () {
        that.tick();
      }, delta);
    };

    window.onload = function () {

        var screenCover = document.getElementById("js-screen-cover");
        screenCover.style.transform = "rotateX(-110deg) scaleY(.5) translateX(5px)";
        // var parent = document.getElementById("js-parent");
        // parent.style.transform = "rotateY(360deg)";


      var elements = document.getElementsByClassName('typewrite');
      for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
      }
      // INJECT CSS
      var css = document.createElement("style");
      css.type = "text/css";
      css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
      document.body.appendChild(css);
    };








    // window.onload = function () {

    //   var screenCover = document.getElementById("js-screen-cover");
    //   screenCover.style.transform = "rotateX(-110deg) scaleY(.5) translateX(5px)";
    //   // var parent = document.getElementById("js-parent");
    //   // parent.style.transform = "rotateY(360deg)";
    // }



    var doorClose = {

      init: function init(proto) {
        Object.setPrototypeOf(this, proto);

        this.vars();
        this.createTween();
        // this.cubeMainTween.start();
      },
      vars: function vars() { },
      createTween: function createTween() {
        var _this9 = this;

        var tween = new mojs.Tween({
          duration: 1000 * this.s,
          delay: 100000,
          onStart: function onStart() {

          },
          onUpdate: function onUpdate(p) {

            // return;
            var bounce = mojs.easing.bounce.out(p);
            var pp = mojs.easing.cubic.out(mojs.easing.cubic.out(p));

            mojs.h.setPrefixedStyle(_this9.screenCoverEl, 'transform', 'rotateX(-110deg) scaleY(.5) translateX(5px)');
            mojs.h.setPrefixedStyle(_this9.monitorEl, 'background-color', 'black');
            mojs.h.setPrefixedStyle(_this9.monitorEl, 'height', '89%');

            // var shadowBounce = mojs.easing.cubic.in(bounce);
            // mojs.h.setPrefixedStyle(_this9.doorShadowEl, 'transform', 'scaleX(' + shadowBounce + ') translateZ(0)');
            // _this9.doorShadowEl.style.opacity = shadowBounce;

            // mojs.h.setPrefixedStyle(_this9.doorHandleShadowEl, 'transform', 'rotateZ(' + -75 * (1 - bounce) + 'deg) scaleY(' + bounce + ') translateZ(0)');
            // _this9.doorHandleShadowEl.style.opacity = bounce;
          }
        });
        this.moleTimeline.add(tween);

      }
    };




    var doorOpen = {

      init: function init(proto) {
        Object.setPrototypeOf(this, proto);

        this.vars();
        this.createTween();
        // this.cubeMainTween.start();
      },
      vars: function vars() { },
      createTween: function createTween() {
        var _this9 = this;

        var tween = new mojs.Tween({
          duration: 600 * this.s,
          onStart: function onStart() {

          },
          onUpdate: function onUpdate(p) {

            // return;
            var bounce = mojs.easing.bounce.out(p);
            var pp = mojs.easing.cubic.out(mojs.easing.cubic.out(p));

            mojs.h.setPrefixedStyle(_this9.screenCoverEl, 'transform', '');
            mojs.h.setPrefixedStyle(_this9.monitorEl, 'background-color', 'red');
            mojs.h.setPrefixedStyle(_this9.monitorEl, 'height', '83%');
          }
        });
        this.moleTimeline.add(tween);

      }
    };


    var mole = {
      init: function init(proto) {
        Object.setPrototypeOf(this, proto);
        this.vars();
        this.createTween();
        this.initChildScenes();
        this.initChildParts();
        this.mainTween.add(this.moleTimeline);
      },
      vars: function vars() {

      },
      createTween: function createTween() {
        this.moleTimeline = new mojs.Timeline({ delay: (this.cubeDuration - 1200) * this.s });
      },
      initChildScenes: function initChildScenes() {
        doorClose.init(this);

      },
      initChildParts: function initChildParts() {
        doorOpen.init(this);

      }
    };

    var main = {
      s: 1, // global time coefficient
      zHack: ' translateZ(0) ',
      mainTween: new mojs.Timeline({ repeat: 999999, delay: 0 }),
      delay: 2000,
      cubeDuration: 3900,
      isSound: true,
      init: function init() {
        this.vars();
        mole.init(this);
        this.mainTween.play();
      },
      vars: function vars() {
        this.screenEl = document.querySelector('#js-screen');
        this.monitorEl = document.querySelector("#js-monitor");
        this.screenCoverEl = document.querySelector('#js-screen-cover');
        this.parentEl = document.querySelector('#js-parent');

      },

      isMobile: function isMobile() {
        return !!(navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i));
      },
      isOpera: function isOpera() {
        var userAgent = navigator.userAgent;
        return (/^Opera\//.test(userAgent) || /\x20OPR\//.test(userAgent));
      }
    };

    main.init();















    // var element = document.getElementById("js-disk");
    // const shiftCurve = mojs.easing.path('M0,100 C50,100 50,100 50,50 C50,0 50,0 100,0');
    // const scaleCurveBase = mojs.easing.path('M0,100 C21.3776817,95.8051376 50,77.3262711 50,-700 C50,80.1708527 76.6222458,93.9449005 100,100');
    // const scaleCurve = (p) => { return 1 + scaleCurveBase(p); };
    // const nScaleCurve = (p) => { return 1 - scaleCurveBase(p) / 10; };
    // const laser1E = mojs.easing.path('M0,400S58,111.1,80.5,175.1s43,286.4,63,110.4,46.3-214.8,70.8-71.8S264.5,369,285,225.5s16.6-209.7,35.1-118.2S349.5,258.5,357,210,400,0,400,0');





    // console.log(element);
    // const html = new mojs.Html({
    //   el: "#js-disk",
    //   fill: { '#F64040': '#F64040', curve: scaleCurve },
    //   radius: 10,
    //   rx: 3,
    //   x: { [-250]: 400, easing: shiftCurve },
    //   scaleY: { 1: 1, curve: nScaleCurve },
    //   origin: { '0 50%': '100% 50%', easing: shiftCurve },
    //   isYoyo: true,
    //   delay: 5000,
    //   duration: 5000,
    //   repeat: 999,
    // }).play();


    // const shape = new mojs.Html({
    //   el: "#screen",
    //   fill: 'none',
    //   stroke: 'cyan',
    //   radius: 10,
    //   strokeWidth: { 20: 0 },
    //   angle: { [-360]: 0 },

    //   // tween properties
    //   easing: 'cubic.out',
    //   backwardEasing: 'cubic.in',
    //   delay: 200,
    //   duration: 600,
    //   repeat: 20,
    //   yoyo: true

    // })
    //   // tween public methods
    //   .setSpeed(.25)
    //   // .pause()
    //   // .stop()
    //   // .replay()
    //   // .playBackward()
    //   // etc
    //   .play();








  }






}
