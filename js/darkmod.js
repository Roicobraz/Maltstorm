/**
* Variables modifiables
**/
const id_js = 'darkmod-js';
const darkmod_css_path = '/css/darkmod.css';

/**--------------------------------------------------------**/

const setStoredTheme = theme => localStorage.setItem('theme', theme);
const switcher = document.getElementById("toggleswitch");

function geturi()
{
    let link = document.getElementById(id_js).src;
    link = link.split('/js/');
    link = link[0];	
    return(link);
}

function getCookie(name)
{
    var dc = document.cookie;
    var cookie_value;
    dc.split(';').forEach(element => {
        if(element.includes(name))
        {
            cookie_value = element.split('=')[1];
        }
    });
    return cookie_value;
} 

function setDarkcss(filelink)
{
    link = document.createElement('link');
    link.rel = 'stylesheet';
    link.id = 'darkmod';
    filelink = filelink + darkmod_css_path;
    link.href = filelink;
    document.head.appendChild(link);
}

function removeDarkcss()
{
    linkremove = document.querySelector(`link[id~="darkmod"]`);
    if (linkremove)
    linkremove.remove();
}

/**
* Retourne le thème actuel au chargement de la page
**/
const getPreferredTheme = () => {
    // const storedTheme = getStoredTheme()
    // if (storedTheme) {
    //     return storedTheme
    // }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/**
* Attribut au body un data-attribute
**/
const setTheme = theme => {
    if (theme === 'auto') {
        document.documentElement.setAttribute('data-bs-theme', (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'))
    } else {
        document.documentElement.setAttribute('data-bs-theme', theme)
    }
}

/**
* Modifie les images en fonction du thème
**/
const setimages = theme => {
    // Activation du changement des images ayant une version darkmod 
    let pictures = document.querySelectorAll(".img_dk");
    
    pictures.forEach((figure) => {
        let picture = figure.getElementsByTagName('img')[0];			
        var link = '';
        var extension = '';
        var not_exist = 0;
        // Récupère le format de l'image initial 		
        let formats = ['svg', 'png', 'jpeg', 'gif', "webp"]
        formats.forEach((format) => {
            if (picture.src.includes(format))
            {	
                extension = '.'+format;
                link = picture.src.split(extension);
            }
        });

        if ((getPreferredTheme() == 'dark' && !theme) || theme == 'dark')
        {	
            var image = link[0].concat('','_dk'+extension);

            var url = image;
            var request = new XMLHttpRequest();
            request.open("GET", url, true);
            request.send();
            if (request.status != 200)
            {
                not_exist = 1;
            }
        }
        else if ((getPreferredTheme()=='light' || not_exist == 1) || theme == 'light')
        {
            if (link[0].includes('_dk'))
            {
                var link = link[0].split('_dk');
                var image = link[0].concat('', extension);
            }
            else
            {
                var image = link[0].concat('', extension);
            }
        }
        picture.src = image;
    })
}

/**
* Fonctionnalité du bouton
**/
const switchertheme = () => {
    const switcher = document.getElementById("toggleswitch");        
    if(switcher.checked)
    {
        document.cookie = 'dk_switcher_value=1; expires="'+(new Date(Date.now() + 2629800)).toUTCString()+'"; Secure; SameSite=None";';			
        setTheme('dark');
        setimages('dark');
        setDarkcss(geturi());
    }
    else
    {
        document.cookie = 'dk_switcher_value=0; expires="'+(new Date(Date.now() + 2629800)).toUTCString()+'"; Secure; SameSite=None";';			
        setTheme('light');
        setimages('light');
        removeDarkcss();
    }
}

/**
* Attribut au body un data-attribute équivalent au thème du navigateur au chargement
**/
function switcher_load_theme(){
if (document.body.contains(switcher))
{
    switcher.checked = getCookie('dk_switcher_value');
    mod = getPreferredTheme();

    if ( getCookie('dk_switcher_value') == undefined && getPreferredTheme() == 'dark' )
    {
        switcher.checked = true;     
    }
    else if ( getCookie('dk_switcher_value') == undefined && getPreferredTheme() == 'light' )
    {
        switcher.checked = false;
    }
    else if( getCookie('dk_switcher_value') == 1 )
    {
        mod = 'dark';
        switcher.checked = true;
        setDarkcss(geturi());
    }
    else
    {
        mod = 'light';
        switcher.checked = false;
        removeDarkcss();
    }

    setTheme(mod);
    setimages(mod);
}}
switcher_load_theme();

/**
* Change le thème de la page en fonction du thème du navigateur
**/
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    switcher_load_theme();
    const storedTheme = getPreferredTheme();
    if (storedTheme !== 'light' && storedTheme !== 'dark') {
        setTheme(getPreferredTheme());
        setimages();
    }
})

window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-bs-theme]')
    .forEach(toggle => {
        toggle.addEventListener('click', () => {
            const theme = toggle.getAttribute('data-bs-theme')
            setStoredTheme(theme)
            setTheme(theme);
        })
    })
})