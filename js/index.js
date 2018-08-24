var dataUrl;
var baseUrl="http://118.190.76.178:8089/";
function _onorientationchange() {
    if (window.orientation == 90 || window.orientation == -90) {
        $("#forhorview").css("display", "-webkit-box");
    } else {
        setTimeout(function(callback) {
            $("html").css("font-size", document.documentElement.clientWidth / 375 * 312.5 + "%");
            if (callback) callback();
        }, 300);
        $("#forhorview").css("display", "none");
    }
}
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function(e) {
  _onorientationchange(e);
}, false);

nie.define('Index',function(){
    const ds = nie.require('ds');
    const Role = nie.require('Role');
    function Index(opts){
        this.init(opts);
    }
    Index.prototype = {
      constructor : Index,
      init : function(opts){
        this.curpage = 0;
        this.opts = opts;
        this.render();
        this.bind();
        this.sync();
      },
      render : function(){

      },
      showPage : function(index){
        index = index || this.curpage;
        this.curpage = index;
        $('.page').removeClass('show')
        $('.page.page'+index).addClass('show')
      },
      bind : function(){
        let self = this;
        $('#startBtn').click(function(){
          self.showPage(1)
        });
        $('#selectSex').click(function(){
          self.showPage(2)
        });
        $('#designBtn').click(function(){
          self.showPage(4);
          if($("input[name='mode']:checked").val()=="1"){//0：男 1：女
            ds.set('body','female')
          }else{
            ds.set('body','male')
          }
          Role.draw(ds.data);
          $('.J_menu').addClass('show')
          $('.J_list').removeClass('show');
        });
        $('.J_back1').click(function(){
          $('.J_display').removeClass('show');
          self.showPage(3)
          Role.callback = function(){}
        });

        $('.J_back2').click(function(){
          self.showPage(4)
        });

        $('.J_back0').click(function(){
          $('.J_menu').addClass('show')
          $('.J_list').removeClass('show')
          self.showPage(2)
        });

        $('.J_menu,.J_list').on('touchmove',function(event){
          event.stopPropagation();
        });

        $('.J_menu').click(function(event){
          if($(event.target.parentNode).hasClass('item')){
            let type = event.target.parentNode.className.replace(/item /ig,'');
            $('.J_menu').removeClass('show');
            $('.J_list').addClass('show');
            $('.J_list li').hide();
            if($('.J_list').find('.'+type+'[data-for='+ds.get('body')+']').length){
              $('.J_list').find('.'+type+'[data-for='+ds.get('body')+']').show()
            }else{
              $('.J_list').find('.'+type).show()
            }
          }
        });
        $('.J_list').click(function(event){
          if($(event.target).hasClass('icon') && !$(event.target).parent().hasClass('cur')){
            let name = event.target.className.replace(/icon /ig,'');
            let type = event.target.parentNode.parentNode.parentNode.parentNode.className;
            ds.set(type,name);
            Role.draw(ds.data);
            $(event.target).parent().siblings().removeClass('cur');
            $(event.target).parent().addClass('cur');
          }
        });
          $('#selectClose').click(function(event){
              $('.J_menu').addClass('show')
              $('.J_list').removeClass('show')
          })
        $('body').on('touchmove',function(event){
          event.preventDefault();
        })
        $('#selectBg').click(function(){
          self.showPage(3);
          $('.J_display').attr('src',Role.save()).addClass('show');
          Role.callback = function(){}
        });
        $('#J_head').click(function(){
          self.showPage(5);
          $('.J_head_display').attr('src',Role.save()).addClass('show');
        });
      },
      sync : function(){
        this.showPage();
        Role.draw(ds.data);
      }
    }
    var imgLoader = {
        _srcs: [],
        _onLoaded: null,
        _onLoading: null,
        load: function() {
            var srcs = this._srcs,
                l = srcs.length,
                loadCount = 0,
                that = this,
                tmp,
                i;
            function onImgLoad() {
                if (++loadCount === l) {
                    that._onLoaded && that._onLoaded();
                } else {
                    that._onLoading && that._onLoading(Math.floor(loadCount / l * 100));
                }
            }

            if (!l) {
                that._onLoaded && that._onLoaded();
                return this;
            }

            for (i = l; i--;) {
                tmp = new Image();
                tmp.src = srcs[i];
                tmp.onload = onImgLoad;
            }

            return this;
        },

        init: function(arrSrcs, onLoaded, onLoading) {

            this._srcs = arrSrcs.slice(0);
            this._onLoaded = onLoaded;
            this._onLoading = onLoading;

            return this;
        }
    };

    //加载img的所有图片列表
    var loadList = ["http://h5.1roadshow.com/img/yieyue.png","http://h5.1roadshow.com/img/start.png","http://h5.1roadshow.com/img/touxiang.png","http://h5.1roadshow.com/img/shangchaun.png","http://h5.1roadshow.com/img/paizhao.png","http://h5.1roadshow.com/img/eye-active.png","http://h5.1roadshow.com/img/zidingyi.png","http://h5.1roadshow.com/img/bg.png","http://h5.1roadshow.com/img/shouye.png","http://h5.1roadshow.com/img/shadow.png","http://h5.1roadshow.com/img/faxing.png","http://h5.1roadshow.com/img/shangyi.png","http://h5.1roadshow.com/img/xiezi.png","http://h5.1roadshow.com/img/zhuangshi.png","http://h5.1roadshow.com/img/kuzi.png","http://h5.1roadshow.com/img/backBtn.png","http://h5.1roadshow.com/img/nv.png","http://h5.1roadshow.com/img/di2.png","http://h5.1roadshow.com/img/haibao.png","http://h5.1roadshow.com/img/nan.png","http://h5.1roadshow.com/img/di1.png","http://h5.1roadshow.com/img/di4.png","http://h5.1roadshow.com/img/di3.png","http://h5.1roadshow.com/data/malebody/male.png","http://h5.1roadshow.com/data/malepants/malepants1.png","http://h5.1roadshow.com/data/malejacket/malejacket1.png","http://h5.1roadshow.com/data/maleshoes/maleshoes1.png","http://h5.1roadshow.com/data/malehair/malehair1.png","http://h5.1roadshow.com/data/object/object8.png","http://h5.1roadshow.com/img/baobao.png","http://h5.1roadshow.com/img/bg/bg1.png","http://h5.1roadshow.com/img/haibao/haibao2.png","http://h5.1roadshow.com/img/haibao.png","http://h5.1roadshow.com/img/head1.png","http://h5.1roadshow.com/data/malepants/malepants1.png","http://h5.1roadshow.com/data/malepants/malepants2.png","http://h5.1roadshow.com/data/malepants/malepants3.png","http://h5.1roadshow.com/data/malepants/malepants4.png","http://h5.1roadshow.com/data/malepants/malepants5.png","http://h5.1roadshow.com/data/malepants/malepants6.png","http://h5.1roadshow.com/data/malehair/malehair1.png","http://h5.1roadshow.com/data/malehair/malehair2.png","http://h5.1roadshow.com/data/malehair/malehair3.png","http://h5.1roadshow.com/data/malehair/malehair4.png","http://h5.1roadshow.com/data/malehair/malehair5.png","http://h5.1roadshow.com/img/icons/male/shangyi11.png","http://h5.1roadshow.com/img/icons/male/shangyi10.png","http://h5.1roadshow.com/img/icons/male/shangyi9.png","http://h5.1roadshow.com/img/icons/male/shangyi8.png","http://h5.1roadshow.com/img/icons/male/shangyi7.png","http://h5.1roadshow.com/img/icons/male/shangyi6.png","http://h5.1roadshow.com/data/malejacket/malejacket1.png","http://h5.1roadshow.com/data/malejacket/malejacket2.png","http://h5.1roadshow.com/data/malejacket/malejacket3.png","http://h5.1roadshow.com/data/malejacket/malejacket4.png","http://h5.1roadshow.com/data/malejacket/malejacket5.png","http://h5.1roadshow.com/data/malejacket/malejacket6.png","http://h5.1roadshow.com/img/icons/male/toufa11.png","http://h5.1roadshow.com/img/icons/male/toufa10.png","http://h5.1roadshow.com/img/icons/male/toufa9.png","http://h5.1roadshow.com/img/icons/male/toufa8.png","http://h5.1roadshow.com/img/icons/male/toufa6.png","http://h5.1roadshow.com/img/icons/male/kuzi11.png","http://h5.1roadshow.com/img/icons/male/kuzi10.png","http://h5.1roadshow.com/img/icons/male/kuzi9.png","http://h5.1roadshow.com/img/icons/male/kuzi8.png","http://h5.1roadshow.com/img/icons/male/kuzi7.png","http://h5.1roadshow.com/img/icons/male/kuzi6.png","http://h5.1roadshow.com/img/icons/male/xiezi11.png","http://h5.1roadshow.com/img/icons/male/xiezi10.png","http://h5.1roadshow.com/img/icons/male/xiezi9.png","http://h5.1roadshow.com/img/icons/male/xiezi8.png","http://h5.1roadshow.com/img/icons/male/xiezi7.png","http://h5.1roadshow.com/img/icons/male/xiezi6.png","http://h5.1roadshow.com/data/maleshoes/maleshoes1.png","http://h5.1roadshow.com/data/maleshoes/maleshoes2.png","http://h5.1roadshow.com/data/maleshoes/maleshoes3.png","http://h5.1roadshow.com/data/maleshoes/maleshoes4.png","http://h5.1roadshow.com/data/maleshoes/maleshoes5.png","http://h5.1roadshow.com/data/maleshoes/maleshoes6.png","http://h5.1roadshow.com/img/icons/male/yandou10.png","http://h5.1roadshow.com/img/icons/male/shoutao10.png","http://h5.1roadshow.com/img/icons/male/huzi10.png","http://h5.1roadshow.com/img/icons/male/xianglian8.png","http://h5.1roadshow.com/img/icons/male/shouzhuo8.png","http://h5.1roadshow.com/img/icons/male/ahoutao7.png","http://h5.1roadshow.com/img/icons/male/maozi7.png","http://h5.1roadshow.com/img/icons/male/xianglian6.png","http://h5.1roadshow.com/img/icons/male/shouzhuo6.png","http://h5.1roadshow.com/img/icons/female/toukui5.png","http://h5.1roadshow.com/img/icons/female/shoutao5.png"," http://h5.1roadshow.com/img/icons/female/xianglian4.png","http://h5.1roadshow.com/img/icons/female/xianglian3.png","http://h5.1roadshow.com/img/icons/female/xianglian1.png","http://h5.1roadshow.com/img/icons/female/shouzhuo1.png","http://h5.1roadshow.com/data/object/object1.png","http://h5.1roadshow.com/data/object/object2.png","http://h5.1roadshow.com/data/object/object3.png","http://h5.1roadshow.com/data/object/object4.png","http://h5.1roadshow.com/data/object/object5.png","http://h5.1roadshow.com/data/object/object6.png","http://h5.1roadshow.com/data/object/object7.png","http://h5.1roadshow.com/data/object/object8.png","http://h5.1roadshow.com/data/object/object9.png","http://h5.1roadshow.com/data/object/object10.png","http://h5.1roadshow.com/data/object/object11.png","http://h5.1roadshow.com/data/object/object12.png","http://h5.1roadshow.com/data/object/object13.png","http://h5.1roadshow.com/data/object/object14.png","http://h5.1roadshow.com/data/object/object15.png","http://h5.1roadshow.com/img/icons/yanjing1.png","http://h5.1roadshow.com/data/eye/eye1.png","http://h5.1roadshow.com/data/eye/eye2.png","http://h5.1roadshow.com/data/eye/eye3.png","http://h5.1roadshow.com/data/femalebody/female.png"," http://h5.1roadshow.com/img/icons/female/toufa1.png"," http://h5.1roadshow.com/img/icons/female/toufa2.png"," http://h5.1roadshow.com/img/icons/female/toufa3.png"," http://h5.1roadshow.com/img/icons/female/toufa4.png","http://h5.1roadshow.com/data/femalehair/femalehair1.png","http://h5.1roadshow.com/data/femalehair/femalehair2.png","http://h5.1roadshow.com/data/femalehair/femalehair3.png","http://h5.1roadshow.com/data/femalehair/femalehair4.png","http://h5.1roadshow.com/img/icons/female/shangyi1.png","http://h5.1roadshow.com/img/icons/female/shangyi2.png","http://h5.1roadshow.com/img/icons/female/shangyi3.png","http://h5.1roadshow.com/img/icons/female/shangyi4.png","http://h5.1roadshow.com/img/icons/female/shangyi5.png","http://h5.1roadshow.com/data/femalejacket/femalejacket1.png","http://h5.1roadshow.com/data/femalejacket/femalejacket2.png","http://h5.1roadshow.com/data/femalejacket/femalejacket3.png","http://h5.1roadshow.com/data/femalejacket/femalejacket4.png","http://h5.1roadshow.com/data/femalejacket/femalejacket5.png","http://h5.1roadshow.com/img/icons/female/qunzi5.png","http://h5.1roadshow.com/img/icons/female/kuzi5.png","http://h5.1roadshow.com/img/icons/female/kuzi4.png","http://h5.1roadshow.com/img/icons/female/qunzi3.png","http://h5.1roadshow.com/img/icons/female/kuzi2.png","http://h5.1roadshow.com/img/icons/female/kuzi1.png","http://h5.1roadshow.com/data/femalepants/femalepants1.png","http://h5.1roadshow.com/data/femalepants/femalepants2.png","http://h5.1roadshow.com/data/femalepants/femalepants3.png","http://h5.1roadshow.com/data/femalepants/femalepants4.png","http://h5.1roadshow.com/data/femalepants/femalepants5.png","http://h5.1roadshow.com/data/femalepants/femalepants6.png","http://h5.1roadshow.com/img/icons/female/xiezi1.png","http://h5.1roadshow.com/img/icons/female/xiezi2.png","http://h5.1roadshow.com/img/icons/female/xiezi3.png","http://h5.1roadshow.com/img/icons/female/xiezi4.png","http://h5.1roadshow.com/img/icons/female/xiezi5.png","http://h5.1roadshow.com/data/femaleshoes/femaleshoes1.png","http://h5.1roadshow.com/data/femaleshoes/femaleshoes2.png","http://h5.1roadshow.com/data/femaleshoes/femaleshoes3.png","http://h5.1roadshow.com/data/femaleshoes/femaleshoes4.png","http://h5.1roadshow.com/data/femaleshoes/femaleshoes5.png"];
    imgLoader.init(loadList, function() {
        new Index();
        setTimeout(function(){
            $('#loading').addClass('remove');
        },2000);
    },function(percent){

    }).load();
});

var demo_h5_upload_ops = {
    init:function(){
        this.eventBind();
    },
    eventBind:function(){
        var that = this;
        $("input[name=upload]").change(function(){
            var reader = new FileReader();
            reader.onload = function (e) {
                that.compress(this.result);
            };
            reader.readAsDataURL(this.files[0]);
        });
    },
    compress : function (res) {
        var img = new Image(),
            maxW = 640; //设置最大宽度
        img.onload = function () {
            if(img.width > maxW) {
                img.height *= maxW / img.width;
                img.width = maxW;
            }
            dataUrl=compress1(img, img.width, img.height,1)
            $("#imgBox").attr("src",dataUrl);
            $("#crop_circle_btn").show()
            Role.drawHead(dataUrl)
        }
        img.src = res;
    }
};
demo_h5_upload_ops.init();
//图片压缩
function compress1(img, width, height, ratio) {
    var canvas, ctx, img64, orient;
    //获取图片方向
    orient = getPhotoOrientation(img);
    canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext("2d");
    //如果图片方向等于6 ，则旋转矫正，反之则不做处理
    if (orient == 6) {
        ctx.save();
        ctx.translate(width / 2, height / 2);
        ctx.rotate(90 * Math.PI / 180);
        ctx.drawImage(img, 0 - height / 2, 0 - width / 2, height, width);
        ctx.restore();
    } else {
        ctx.drawImage(img, 0, 0, width, height);
    }
    img64 = canvas.toDataURL("image/jpeg", ratio);
    return img64;
}
//获取图片方向
function getPhotoOrientation(img) {
    var orient;
    EXIF.getData(img, function () {
        orient = EXIF.getTag(this, 'Orientation');
    });
    return orient;
}
// 截图
var crop_result = document.querySelector("#crop_result");
var crop_circle_btn = document.querySelector("#crop_circle_btn");
var mAlloyCrop;
function showToolPanel() {
    crop_result.style.display = "block";
    crop_circle_btn.style.display = "inline-block";
}
function hideToolPanel() {
    crop_result.style.display = "none";
    crop_circle_btn.style.display = "none";
    crop_result.innerHTML = "";
}
new AlloyFinger(crop_circle_btn, {
    tap: function () {
        hideToolPanel();
        mAlloyCrop = new AlloyCrop({
            image_src: dataUrl,
            circle: true,
            width:230,
            height: 230,
            output: 1,
            ok: function (base64, canvas) {
                crop_result.appendChild(canvas);
                crop_result.querySelector("canvas").style.borderRadius = "50%";
                mAlloyCrop.destroy();
                showToolPanel();
                Role.drawHead(canvas.toDataURL("image/jpeg", 1));
            },
            cancel: function () {
                mAlloyCrop.destroy();
                showToolPanel();
            }
        });
    }
});
var myVideo = document.getElementById('bgmusic');
document.addEventListener("WeixinJSBridgeReady", function () {
    audioPlay();
}, false);

function audioPlay() {
    myVideo.setAttribute("src", "music/yinyue.mp3");
    myVideo.play();
}
function playPause() {
    if (myVideo.paused){
        myVideo.play();
        $("#music").attr("src","img/yieyue.png")
    } else{
        myVideo.pause();
        $("#music").attr("src","img/zanting.png")
    }
}