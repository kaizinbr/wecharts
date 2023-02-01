var header = document.querySelector('header');
var navigationHeader = document.querySelector('.nav-menu');
var content = document.querySelector('main');
var footer = document.querySelector('footer');
var showSidebar = false;

function toggleSidebar()
{
    showSidebar = !showSidebar;
    if(showSidebar)
    {
        navigationHeader.style.marginLeft = '-10vw';
        navigationHeader.style.animationName = 'showSidebar';
        content.style.filter = 'blur(10px)';
        footer.style.filter = 'blur(10px)';
        document.body.style.overflowY = 'hidden';
    }
    else
    {
        navigationHeader.style.marginLeft = '-100vw';
        navigationHeader.style.animationName = '';
        content.style.filter = '';
        footer.style.filter = '';
        document.body.style.overflowY = '';
    }
}

function closeSidebar()
{
    if(showSidebar)
    {
        showSidebar = true;
        toggleSidebar();
    }
}

window.addEventListener('resize', function(event) {
    if(window.innerWidth > 768 && showSidebar) 
    {  
        showSidebar = true;
        toggleSidebar();
    }
});

