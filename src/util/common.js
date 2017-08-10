/**
 * Created by Administrator on 2017/8/9.
 */
export default {
    getNowDate(){
        var now=new Date();
        var year = now.getFullYear();
        var mon = now.getMonth() + 1;
        if (mon < 10) { mon = 0 + "" + mon };
        var day = now.getDate();
        if(day<10)  day=0+''+day
        var h=now.getHours();
        var min=now.getMinutes();
        var s=now.getSeconds();
        return `${year}-${mon}-${day} ${h}:${min}:${s}`;
    }
}