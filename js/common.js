
// nie.define('Common',function() {
//
//     //点击分享
//     $("#btn_share").click(function() {
//         setTimeout(function() {
//             mbshare.showShare();
//         }, 200);
//     });
//
//     var circleTitle = [
//         "一秒换装第五人格，准备好pick我了吗？",
//         "巴啦啦魔法变身！Shining！",
//         "我居然变成了………女装dalao？",
//         "我今晚到底是换装做监管者呢还是求生者呢？",
//         "我今天就要穿女仆装参加派对，谁说话都不好使"
//     ];
//     var desc = [
//         "确认过眼神，这场派对的主角就是你！",
//         "一键变身嘤嘤嘤的佣兵小哥哥",
//         "你的好友邀请你换装，一同探索神秘庄园···",
//         "第一次女装，感觉有点小兴奋"
//     ];
//     //share
//     var share_title = $("#share_title").text();
//     var share_url = $("#share_url").text();
//     var share_desc = $("#share_desc").text();
//     var share_pic = $("#share_pic").attr("src");
//     var share_pic2 = $("#share_pic2").attr("src");
//     window.mbshare = nie.require("nie.util.mobiShare2");
//
//     mbshare.init({
//         title: desc[Math.floor(Math.random()*desc.length)],
//         desc: share_title,
//         url: share_url,
//         imgurl: share_pic,
//         circleTitle: circleTitle[Math.floor(Math.random()*circleTitle.length)],
//         guideText: "呼叫小伙伴<br/>一起来换装吧!",
//         qrcodeIcon: share_pic,
//         shareCallback: function(res) {
//         },
//         wxSdkCallback: function() {
//
//         }
//     });
//
//     $('#md_attention').click(function() {
//         $('#md_attention').removeClass('show')
//     });
//
//     $('#btn_attention').click(function() {
//         $('#md_attention').addClass('show')
//     });
//
//     $('.pop .close').click(function() {
//         hidePop();
//     });
//     $('.pop').click(function(event) {
//         if ($(event.target).hasClass('pop')) {
//             hidePop();
//         }
//     });
//
//     window.hidePop = function(name) {
//         if(!name){
//             $('.pop').removeClass('show');
//             $('.pop.video').find('#VIDEO').html('')
//         }else{
//             $('.pop.'+name).removeClass('show');
//         }
//     }
//
//     window.showPop = function (name) {
//         hidePop();
//         $('.pop.' + name).addClass('show');
//     }
//
//     // 显示对应弹窗
//     $('.J_show_pop').click(function(){
//         if($(this).attr('data-target')){
//             showPop($(this).attr('data-target'));
//         }
//     });
//
//     $('.J_hide_pop').click(function(){
//         if($(this).attr('data-target')){
//             hidePop($(this).attr('data-target'));
//         }
//     });
//
//     //视频处理
//     $('.J_video').click(function(event) {
//         var target = $(event.target);
//
//         if (target.attr('data-src')) {
//             event.preventDefault();
//             event.stopPropagation();
//             showPop('video')
//
//             $('#VIDEO').html('<video controls="" autoplay src="' + target.attr('data-src') + '"></video>')
//
//             $('#VIDEO').children()[0].play();
//         }
//     });
//
//
// })
