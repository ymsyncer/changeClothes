nie.define('ds',function(){
    const _femaledata1 = {
        body : 'female',
        pants : 'femalepants1',
        shoes : 'femaleshoes1',
        jacket : 'femalejacket1',
        eye : '',
        hair : 'femalehair1',
        hat : null,
        object : 'object1',
        head:''
    }

    const _maledata = {
        body : 'male',
        pants : 'malepants1',
        shoes : 'maleshoes1',
        jacket : 'malejacket1',
        eye : '',
        hair : 'malehair1',
        hat : '',
        object : 'object8',
        head:''
    }
    function ds(opts){
        this.init(opts);
    }
    ds.prototype = {
        constructor: ds,
        init: function (opts) {
            this.opts = opts;
            this.data = _maledata;

        },
        get: function (key) {
            return this.data[key];
            // console.log(this.data);
        },
        set: function (key, value) {
            if (key == 'body') {
                if (value == 'female') {
                    this.data = _femaledata1;
                } else {
                    this.data = _maledata;
                }
            }
            this.data[key] = value;
        }
    }
    return  new ds();
});
