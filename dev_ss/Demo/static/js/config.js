class Config {
    static get camera(){
        return {
            fov: 40,
            aspect: window.innerWidth/ window.innerHeight,
            near: 1,
            far: 1000
        };
    }

    static get renderer(){
        return {
            antialias: true,
        }
    }

    static get sceneObjects(){
        return {
            sphere: {
                geometry: {
                    radius: 3,
                    widthSegments: 32,
                    heightSegments: 32
                },
                material: {
                    color: 0xFECA0D
                }
            },
            plane: {
                geometry: {
                    width: 20,
                    height: 20,
                    widthSegments: 50,
                    heightSegments: 50
                },
                material: {
                    color: 0xffffff,
                    side: THREE.DoubleSide
                }

            },
			sphere2: {
                geometry: {
                    radius: 2,
                    widthSegments: 6,
                    heightSegments: 6
                },
                material: {
                    color: 0x1EF9F8
                }								
            },
			
			sphere3: {
                geometry: {
                    radius: 1,
                    widthSegments: 32,
                    heightSegments: 32
                },
                material: {
                    color: 0x7658ef
                }
            },
			sphere4: {
                geometry: {
                    radius: 3,
                    widthSegments: 32,
                    heightSegments: 32
                },
                material: {
                    color: 0xfca4c5
                }
            },
			
					
			
        }
    }
}
