"use strict";



const BENSKEY = "reviewer-ben";
var reviewList = [];

var REVIEW = {
    id: '',
    name: '',
    starRating: 0,
    image: ''
};

var idR = 0;
var grating = 3;
var stars = null;
var globalId = 0;
var camPic = "";


document.addEventListener('deviceready', onDeviceReady);



function onDeviceReady() {

    window.document.querySelector('#save').addEventListener('touchstart', saveButton);
    window.document.querySelector('#cancel').addEventListener('touchstart', cancelButton);
    window.document.querySelector('#picture').addEventListener('touchstart', pictureButton);
    document.querySelector('#redButton').addEventListener('touchstart', deleteButton);
    if (localStorage.getItem(BENSKEY) == null) {
        localStorage.setItem(BENSKEY, JSON.stringify(reviewList));
    }
    var value = localStorage.getItem(BENSKEY);
    reviewList = JSON.parse(value);
    console.trace(reviewList);


    showReviews();
    addListeners();
    setRating();

}

function saveButton() {
    console.log('called saveButton')
        //
    var name = document.getElementById("name");
    var starRating = grating; //.toString();
    //
    if (name.value.length == 0) {
        alert("not completed review");
        //        return;
    }
    //
    //	//If getting base information, process a next step
    let touchEnd = new CustomEvent('touchend', {
        bubbles: true,
        cancelable: true
    });
    document.querySelector("#addReview .icon.icon-close.pull-right").dispatchEvent(touchEnd);

    let review = null;
    review = Object.create(REVIEW);
    review.id = Date.now();
    review.name = name.value;
    review.starRating = grating; //.toString();	
    review.image = camPic;
    reviewList.push(review);



    localStorage.setItem(BENSKEY, JSON.stringify(reviewList));
    
    
    name.value = "";
    var image = document.getElementById('myImage');
    image.src = "";
 

    showReviews();


}


function pictureButton() {
    console.log('called pictureButton');
    var options = {
        quality: 80,
        destinationType: Camera.DestinationType.FILE_URI,
        encodingType: Camera.EncodingType.PNG,
        mediaType: Camera.MediaType.PICTURE,
        pictureSourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
//        targetWidth: 300,
//        targetHeight: 300
    }

    navigator.camera.getPicture(onSuccess, onFail, options);
}

function onSuccess(imageURI) {


    console.log("successfull.");


    //    camPic = "data:image/png;base64," + imageURI;

    var image = document.getElementById('myImage');
    image.src ="data:image/png;base64," + imageURI;
    camPic = imageURI;
    





    //    console.log(imageURI);
}

function onFail(message) {
    alert('Failed because: ' + message);
}





function cancelButton() {
    console.log('called cancelButton');

    let touchEnd = new CustomEvent('touchend', {
        bubbles: true,
        cancelable: true
    });
    document.querySelector("#addReview .icon.icon-close.pull-right").dispatchEvent(touchEnd);
}


function deleteButton(ev) {



    console.log("delete called")


var id = ev.currentTarget.getAttribute("itemId");
    
    var index = null;
    for (var i = 0; i < reviewList.length; i++) {
        
        if (id == reviewList[i].id){
            
            index=i;
            
        }
        
    }
    
    if (index != null){
        
        reviewList.splice(index,1);
        
        localStorage.setItem(BENSKEY, JSON.stringify(reviewList));
        
    }
    
    
showReviews();

    //clear img on page
    //find item in reviewList and remove from the array with splice()
    //update localStorage  with setItem()
    //call the function to showReviews ... which uses reviewList to display the list

    //    reviewList.splice(2);
    //    localStorage.setItem(BENSKEY, JSON.stringify(reviewList));
    //
    //    showReviews();


    var touchEnd = new CustomEvent('touchend', {
        bubbles: true,
        cancelable: true
    });
    document.querySelector("#removeR .icon.icon-close.pull-right").dispatchEvent(touchEnd);

}


function showReviews() {

    stars = document.querySelectorAll('.star');
    document.getElementById("review-list").innerHTML = "";
    //	reviewList.forEach(function (review) {
    for (let review of reviewList) {

        var li = document.createElement('li');
        li.classList.add('table-view-cell');

        var span1 = document.createElement("span");
        span1.classList.add("name");
        var aInName = document.createElement("a");
        aInName.href = "#removeR";
        aInName.textContent = review.name;
        aInName.setAttribute("clickforD", review.id)
        var img = document.createElement("img");
        img.className = "reviewImg";
        img.src = "data:image/png;base64," + review.image;

        //        li.appendChild(img);
        // var c = document.getElementById("c");
        // var ctx = c.getContext("2d")
        //var i = document.getElementById("i");
        //ctx.drawImage(i,0,0,50,50);
        //ctx.drawImage(i,50,50,10,10)




        //
        //        let att = document.createAttribute("data-id");
        //        att.value = review.id;
        //
        //        aInName.setAttributeNode(att);
        aInName.addEventListener('touchstart', function (ev) {


            document.getElementById("appendN").innerHTML = "";

            var pInName = document.createElement("li");
            pInName.textContent = review.name;
            document.getElementById("appendN").appendChild(pInName);
            var img2 = document.createElement("img2");
            img2.className = "reviewImg2";
            img2.src = "data:image/png;base64," + review.image;
            
            var redButton = document.createElement("button");
            redButton.classList.add("btn", "btn-block");
            redButton.id = "redButton";
            var spanB = document.createElement("span");
            spanB.classList.add("icon", "icon-close");
            redButton.textContent = ("remove");
            redButton.appendChild(spanB);
            pInName.appendChild(img);


            var li2 = document.createElement('li');
            for (let i = 0, j = review.starRating; i < j; i++) {

                var span5 = document.createElement("span");
                span5.classList.add("star", "rated");
                li2.appendChild(span5);

                //span2.textContent = "&nbsp;";
            }

           redButton.setAttribute ("itemId", review.id ); 
            redButton.addEventListener('touchstart', function (ev) {
                
                
                deleteButton(ev);

            });

            document.getElementById("appendN").appendChild(li2);
            document.getElementById("appendN").appendChild(redButton);




            //            localStorage.removeItem(BENSKEY);


        });


        li.appendChild(span1);
        for (let i = 0, j = review.starRating; i < j; i++) {

            var span2 = document.createElement("span");
            span2.classList.add("star", "rated");
            li.appendChild(span2);

            //span2.textContent = "&nbsp;";
        }
        span1.appendChild(img);
        span1.appendChild(aInName);


        document.getElementById("review-list").appendChild(li);



    }
    // var grating = 0;


}

//global declarations

//initial setup
//document.addEventListener('DOMContentLoaded', function () {
//    stars = document.querySelectorAll('.star');
//    addListeners();
//    setRating(); //based on global rating variable value
//});

function addListeners() {
  [].forEach.call(stars, function (star, index) {
        star.addEventListener('click', (function (idx) {
            console.log('adding listener', index);
            return function () {
                grating = idx + 1;
                console.log('Rating is now', grating)
                setRating();
            }
        })(index));
    });

}

function setRating() {
  [].forEach.call(stars, function (star, index) {
        if (grating > index) {
            star.classList.add('rated');
            console.log('added rated on', index);
        } else {
            star.classList.remove('rated');
            console.log('removed rated on', index);
        }
    });
}