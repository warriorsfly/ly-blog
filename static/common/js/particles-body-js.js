/* -----------------------------------------------
/* How to use? : Check the GitHub README
/* ----------------------------------------------- */

/* To load a config file (particles.json) you need to host this demo (MAMP/WAMP/local)... */
/*
particlesJS.load('particles-js', 'particles.json', function() {
  console.log('particles.js loaded - callback');
});
*/

/* Otherwise just put the config content (json): */

particlesJS('particles-body-js',
 {
	"particles": {
		"number": {
			"value": 66,
			"density": {
				"enable": true,
				"value_area": 2000
			}
		},
		"color": {
			"value": "#282f3b"
		},
		"shape": {
			"type": "circle",
			"stroke": {
				"width": 0,
				"color": "#000000"
			},
			"polygon": {
				"nb_sides": 6
			},
			"image": {
				"src": "img/github.svg",
				"width": 40,
				"height": 40
			}
		},
		"opacity": {
			"value": 0.3551164387345227,
			"random": false,
			"anim": {
				"enable": false,
				"speed": 0.8932849335314796,
				"opacity_min": 0.16783216783216784,
				"sync": false
			}
		},
		"size": {
			"value": 2,
			"random": true,
			"anim": {
				"enable": false,
				"speed": 7.192807192807193,
				"size_min": 3.196803196803197,
				"sync": true
			}
		},
		"line_linked": {
			"enable": true,
			"distance": 100,
			"color": "#282f3b",
			"opacity": 0.18939543399174544,
			"width": 1.2
		},
		"move": {
			"enable": true,
			"speed": 3,
			"direction": "none",
			"random": false,
			"straight": false,
			"out_mode": "out",
			"bounce": false,
			"attract": {
				"enable": true,
				"rotateX": 600,
				"rotateY": 1200
			}
		}
	},
	"interactivity": {
		"detect_on": "canvas",
		"events": {
			"onhover": {
				"enable": true,
				"mode": "bubble"
			},
			"onclick": {
				"enable": false,
				"mode": "push"
			},
			"resize": true
		},
		"modes": {
			"grab": {
				"distance": 400,
				"line_linked": {
					"opacity": 1
				}
			},
			"bubble": {
				"distance": 100,
				"size": 4,
				"duration": 1,
				"opacity": 0.5,
				"speed": 3
			},
			"repulse": {
				"distance": 200,
				"duration": 0.4
			},
			"push": {
				"particles_nb": 4
			},
			"remove": {
				"particles_nb": 2
			}
		}
	},
	"retina_detect": true
}
);