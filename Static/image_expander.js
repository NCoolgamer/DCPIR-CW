$(document).ready(function () {
    $('img[enlargeable]').addClass('img_enlargeable').click(function () {
        $('html').css({ overflow: 'hidden' });
        var src = $(this).attr('src');
        $('<div>').css({
            background: 'RGBA(0,0,0,.5) url(' + src + ') no-repeat center',
            backgroundSize: 'contain',
            width: '100%', height: '100%',
            position: 'fixed',
            zIndex: '10000000000',
            top: '0', left: '0',
            cursor: 'zoom-out'
        }).click(function () {
            $(this).remove();
            $('html').css({ overflow: 'auto' });
        }).appendTo('body');
    });
});