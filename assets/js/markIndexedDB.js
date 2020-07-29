// indexedDB
var $likes = $('.check-heart');
var $dones = $('.check-check');
//
// Define your database
//
var db = new Dexie("done-like");
db.version(2).stores({
    dones: 'id',
    likes: 'id',
    checked: 'id',
    notchecked: 'id', 
    text: 'id, text'
});

$likes.change(function(){
    $this = $(this);
    var checked = $this.prop('checked');
    var id = $this.data('id');
    if(checked){
        db.likes.put({id: id});
        $('#prob'+id).addClass('like');
    }
    else{
        db.likes.delete(id);
        $('#prob'+id).removeClass('like');
    }
});

$dones.change(function(){
    $this = $(this);
    var checked = $this.prop('checked');
    var id = $this.data('id');
    if(checked){
        db.dones.put({id: id});
        $('#prob'+id).addClass('done');
    }
    else{
        db.dones.delete(id);
        $('#prob'+id).removeClass('done');
    }
});

db.likes.toCollection().eachPrimaryKey(function(v){
    $('#like'+v).prop('checked',true);
    $('#prob'+v).addClass('like');
});
db.dones.toCollection().eachPrimaryKey(function(v){
    $('#done'+v).prop('checked',true);
    $('#prob'+v).addClass('done');
});