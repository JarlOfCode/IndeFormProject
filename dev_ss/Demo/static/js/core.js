class Core {

    get config(){ return Config; }

    constructor(){
        this.coreElements = {
            scene: null,
            camera: null,
            renderer: null,
        };
        this.sceneController = null;
    }
}

Core = new Core();