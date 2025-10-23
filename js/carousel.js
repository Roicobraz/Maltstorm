const carousel_list = document.getElementsByClassName("carousel");
const carousel_t = 750;

Array.prototype.forEach.call(carousel_list, carousel => {
    let carousel_button_left = carousel.getElementsByClassName("btn_left")[0];
    let carousel_button_right = carousel.getElementsByClassName("btn_right")[0];
    let carousel_item_active = carousel.getElementsByClassName("active")[0];
    let carousel_items = carousel.getElementsByClassName("carousel-items")[0];
    
    if(carousel_button_left)
    {
        carousel_button_left.addEventListener("click", function() {
            let carousel_prev_item = carousel_item_active.previousElementSibling;
            if(carousel_prev_item == null)
            {
                carousel_prev_item = carousel_items.children[carousel_items.children.length - 1];
            } 

            carousel_item_active.classList.add("carousel_left_leave");
            carousel_prev_item.classList.add("active");
            carousel_prev_item.classList.add("carousel_left_arrive");
            carousel_button_left.disabled = true;

            // actions after the animation
            setTimeout(function(){
                carousel_item_active.classList.remove("active");
                carousel_prev_item.classList.remove("carousel_left_arrive");
                carousel_item_active.classList.remove("carousel_left_leave");
                carousel_item_active = carousel.getElementsByClassName("active")[0];
                carousel_items.style.height = parseInt(carousel_item_active.getBoundingClientRect().height)+"px";
                carousel_items.style.width = parseInt(carousel_item_active.getBoundingClientRect().width)+"px";            
                carousel_button_left.disabled = false;
            }, carousel_t);
        }); 
    }
    
    if(carousel_button_right)
    {
        carousel_button_right.addEventListener("click", function() {
            carousel_item_active = carousel.getElementsByClassName("active")[0];
            let carousel_next_item = carousel_item_active.nextElementSibling;   
    
            if(carousel_next_item == null)
            {
                carousel_next_item = carousel_items.children[0];
            }
    
            carousel_item_active.classList.add("carousel_right_leave");
            carousel_next_item.classList.add("active");
            carousel_next_item.classList.add("carousel_right_arrive");
            carousel_button_right.disabled = true; 
    
            // actions after the animation
            setTimeout(function(){
                carousel_item_active.classList.remove("active");
                carousel_next_item.classList.remove("carousel_right_arrive");
                carousel_item_active.classList.remove("carousel_right_leave");
                carousel_item_active = carousel.getElementsByClassName("active")[0];
                carousel_items.style.height = parseInt(carousel_item_active.getBoundingClientRect().height)+"px";
                carousel_items.style.width = parseInt(carousel_item_active.getBoundingClientRect().width)+"px";
                carousel_button_right.disabled = false; 
            }, carousel_t);
        });
    }
});