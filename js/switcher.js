let date = (new Date(Date.now() + 3600000)).toUTCString();

if(document.getElementById("toggleswitch"))
{
    document.getElementById("toggleswitch").addEventListener("click", switchertheme);
}

if(getCookie('dk_switcher_value') != undefined)
{
    if( getCookie('dk_switcher_value') == 1 )
    {
        document.getElementById("toggleswitch").checked = true;
        document.cookie = "dk_switcher_value=1; expires='" + date + "'; Secure; SameSite='Strict'";
    }
    else
    {
        document.getElementById("toggleswitch").checked = false;
    }
}