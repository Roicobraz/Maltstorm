const carousel_list = document.getElementsByClassName("carousel");
const carousel_items = document.getElementsByClassName("carousel-items")[0];
const carousel_t = 0;

Array.prototype.forEach.call(carousel_list, carousel => {
    let carousel_button_left = carousel.getElementsByClassName("btn_left")[0];
    let carousel_button_right = carousel.getElementsByClassName("btn_right")[0];
    
    if(carousel_button_left)
    {
        carouselAnimation(carousel, "left", carousel_button_left, 0)
    }
    
    if(carousel_button_right)
    {
        carouselAnimation(carousel, "right", carousel_button_right, 1)
    }
});

// calcul de la hauteur du carousel en fonction de l'élement le plus grand
let heightElements = [];
for (const element of carousel_items.children) {
    heightElements.push(parseInt(element.firstElementChild.getBoundingClientRect().height));
}
// let maxHeight = Math.max.apply(null, heightElements);
// carousel_items.style.height = maxHeight+30+"px";

/**
 * @param {Object} carousel 
 * @param {String} direction 
 * @param {Object} carousel_button
 * @param {Boolean} next 
 */
function carouselAnimation(carousel, direction, carousel_button, next)
{
    carousel_button.addEventListener("click", function() {
        let carousel_item_active = carousel.getElementsByClassName("active")[0];
        let carousel_item;
        if(next)
        {
            carousel_item = carousel_item_active.nextElementSibling;
        }
        else
        {
            carousel_item = carousel_item_active.previousElementSibling;
        }

        if(carousel_item == null)
        {
            if(next)
            {
               carousel_item = carousel_items.children[0];
            }
            else
            {
               carousel_item = carousel_items.children[carousel_items.children.length - 1];
            }
        }

        // carousel_item_active.classList.add("carousel_"+direction+"_leave");
        carousel_item.classList.add("active");
        // carousel_item.classList.add("carousel_"+direction+"_arrive");
        carousel_button.disabled = true;

        // actions after the animation
        setTimeout(function(){
            carousel_item_active.classList.remove("active");
            // carousel_item.classList.remove("carousel_"+direction+"_arrive");
            // carousel_item_active.classList.remove("carousel_"+direction+"_leave");
            carousel_item_active = carousel.getElementsByClassName("active")[0];
            carousel_button.disabled = false;
        }, carousel_t);
    }); 
}