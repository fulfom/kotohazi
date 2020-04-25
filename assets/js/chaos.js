$(function(){
    const $chaoses = $('.chaos');
    for(let i=0;i<$chaoses.length;i++){
        const $this = $chaoses.eq(i);
        const $olfirst = $this.find('ol:first-of-type');
        const $ollast = $this.find('ol:last-of-type');
        const $ollastli = $ollast.children('li');
        const id = $this.attr('id');
        const listnum = $olfirst.children('li').length;
        $olfirst.after(function(){
            let dom = '<ol>';
            for(let j=0;j<listnum;j++){
            dom += '<li class="ignore-elements"></li>';
            }
            dom += '</ol>'
            return dom;
        });
        for (let lists = 0; lists < $ollastli.length; lists++) {
            $ollastli.eq(lists).attr('data-num',lists+1);
        }

        $ollast.sortable({
        group: {
            name: id
        },
        animation:100,
        filter: ".ignore-elements",
        swap: true
        });

        $this.find('ol').eq(1).sortable({
        group: {
            name: id
        },
        animation:100,
        filter: ".ignore-elements",
        swap: true
        });
    }
});