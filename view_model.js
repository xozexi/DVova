import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const urlParams = new URLSearchParams(window.location.search);
const parameter = urlParams.get('param');
// Создание сцены
var scene = new THREE.Scene();
// Создаем помощник осей координат
// const axesHelper = new THREE.AxesHelper(5); // Длина осей: 5 единиц
// Добавляем помощник на сцену
// scene.add(axesHelper);
scene.background = new THREE.Color(0x171717); // Здесь 0xffcc66 - это RGB код цвета, вы можете выбрать другой цвет, изменяя значение
// Создание камеры
var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight,0.001, 1000);
camera.position.z = 0.3;
camera.position.y = 0.2;
// Сбрасываем поворот камеры


// Создание рендерера
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Создание загрузчика
var loader = new GLTFLoader();

// Добавление контроллера камеры для управления при помощи мыши
var controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = false; // Включение инерции

// Подключение обработчика события загрузки окна
// Загрузка модели
loader.load(
    // Путь к файлу модели
    'models/' + parameter + '.glb',

    // Функция, которая вызывается при завершении загрузки
    function (gltf) {
        // Получение сцены из загруженной модели
        var model = gltf.scene;

        // Добавление модели на сцену
        scene.add(model);

        const light = new THREE.PointLight( 0xffffff, 2, 50 );
        light.position.set( -2, 0, 3 );
        scene.add( light );

        const light2 = new THREE.PointLight( 0x1d2238, 2, 100 );
        light2.position.set( 0, -3, 0 );
        scene.add( light2 );

        const light3 = new THREE.PointLight( 0xffffff, 2, 50 );
        light3.position.set( 3, 0, 3 );
        scene.add( light3 );

        const light4 = new THREE.PointLight( 0xffffff, 2, 50 );
        light4.position.set( 0, 3, 0 );
        scene.add( light4 );

        const light5 = new THREE.PointLight( 0xffffff, 2, 50 );
        light5.position.set( 0, 0, -3 );
        scene.add( light5 );

        const light6 = new THREE.PointLight( 0xffffff, 1, 20 );
        light6.position.set( 0, 0.2, 0.3 );
        scene.add( light6 );
        
    },

    // Функция, вызываемая во время загрузки
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% загружено');
    },

    // Функция, вызываемая в случае ошибки
    function (error) {
        console.error('Произошла ошибка загрузки', error);
    }
);

function animate() {
    requestAnimationFrame(animate);

    // Вращение модели по горизонтали
    scene.traverse(function(object) {
        if (object.isMesh) {
            object.rotation.z += 0.01;
        }
    });

    // Рендеринг сцены
    renderer.render(scene, camera);
}

animate();