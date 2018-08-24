var headImg="img/head1.png", peopleNum=0;
nie.define('Role', function() {
    var rem = document.documentElement.clientWidth / 375 * 312.5* 16 / 100;
    const W = 7.5 *  rem;
    const H = 13.34 * rem;

    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');

    let canvas1 = document.getElementById('canvas1');
    let context1 = canvas1.getContext('2d');

    function Role(opts){
        this.init(opts);
    }
    Role.prototype = {
        constructor : Role,
        init : function(opts){
            this.opts = opts;
            this.isFinish = true;
            this.callback = function(){}
            this.render();
            this.bind();
            this.sync();
        },
        render : function(){
            canvas.style.width = W + 'px'
            canvas.style.height = H + 'px'
            canvas.width = W * 2;
            canvas.height = H * 2;

            canvas1.style.width = W + 'px'
            canvas1.style.height = H + 'px'
            canvas1.width = W * 2;
            canvas1.height = H * 2;
        },
        bind : function(){

        },
        sync : function(){
        },
        drawHead:function(src){
            headImg=src
        },
        draw : function(data,cb){
            let self = this;
            if(!data){
                data = self.data;
            }
            self.data = data;
            self.callback = cb || function(){};
            let src = '',
                body = data.body;
            if(data && self.isFinish){
                self.isFinish = false;
                self._tempData = data;//临时记录数据，只做查询
                self._dataLenth = 0;//记录数据长度
                self._loadedResult = [];//加载结果长度
                // 保证draw的顺序
                self._confirmData(data);
                for(let i in data){
                    if(data[i]){
                        if(body == 'female' && ['body','hair','jacket','pants','shoes'].indexOf(i) != -1){
                            src = './data/female'+ i + '/'+data[i]+'.png'
                        }else if(body == 'male' && ['body','hair','jacket','pants','shoes'].indexOf(i) != -1){
                            src = './data/male'+ i + '/'+data[i]+'.png'
                        }else{
                            src = './data/'+ i + '/'+data[i]+'.png'
                        }
                        self.getImage(src,i);
                    }else{
                        self._loadedResult.push(i)
                    }
                }
            }
        },
        getImage : function(src,type){
            let self = this;
            var imgnode = document.createElement('img');
            imgnode.crossOrigin = "anonymous";
            imgnode.className = '_temp_img target_'+type;
            imgnode.src = src;
            imgnode.onload =  function(){
                self.imageLoaded(type);
            }
            imgnode.onerror =  function(){
                self.imageLoaded(type);
            }
            $('#Wrap').append(imgnode);
        },
        drawImage : function(img){
            var error =-1 * document.documentElement.clientWidth / 375 * 312.5 * 16 * .7 / 100;
            var _a = document.documentElement.clientWidth / 375
            if(img){
                context.save();
                context1.save();
                try{
                    context.drawImage(img,0,0,img.clientWidth,img.clientHeight,(W - img.clientWidth * _a/2-120),(H - img.clientHeight * _a/2) + error+90,img.clientWidth * _a*0.9,img.clientHeight * _a*0.9);
                    context1.drawImage(img,0,0,img.clientWidth,img.clientHeight,(W - img.clientWidth*0.8 * _a/2),(H - img.clientHeight * _a/2) + error+50,img.clientWidth*0.75  * _a,img.clientHeight*0.75  * _a);
                }catch(e){
                    console.log(e);
                }
                context.restore();
                context1.restore();
            }
        },
        imageLoaded : function(type){
            let self = this;
            self._loadedResult.push(type);
            if(self._loadedResult.length == self._dataLenth){
                self.clear && context.clearRect(0,0,W*2,H*2);
                self.clear && context1.clearRect(0,0,W*2,H*2);
                self.addBg();
                self.addBg2(function(){
                    self.addBg3(function(){
                        self._drawAll();
                    });
                });
            }
        },
        _confirmData : function(data){
            let self = this;
            for(let i in data){
                self._dataLenth ++;
            }
        },
        _drawAll : function(){
            let self = this;
            self._draw('body');
            self._draw('pants');
            self._draw('shoes');
            self._draw('jacket');
            self._draw('eye');
            self._draw('hair');
            self._draw('hat');
            self._draw('object');
            self.isFinish = true;
            self.clear = true;
        },
        _draw : function(part){
            let node = null;
            let self = this;
            node = document.getElementsByClassName('target_'+part)[0];
            self.drawImage(node);
            $(node).remove();
            if(part == 'object'){
                setTimeout(function(){
                    self.callback.call(self);
                },200);
            }
        },
        addBg2 : function(cb){
            var imgUrl;
            if($("input[name='mode1']:checked").val()=="001"){
                imgUrl='./img/bg/bg1.png';
            }else if($("input[name='mode1']:checked").val()=="002"){
                imgUrl='./img/bg/bg2.png';
            }else if($("input[name='mode1']:checked").val()=="003"){
                imgUrl='./img/bg/bg3.png';
            }else{
                imgUrl='./img/bg/bg4.png';
            }
            var imgnode2 = document.createElement('img');
            imgnode2.crossOrigin = "anonymous";
            imgnode2.className = '_temp_img bg';
            imgnode2.src = imgUrl;
            imgnode2.onload =  function(){
                var _a = document.documentElement.clientWidth / 375
                context1.save();
                context1.drawImage(this,0,0,this.clientWidth,this.clientHeight,(W - this.clientWidth*_a/2),(H - this.clientHeight*_a/2),this.clientWidth*_a,this.clientHeight*_a);
                context1.restore();
                cb();
                $(this).remove();
            }
            $('#Wrap').append(imgnode2);
        },
        addBg3:function(cb){
            var imgObj = new Image();
            imgObj.src = headImg;
            imgObj.onload = function(){
                context.save();
                context.drawImage(this,canvas.width*0.222,canvas.height*0.23,150,160);
                context.restore();
                context1.save();
                context1.drawImage(this,canvas1.width*0.5-68,canvas1.height*0.19,120,140);
                context1.restore();
                cb();
                $(this).remove();
            }
        },
        addBg : function(){
            context1.fillStyle = '#FFFFFF';
            context1.fillRect(0,0,W*2,H*2);
            var haibaoArr=["./img/haibao/haibao1.png","./img/haibao/haibao2.png","./img/haibao/haibao3.png","./img/haibao/haibao4.png","./img/haibao/haibao5.png","./img/haibao/haibao6.png","./img/haibao/haibao7.png"]
            var index = Math.floor((Math.random()*haibaoArr.length));
            var imgnode1 = document.createElement('img');
            imgnode1.crossOrigin = "anonymous";
            imgnode1.className = '_temp_img bg';
            imgnode1.src = haibaoArr[index];
            imgnode1.onload =  function(){
                var _a = document.documentElement.clientWidth / 375;
                context1.save();
                context1.drawImage(this,0,0,this.clientWidth,this.clientHeight,100,0,this.clientWidth*_a,this.clientHeight*_a);
                context1.restore();
                $(this).remove();
            }
           var imgnode = document.createElement('img');
            imgnode.crossOrigin = "anonymous";
            imgnode.className = '_temp_img bg';
            imgnode.src = './img/haibao.png';
            imgnode.onload =  function(){
                $.ajax({
                    type:'get',
                    url:baseUrl+"drees/insert",
                    cache:false,
                    dataType:'json',
                    success:function(data){
                        peopleNum=data.returnValue;
                    },
                    error:function (error) {
                    }
                });
                var _a = document.documentElement.clientWidth / 375
                context1.save();
                context1.drawImage(this,0,0,this.clientWidth,this.clientHeight,(W - this.clientWidth*_a/2),(H - this.clientHeight*_a/2),this.clientWidth*_a,this.clientHeight*_a);
                context1.font="30px HYYaKuHeiJ";
                context1.fillStyle="#ff0092";
                var score=Math.floor(Math.random() * (100 - 78)) + 78;
                context1.fillText(score,canvas1.width*0.555,canvas1.height*0.88);
                context1.font="25px HYYaKuHeiJ";
                context1.fillStyle="#ababac";
                context1.fillText("当 然 啦,你 还 有 "+peopleNum+" 个 手 下 败 将！",canvas1.width*0.12,canvas1.height*0.91);
                context1.restore();
                $(this).remove();
            }
            $('#Wrap').append(imgnode,imgnode1);
        },
        save : function(q){
            return canvas1.toDataURL('image/jpeg', q||0.8)
        }
    }
    return new Role();
});
