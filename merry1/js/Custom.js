var sound = new Howl({
    urls: ['song/background.mp3'],
    loop: true
  });

function loading() {
    $('body').css('height', $(window).height());
    $('#loading').css('visibility', 'visible');
    setTimeout('loadingVisible()', 1500);
}

function loadingVisible() {
    $('#loading').css('visibility', 'hidden');
    $('body').css({
        'overflow': 'visible',
        'height': '100%'
    });
    sound.play();
}

/* Scroll Title Begin */
var scrl = "Giáng sinh vui vẻ! ";
function scrlsts() {
    scrl = scrl.substring(1, scrl.length) + scrl.substring(0, 1);
    document.title = scrl;
    setTimeout("scrlsts()", 100);
}
/* Scroll Title End */

/* Santa Claus Begin */
// Ông già noel
var leftToRight = true;
var endPos = 0;
var size = 0;
function showSantaClaus()
{
    if (leftToRight == true)
    {
        leftToRight = false;
        endPos = $(window).width();
        $("img#santaClaus").attr("src", "imgs/santaclaus.gif");
        $("img#santaClaus").css("left", "-390px");
    }
    else
    {
        leftToRight = true;
        endPos = -390;
        $("img#santaClaus").attr("src", "imgs/santaclausreverse.gif");
        $("img#santaClaus").css("left", $(window).width() + "px");
    }

    size = Math.floor(Math.random() * 5 + 1) + 15;
    $("img#santaClaus").css("height", size + "%");
    $("img#santaClaus").css("width", size + "%");
    $("img#santaClaus").css("top", Math.floor(Math.random() * 10 + 1) + 5 + "%");

    $("img#santaClaus").animate({
        "left": endPos
    }, 15000, "linear", showSantaClaus);
}
let firstClick = true; // Biến cờ để theo dõi lần nhấp đầu tiên

document.addEventListener("click", function () {
    if (firstClick) {
        firstClick = false; // Đặt thành false để chặn các lần nhấp sau

        // Bắt đầu logic tạo thư
        let intervalId = setInterval(() => {
            for (let i = 0; i < 2; i++) { // Tạo 2 bức thư mỗi lần
                // Tạo một phần tử đại diện cho thư
                const letters = document.createElement("div");
                letters.className = "letters";
                letters.innerHTML = '<img src="letters.png" alt="Thư" style="width: 100%; height: 100%;">'; // Tăng kích thước thư

                // Vị trí và góc xoay ngẫu nhiên
                const left = Math.random() * 100; // Vị trí ngẫu nhiên từ 0% đến 100% chiều ngang
                const rotate = Math.random() * 360; // Góc xoay ngẫu nhiên
                letters.style.left = `${left}%`;
                letters.style.top = "-10%"; // Xuất hiện từ trên cùng
                letters.style.transform = `rotate(${rotate}deg)`;

                // Thêm thư vào body
                document.body.appendChild(letters);

                // Gắn sự kiện click vào thư
                letters.addEventListener("click", function () {
                    $("#letter").show("drop", {direction: "down"}, "fast");
                    $(".message").typed({
                        strings: [
                        "<<< Merry Christmas >>>",
                        "Giáng sinh vui vẻ nha mn!!!, Chúc mọi người có một mùa noel thật ấm áp nha.",
                        ],
                        typeSpeed: 250,
                        startDelay: 500,
                        backSpeed: 50,
                        backDelay: 500,
                        loop: true,
                        contentType: 'html',
                        showCursor: false
                    });
                });

                // Xóa thư sau khi hoàn thành hoạt ảnh
                setTimeout(() => {
                    letters.remove();
                }, 7000); // Thời gian trùng với thời gian rơi của keyframes
            }
        }, 600); // Giảm tần suất xuất hiện thư, thư mới xuất hiện mỗi 600ms

        // Tự động dừng hiệu ứng sau 15 giây
        setTimeout(() => {
            clearInterval(intervalId);
        }, 15000);
    }
});


/* Santa Claus End */

/* Snow Begin */
// Kích thước màn hình
var SCREEN_WIDTH = $(window).width();
var SCREEN_HEIGHT = $(window).height();

// Vị trí giữa màn hình
var windowHalfX = SCREEN_WIDTH / 2;
var windowHalfY = SCREEN_HEIGHT / 2;

// Tọa độ chuột
var mouseX = 0;
var mouseY = 0;

var container;
var particle;
var camera;
var scene;
var renderer;

// Mảng các bông tuyết
var particles = [];
var particleImage = new Image();
particleImage.src = 'imgs/particlesmoke.png';

function snowEffectBind() {

    container = $('.snow');

    camera = new THREE.PerspectiveCamera(75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000);
    camera.position.z = 1000;

    scene = new THREE.Scene();
    scene.add(camera);

    renderer = new THREE.CanvasRenderer();
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    var material = new THREE.ParticleBasicMaterial({ map: new THREE.Texture(particleImage) });

    for (var i = 0; i < 500; i++) {
        particle = new Particle3D(material);
        particle.position.x = Math.random() * 2000 - 1000;
        particle.position.y = Math.random() * 2000 - 1000;
        particle.position.z = Math.random() * 2000 - 1000;
        particle.scale.x = particle.scale.y = 1;
        scene.add(particle);
        particles.push(particle);
    }

    container.html(renderer.domElement);

    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('touchstart', onDocumentTouchStart, false);
    document.addEventListener('touchmove', onDocumentTouchMove, false);

    setInterval(loop, 1000 / 60);
}

function onDocumentMouseMove(event) {

    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
}

function onDocumentTouchStart(event) {

    if (event.touches.length == 1) {

        event.preventDefault();

        mouseX = event.touches[0].pageX - windowHalfX;
        mouseY = event.touches[0].pageY - windowHalfY;
    }
}

function onDocumentTouchMove(event) {

    if (event.touches.length == 1) {

        event.preventDefault();

        mouseX = event.touches[0].pageX - windowHalfX;
        mouseY = event.touches[0].pageY - windowHalfY;
    }
}

function loop() {

    for (var i = 0; i < particles.length; i++) {

        var particle = particles[i];
        particle.updatePhysics();

        with(particle.position) {
            if (y < -1000) y += 2000;
            if (x > 1000) x -= 2000;
            else if (x < -1000) x += 2000;
            if (z > 1000) z -= 2000;
            else if (z < -1000) z += 2000;
        }
    }

    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}
/* Snow End */

var bShowLetter = false;
$(document).ready(function() {
    scrlsts();
    snowEffectBind();
    showSantaClaus();

    // Bắt sự kiện nhấn tuần lộc
    $("#reindeer").click(function() {
        // Chưa mở thư
        if (bShowLetter == false)
        {
            $('#reindeer').animate({
                right: -122
            }, 1000, function() {
                
                $("#letter").show("drop", {direction: "down"}, "fast");

                $("img#reindeer").attr("src", "imgs/reindeerhide.png");
                
                $('#reindeer').animate({
                    right: 0
                }, 1000, function() {
                    
                    $(".message").typed({
                        strings: [
                        "<<< Merry Christmas >>>",
                        "Giáng sinh vui vẻ nha mn!!!, Chúc mọi người có một mùa noel thật ấm áp nha.",
                        ],
                        typeSpeed: 250,
                        startDelay: 500,
                        backSpeed: 50,
                        backDelay: 500,
                        loop: true,
                        contentType: 'html',
                        showCursor: false
                    });

                });

            });

            bShowLetter = true;
        }
        else
        {
            $('#reindeer').animate({
                right: -122
            }, 1000, function() {
                
                $("#letter").hide("drop", {direction: "down"}, "slow");
                
                $("img#reindeer").attr("src", "imgs/reindeer.png");
                
                $('#reindeer').animate({
                    right: 0
                }, 1000);

            });

            bShowLetter = false;
        }
    });
});